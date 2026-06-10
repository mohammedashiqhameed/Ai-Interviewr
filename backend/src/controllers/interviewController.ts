import Candidate from "../models/Candidate";
import Interview from "../models/Interview";
import { model } from "../config/gemini";

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
Generate exactly 10 technical interview questions based on the resume below.

Resume:
${candidate.resumeText}

Rules:
- Return exactly 10 questions
- One question per line
- No numbering
- No explanations
`;

        console.log("Sending prompt to Gemini...");

        const result = await model.generateContent(prompt);

        const response = result.response.text();

        console.log("Gemini Response:", response);

        const questions = response
            .split("\n")
            .map((q) => q.trim())
            .filter((q) => q.length > 0)
            .slice(0, 10);

        if (questions.length === 0) {
            return res.status(500).json({
                message: "No questions generated",
            });
        }

        const interview = await Interview.create({
            candidateId: candidate._id,
            candidateName: candidate.name,
            email: candidate.email,
            questions,
            answers: [],
            score: 0,
            feedback: "",
            completed: false,
        });

        return res.status(200).json({
            interviewId: interview._id,
            questions,
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
        const { interviewId, answer } = req.body;

        const interview: any = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found",
            });
        }

        interview.answers.push(answer);

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

        const prompt = `
You are a technical interviewer.

Evaluate the following interview answers.

Questions:
${interview.questions.join("\n")}

Answers:
${interview.answers.join("\n")}

Provide:

Score: XX

Feedback: Detailed feedback
`;

        const result = await model.generateContent(prompt);

        const evaluation = result.response.text();

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