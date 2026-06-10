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

    const [loading,
        setLoading] =
        useState(false);

    const totalQuestions =
        questions.length;

    const progress =
        ((currentQuestion + 1)
            / totalQuestions) * 100;

    const handleNext =
        async () => {

            if (!answer.trim()) {

                alert(
                    "Please enter your answer"
                );

                return;
            }

            try {

                setLoading(true);

                await submitAnswer(
                    interviewId,
                    answer
                );

                setAnswer("");

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
                        "/completed"
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
                            question={
                                questions[
                                currentQuestion
                                ]
                            }
                        />

                    </div>

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

                    <button
                        onClick={handleNext}
                        disabled={loading}
                        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
                    >

                        {currentQuestion ===
                            totalQuestions - 1
                            ? "Submit Interview"
                            : "Next Question"}

                    </button>

                </div>

            </div>

        </div>
    );
}

export default Interview;