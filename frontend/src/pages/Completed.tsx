import {
    useNavigate,
    useLocation
} from "react-router-dom";

import {
    useState
} from "react";

import {
    useAuth
} from "../context/AuthContext";

function Completed() {

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const { logout } = useAuth();

    const attemptedCount =
        location.state?.attemptedCount ?? 0;

    const totalQuestions =
        location.state?.totalQuestions ?? 10;

    const questions: any[] =
        location.state?.questions ?? [];

    const answers: (string | null)[] =
        location.state?.answers ?? [];

    const [showModal, setShowModal] =
        useState(true);

    const handleLogout =
        () => {
            logout();
            navigate("/login");
        };

    const getQuestionText = (q: any): string => {
        if (typeof q === "string") return q;
        return q?.question || "";
    };

    const getQuestionType = (q: any): string => {
        if (typeof q === "string") return "theory";
        return q?.type || "theory";
    };

    return (

        <div className="min-h-screen bg-[#faf7f2] py-10 px-6">

            <div className="max-w-4xl mx-auto">

                <div className="bg-white shadow-xl rounded-3xl p-12 text-center max-w-xl mx-auto">

                    <h1 className="text-4xl font-bold text-green-600">

                        🎉 Interview Completed

                    </h1>

                    <p className="mt-6 text-gray-600 text-lg">

                        Thank you for attending the interview.

                    </p>

                    <p className="mt-2 text-gray-500">

                        Your responses have been recorded successfully.

                    </p>

                </div>

                {!showModal && (

                    <div className="mt-10 bg-white shadow-xl rounded-3xl p-10">

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">

                            Your Questions & Answers

                        </h2>

                        {questions.map(
                            (question: any, index: number) => (

                                <div
                                    key={index}
                                    className="mb-6 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                                >

                                    <div className="flex items-center gap-2 mb-1">

                                        <p className="font-semibold text-gray-800">

                                            Question {index + 1}:

                                        </p>

                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                            getQuestionType(question) === "mcq"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-green-100 text-green-700"
                                        }`}>

                                            {getQuestionType(question) === "mcq"
                                                ? "MCQ"
                                                : "Theory"}

                                        </span>

                                    </div>

                                    <p className="text-gray-800 mb-2 font-medium">

                                        {getQuestionText(question)}

                                    </p>

                                    {getQuestionType(question) === "mcq" && Array.isArray(question.options) && (

                                        <div className="my-3 space-y-1 pl-2">

                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                Options:
                                            </p>

                                            {question.options.map((opt: string, optIdx: number) => {
                                                const label = String.fromCharCode(65 + optIdx);
                                                return (
                                                    <p key={optIdx} className="text-sm text-gray-700">
                                                        <span className="font-semibold text-gray-600">{label}.</span> {opt}
                                                    </p>
                                                );
                                            })}

                                        </div>

                                    )}

                                    <p className="mt-2 text-gray-600">

                                        <span className="font-medium">
                                            Answer:{" "}
                                        </span>

                                        {answers[index] && answers[index] !== "Not attempted"
                                            ? answers[index]
                                            : (
                                                <span className="text-red-500 italic">
                                                    Not attempted
                                                </span>
                                            )
                                        }

                                    </p>

                                </div>

                            )
                        )}

                        <button
                            onClick={
                                handleLogout
                            }
                            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                        >

                            Logout

                        </button>

                    </div>

                )}

            </div>

            {showModal && (

                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">

                    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">

                        <div className="text-5xl mb-4">
                            📊
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800">

                            Interview Summary

                        </h2>

                        <p className="mt-4 text-lg text-gray-600">

                            You attempted{" "}
                            <span className="font-bold text-blue-600">
                                {attemptedCount}
                            </span>
                            {" "}out of{" "}
                            <span className="font-bold text-blue-600">
                                {totalQuestions}
                            </span>
                            {" "}questions.

                        </p>

                        <div className="mt-6 w-full bg-gray-200 rounded-full h-3">

                            <div
                                className="bg-blue-600 h-3 rounded-full transition-all duration-700"
                                style={{
                                    width:
                                        `${(attemptedCount / totalQuestions) * 100}%`
                                }}
                            />

                        </div>

                        <button
                            onClick={() =>
                                setShowModal(false)
                            }
                            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                        >

                            Close

                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Completed;