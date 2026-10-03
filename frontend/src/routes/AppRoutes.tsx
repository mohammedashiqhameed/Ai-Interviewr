import {
    Routes,
    Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CandidateForm from "../pages/CandidateForm";
import Interview from "../pages/Interview";
import Completed from "../pages/Completed";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />

            <Route
                path="/candidate"
                element={
                    <ProtectedRoute>
                        <CandidateForm />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/interview"
                element={
                    <ProtectedRoute>
                        <Interview />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/completed"
                element={
                    <ProtectedRoute>
                        <Completed />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default AppRoutes;