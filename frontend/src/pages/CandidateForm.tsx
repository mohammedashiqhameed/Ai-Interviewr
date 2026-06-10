import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    createCandidate,
    uploadResume,
    startInterview
}
    from "../services/interviewService";

function CandidateForm() {

    const navigate =
        useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [resume,
        setResume] =
        useState<File | null>(
            null
        );

    const [loading,
        setLoading] =
        useState(false);

    const handleSubmit =
        async (
            e: React.FormEvent
        ) => {

            e.preventDefault();

            try {

                setLoading(true);

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const candidate =
                    await createCandidate(
                        {
                            name,
                            email,
                            phone
                        },
                        token!
                    );

                const formData =
                    new FormData();

                formData.append(
                    "candidateId",
                    candidate._id
                );

                if (resume) {
                    formData.append(
                        "resume",
                        resume
                    );
                }

                await uploadResume(
                    formData
                );

                const interview =
                    await startInterview(
                        candidate._id
                    );

                navigate(
                    "/interview",
                    {
                        state: {
                            interviewId:
                                interview.interviewId,
                            questions:
                                interview.questions
                        }
                    }
                );

            } catch (error) {

                alert(
                    "Failed to start interview"
                );

            } finally {

                setLoading(false);

            }
        };

    return (

        <div className="min-h-screen bg-[#faf7f2] flex justify-center items-center px-6">

            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl p-10">

                <h1 className="text-4xl font-bold text-center text-gray-800">

                    Candidate Information

                </h1>

                <p className="text-center text-gray-500 mt-3">

                    Complete your details and upload your resume to begin the AI interview.

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10"
                >

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="block mb-2 text-gray-700">

                                Full Name

                            </label>

                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-gray-700">

                                Email

                            </label>

                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-gray-700">

                                Phone Number

                            </label>

                            <input
                                type="text"
                                required
                                value={phone}
                                onChange={(e) =>
                                    setPhone(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-gray-700">

                                Resume PDF

                            </label>

                            <input
                                type="file"
                                accept=".pdf"
                                required
                                onChange={(e) =>
                                    setResume(
                                        e.target.files?.[0] ||
                                        null
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg"
                    >

                        {loading
                            ? "Preparing Interview..."
                            : "Start Interview"}

                    </button>

                </form>

            </div>

        </div>
    );
}

export default CandidateForm;