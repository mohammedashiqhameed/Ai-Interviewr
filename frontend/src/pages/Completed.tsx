import {
    useNavigate
} from "react-router-dom";

function Completed() {

    const navigate =
        useNavigate();

    const handleLogout =
        () => {

            localStorage.removeItem(
                "token"
            );

            navigate(
                "/login"
            );
        };

    return (

        <div className="min-h-screen bg-[#faf7f2] flex justify-center items-center px-6">

            <div className="bg-white shadow-xl rounded-3xl p-12 text-center max-w-xl">

                <h1 className="text-4xl font-bold text-green-600">

                    🎉 Interview Completed

                </h1>

                <p className="mt-6 text-gray-600 text-lg">

                    Thank you for attending the interview.

                </p>

                <p className="mt-2 text-gray-500">

                    Your responses have been recorded successfully.

                </p>

                <button
                    onClick={
                        handleLogout
                    }
                    className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl"
                >

                    Logout

                </button>

            </div>

        </div>
    );
}

export default Completed;