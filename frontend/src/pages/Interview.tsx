import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    useState
} from "react";

import QuestionCard
    from "../components/QuestionCard";

import {
    submitAnswer,
    finishInterview
}
    from "../services/interviewService";

function Interview() {

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const {
        interviewId,
        questions
    } = location.state;

    const [currentQuestion,
        setCurrentQuestion] =
        useState(0);

    const [answer,
        setAnswer] =
        useState("");

    const [selectedOption,
        setSelectedOption] =
        useState("");

    const [loading,
        setLoading] =
        useState(false);

    const [attemptedCount,
        setAttemptedCount] =
        useState(0);

    const [answers, setAnswers] =
        useState<(string | null)[]>(
            new Array(questions.length).fill(null)
        );

    const totalQuestions =
        questions.length;

    const progress =
        ((currentQuestion + 1)
            / totalQuestions) * 100;

    const currentQ =
        questions[currentQuestion];

    const isMcq =
        currentQ?.type === "mcq";

    const currentAnswer =
        isMcq ? selectedOption : answer;

    const goToNextOrFinish =
        async (
            didAttempt: boolean
        ) => {

            try {

                setLoading(true);

                const updatedAnswers =
                    [...answers];

                if (didAttempt) {

                    await submitAnswer(
                        interviewId,
                        currentAnswer,
                        currentQuestion
                    );

                    updatedAnswers[currentQuestion] =
                        currentAnswer;

                    setAttemptedCount(
                        (prev) => prev + 1
                    );
                } else {
                    await submitAnswer(
                        interviewId,
                        "Not attempted",
                        currentQuestion
                    );

                    updatedAnswers[currentQuestion] =
                        "Not attempted";
                }

                setAnswers(updatedAnswers);
                setAnswer("");
                setSelectedOption("");

                if (
                    currentQuestion <
                    totalQuestions - 1
                ) {

                    setCurrentQuestion(
                        currentQuestion + 1
                    );

                } else {

                    await finishInterview(
                        interviewId
                    );

                    navigate(
                        "/completed",
                        {
                            state: {
                                attemptedCount:
                                    didAttempt
                                        ? attemptedCount + 1
                                        : attemptedCount,
                                totalQuestions,
                                questions,
                                answers:
                                    updatedAnswers
                            }
                        }
                    );

                }

            } catch (error) {

                alert(
                    "Something went wrong"
                );

            } finally {

                setLoading(false);

            }
        };

    const handleNext =
        async () => {

            if (isMcq) {

                if (!selectedOption) {

                    alert(
                        "Please select an option"
                    );

                    return;
                }

            } else {

                if (!answer.trim()) {

                    alert(
                        "Please enter your answer"
                    );

                    return;
                }
            }

            await goToNextOrFinish(true);
        };

    const handleSkip =
        async () => {

            await goToNextOrFinish(false);
        };

    return (

        <div className="min-h-screen bg-[#faf7f2] py-10 px-6">

            <div className="max-w-4xl mx-auto">

                <div className="bg-white rounded-3xl shadow-xl p-10">

                    <h1 className="text-3xl font-bold text-center">

                        AI Interview Session

                    </h1>

                    <div className="mt-8">

                        <div className="flex justify-between mb-2">

                            <span>

                                Question
                                {" "}
                                {currentQuestion + 1}
                                {" "}
                                of
                                {" "}
                                {totalQuestions}

                            </span>

                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                isMcq
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-green-100 text-green-700"
                            }`}>

                                {isMcq ? "MCQ" : "Theory"}

                            </span>

                        </div>

                        <div className="flex justify-between mb-2">

                            <span>

                                {Math.round(
                                    progress
                                )}
                                %

                            </span>

                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3">

                            <div
                                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                                style={{
                                    width:
                                        `${progress}%`
                                }}
                            />

                        </div>

                    </div>

                    <div className="mt-8">

                        <QuestionCard
                            question={currentQ}
                            selectedOption={
                                selectedOption
                            }
                            onSelectOption={
                                setSelectedOption
                            }
                        />

                    </div>

                    {!isMcq && (

                        <div className="mt-8">

                            <label className="block mb-2 text-gray-700">

                                Your Answer

                            </label>

                            <textarea
                                rows={8}
                                value={answer}
                                onChange={(e) =>
                                    setAnswer(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl p-4 resize-none"
                                placeholder="Type your answer here..."
                            />

                        </div>

                    )}

                    <div className="flex gap-4 mt-8">

                        <button
                            onClick={handleSkip}
                            disabled={loading}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-semibold transition"
                        >

                            {currentQuestion ===
                                totalQuestions - 1
                                ? "Skip & Finish"
                                : "Skip & Next"}

                        </button>

                        <button
                            onClick={handleNext}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
                        >

                            {currentQuestion ===
                                totalQuestions - 1
                                ? "Finish"
                                : "Next"}

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Interview;