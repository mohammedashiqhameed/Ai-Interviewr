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
                element={<CandidateForm />}
            />
            <Route
                path="/interview"
                element={<Interview />}
            />

            <Route
                path="/completed"
                element={<Completed />}
            />

        </Routes>
    );
}

export default AppRoutes;