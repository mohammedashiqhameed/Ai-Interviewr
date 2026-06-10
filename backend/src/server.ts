import dotenv from "dotenv";
dotenv.config();
import candidateRoutes from "./routes/candidateRoutes";
import express from "express";

import cors from "cors";

import { connectDB } from "./config/db";

import authRoutes from "./routes/authRoutes";
import resumeRoutes
    from "./routes/resumeRoutes";
import interviewRoutes
    from "./routes/interviewRoutes";

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server Running");
});
app.use(
    "/api/resume",
    resumeRoutes
);
app.use("/api/candidates", candidateRoutes);
app.use(
    "/api/interview",
    interviewRoutes
);

app.listen(process.env.PORT, () => {
    console.log(
        `Server Running On Port ${process.env.PORT}`
    );
});