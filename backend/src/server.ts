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

const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

app.use(cors());

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

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

app.listen(PORT, () => {
    console.log(
        `Server Running On Port ${PORT}`
    );
});