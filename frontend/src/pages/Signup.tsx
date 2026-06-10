import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Signup() {
    const navigate =
        useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const [loading,
        setLoading] =
        useState(false);

    const handleSignup =
        async (
            e: React.FormEvent
        ) => {

            e.preventDefault();

            if (
                password !==
                confirmPassword
            ) {
                alert(
                    "Passwords do not match"
                );
                return;
            }

            try {

                setLoading(true);

                await registerUser(
                    name,
                    email,
                    password
                );

                alert(
                    "Account Created Successfully"
                );

                navigate(
                    "/login"
                );

            } catch (error) {

                alert(
                    "Signup Failed"
                );

            } finally {

                setLoading(false);

            }
        };

    return (
        <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4">

            <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

                <h1 className="text-4xl font-bold text-center text-gray-800">

                    Create Account

                </h1>

                <p className="text-center text-gray-500 mt-2">

                    Start your AI-powered interview experience

                </p>

                <form
                    onSubmit={handleSignup}
                    className="mt-8"
                >

                    <div>

                        <label className="block text-gray-700 mb-2">

                            Full Name

                        </label>

                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="mt-5">

                        <label className="block text-gray-700 mb-2">

                            Email

                        </label>

                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="mt-5">

                        <label className="block text-gray-700 mb-2">

                            Password

                        </label>

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="mt-5">

                        <label className="block text-gray-700 mb-2">

                            Confirm Password

                        </label>

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl mt-8 font-semibold transition"
                    >

                        {loading
                            ? "Creating Account..."
                            : "Signup"}

                    </button>

                </form>

                <div className="mt-6 text-center">

                    <p className="text-gray-600">

                        Already have an account?

                        <span
                            onClick={() =>
                                navigate(
                                    "/login"
                                )
                            }
                            className="text-blue-600 font-semibold ml-2 cursor-pointer hover:underline"
                        >

                            Login

                        </span>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Signup;