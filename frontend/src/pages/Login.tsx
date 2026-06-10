import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] =
        useState(false);

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data =
                await loginUser(
                    email,
                    password
                );

            login(data.token);

            alert(
                "Login Successful"
            );

            navigate("/candidate");

        } catch (error) {

            alert(
                "Invalid Email or Password"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4">

            <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

                <h1 className="text-4xl font-bold text-center text-gray-800">

                    Welcome Back

                </h1>

                <p className="text-center text-gray-500 mt-2">

                    Login to continue your AI interview journey

                </p>

                <form
                    onSubmit={handleLogin}
                    className="mt-8"
                >

                    <div>
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl mt-8 font-semibold transition"
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>

                <div className="mt-6 text-center">

                    <p className="text-gray-600">

                        Don't have an account?

                        <span
                            onClick={() =>
                                navigate(
                                    "/signup"
                                )
                            }
                            className="text-blue-600 font-semibold ml-2 cursor-pointer hover:underline"
                        >

                            Signup

                        </span>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;