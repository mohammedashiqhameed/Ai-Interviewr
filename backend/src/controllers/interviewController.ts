import Candidate from "../models/Candidate";
import Interview from "../models/Interview";
import { model, questionGenModel } from "../config/gemini";

export const startInterview = async (req: any, res: any) => {
    try {
        const { candidateId } = req.body;

        console.log("Candidate ID:", candidateId);

        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found",
            });
        }

        console.log("Candidate Found");

        if (!candidate.resumeText || candidate.resumeText.trim() === "") {
            return res.status(400).json({
                message: "Resume text not found. Upload resume first.",
            });
        }

        const prompt = `
You are an expert technical interviewer. Based on the candidate's resume below, generate EXACTLY 10 technical interview questions.

Resume:
${candidate.resumeText}

STRICT GENERATION RULES:
1. The output MUST be a valid JSON array of EXACTLY 10 questions.
2. Questions 1 to 5 (indices 0 to 4) MUST be THEORY questions:
   - "type": "theory"
   - "question": string (concise, high quality technical theory question)
   - Do NOT include options or correctAnswer for theory questions.
3. Questions 6 to 10 (indices 5 to 9) MUST be MCQ (Multiple Choice) questions:
   - "type": "mcq"
   - "question": string (technical multiple choice question)
   - "options": an array of EXACTLY 4 distinct string choices (e.g. ["Choice A", "Choice B", "Choice C", "Choice D"])
   - "correctAnswer": string (MUST EXACTLY match one of the 4 options)
4. Order MUST be strictly:
   - Question 1: theory
   - Question 2: theory
   - Question 3: theory
   - Question 4: theory
   - Question 5: theory
   - Question 6: mcq (with 4 options & correctAnswer)
   - Question 7: mcq (with 4 options & correctAnswer)
   - Question 8: mcq (with 4 options & correctAnswer)
   - Question 9: mcq (with 4 options & correctAnswer)
   - Question 10: mcq (with 4 options & correctAnswer)

Return ONLY the raw JSON array.
`;

        console.log("Sending prompt to Gemini for question generation...");

        const result = await questionGenModel.generateContent(prompt);

        const responseText = result.response.text();

        console.log("Gemini Response:", responseText);

        // Extract JSON from response (handle markdown code blocks if any)
        let jsonString = responseText.trim();
        const jsonMatch = jsonString.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
            jsonString = jsonMatch[1].trim();
        }

        let rawQuestions: any[] = JSON.parse(jsonString);

        if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
            return res.status(500).json({
                message: "No questions generated",
            });
        }

        // Validate and normalize exactly 10 questions (first 5 theory, next 5 mcq)
        const validatedQuestions = rawQuestions.slice(0, 10).map((q: any, index: number) => {
            if (index < 5) {
                // Ensure questions 1-5 are theory
                return {
                    type: "theory" as const,
                    question: q.question || `Technical question ${index + 1}`
                };
            } else {
                // Ensure questions 6-10 are MCQ
                const rawOptions = Array.isArray(q.options) ? q.options.map(String) : [];
                let options = rawOptions.filter((opt: string) => opt.trim().length > 0);
                while (options.length < 4) {
                    options.push(`Option ${options.length + 1}`);
                }
                if (options.length > 4) {
                    options = options.slice(0, 4);
                }

                let correctAnswer = q.correctAnswer ? String(q.correctAnswer).trim() : options[0];
                if (!options.includes(correctAnswer)) {
                    correctAnswer = options[0];
                }

                return {
                    type: "mcq" as const,
                    question: q.question || `Technical multiple-choice question ${index + 1}`,
                    options,
                    correctAnswer
                };
            }
        });

        // Store full questions (with correctAnswer) in MongoDB
        // Pre-fill answers with "Not attempted" for all 10 questions
        const initialAnswers = new Array(validatedQuestions.length).fill("Not attempted");

        const interview = await Interview.create({
            candidateId: candidate._id,
            candidateName: candidate.name,
            email: candidate.email,
            questions: validatedQuestions,
            answers: initialAnswers,
            score: 0,
            feedback: "",
            completed: false,
        });

        // Strip correctAnswer before sending to frontend
        const frontendQuestions = validatedQuestions.map((q: any) => {
            if (q.type === "mcq") {
                return {
                    type: q.type,
                    question: q.question,
                    options: q.options,
                };
            }
            return {
                type: q.type,
                question: q.question,
            };
        });

        return res.status(200).json({
            interviewId: interview._id,
            questions: frontendQuestions,
        });

    } catch (error: any) {
        console.error("START INTERVIEW ERROR:", error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

export const submitAnswer = async (req: any, res: any) => {
    try {
        const { interviewId, questionIndex, answer } = req.body;

        const interview: any = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found",
            });
        }

        const totalQ = interview.questions ? interview.questions.length : 10;

        // Ensure answers array is sized to match questions
        if (!Array.isArray(interview.answers) || interview.answers.length === 0) {
            interview.answers = new Array(totalQ).fill("Not attempted");
        } else {
            while (interview.answers.length < totalQ) {
                interview.answers.push("Not attempted");
            }
        }

        const answerValue = (answer !== undefined && answer !== null && String(answer).trim() !== "")
            ? String(answer).trim()
            : "Not attempted";

        if (typeof questionIndex === "number" && questionIndex >= 0 && questionIndex < totalQ) {
            interview.answers[questionIndex] = answerValue;
        } else {
            interview.answers.push(answerValue);
        }

        interview.markModified("answers");
        await interview.save();

        return res.status(200).json({
            message: "Answer Saved",
        });

    } catch (error: any) {
        console.error("SUBMIT ANSWER ERROR:", error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

export const finishInterview = async (req: any, res: any) => {
    try {
        const { interviewId } = req.body;

        const interview: any = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found",
            });
        }

        // Build evaluation data for each question
        const evaluationData = interview.questions.map((q: any, i: number) => {
            const candidateAnswer = interview.answers[i] || "Not attempted";

            if (q.type === "mcq") {
                return `
Question ${i + 1} (MCQ):
${q.question}
Options: ${q.options.join(", ")}
Correct Answer: ${q.correctAnswer}
Candidate Answer: ${candidateAnswer}`;
            }

            return `
Question ${i + 1} (Theory):
${q.question}
Candidate Answer: ${candidateAnswer}`;
        });

        const prompt = `
You are a technical interviewer.

Evaluate the following interview answers. There are 10 questions total: 5 theory and 5 MCQ.

${evaluationData.join("\n")}

Evaluation Rules:
- For theory questions: evaluate correctness, relevance, and technical understanding.
- For MCQ questions: compare the candidate's answer with the provided correct answer. If they match, it is correct. If they don't match, it is incorrect. Do NOT guess the correct answer yourself.
- If an answer is "Not attempted" or empty, give 0 marks for that question.
- Each question is worth 10 marks (total 100).

Provide:

Score: XX (out of 100)

Feedback: Detailed feedback for each question
`;

        const resultResponse = await model.generateContent(prompt);

        const evaluation = resultResponse.response.text();

        let score = 0;

        const match = evaluation.match(/Score:\s*(\d+)/i);

        if (match) {
            score = parseInt(match[1]);
        }

        interview.score = score;
        interview.feedback = evaluation;
        interview.completed = true;

        await interview.save();

        return res.status(200).json({
            message: "Interview Completed",
        });

    } catch (error: any) {
        console.error("FINISH INTERVIEW ERROR:", error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getResult = async (req: any, res: any) => {
    try {
        const { interviewId } = req.params;

        const interview = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found",
            });
        }

        return res.status(200).json(interview);

    } catch (error: any) {
        console.error("GET RESULT ERROR:", error);

        return res.status(500).json({
            message: error.message,
        });
    }
};