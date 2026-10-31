import { PDFParse } from "pdf-parse";
import Candidate from "../models/Candidate";
import {
    uploadResume as uploadResumeToS3,
    getResumeDownloadUrl,
    deleteResume
} from "../lib/s3";

export const uploadResume = async (req: any, res: any) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({
                message: "No resume file uploaded"
            });
        }

        const candidateId = req.body.candidateId;
        if (!candidateId) {
            return res.status(400).json({
                message: "Candidate ID is required"
            });
        }

        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found"
            });
        }

        // Parse resume PDF text from memory buffer using pdf-parse v2 API
        let resumeText = "";
        try {
            const parser = new PDFParse({ data: req.file.buffer });
            const pdfData = await parser.getText();
            await parser.destroy();
            resumeText = pdfData.text || "";
        } catch (parseError: any) {
            console.error("PDF parse error:", parseError);
            return res.status(400).json({
                message: "Failed to parse PDF file"
            });
        }

        // Upload buffer to AWS S3
        const userId = candidate.userId ? candidate.userId.toString() : (req.user?.id || "anonymous");
        let s3Key: string;
        try {
            s3Key = await uploadResumeToS3(
                req.file.buffer,
                userId,
                req.file.originalname
            );
        } catch (s3Error: any) {
            console.error("S3 upload error:", s3Error);
            // Do not save a broken record if S3 upload fails
            return res.status(500).json({
                message: "Failed to upload resume to S3 storage"
            });
        }

        // If candidate already had an existing S3 resume, clean it up
        if (candidate.s3Key && candidate.s3Key !== s3Key) {
            try {
                await deleteResume(candidate.s3Key);
            } catch (cleanupError) {
                console.error("Old S3 resume cleanup error:", cleanupError);
            }
        }

        // Save fields in MongoDB
        candidate.resumeText = resumeText;
        candidate.s3Key = s3Key;
        candidate.fileName = req.file.originalname;
        candidate.size = req.file.size;

        await candidate.save();

        return res.json({
            message: "Resume Uploaded",
            resumeText
        });
    } catch (error: any) {
        console.error("Resume upload error:", error);
        return res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
};

export const getResumeDownloadLink = async (req: any, res: any) => {
    try {
        const candidateId =
            req.params.candidateId || req.params.id || req.query.candidateId;

        if (!candidateId) {
            return res.status(400).json({
                message: "Candidate ID is required"
            });
        }

        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found"
            });
        }

        // Only owner or admin can download
        const currentUserId = req.user?.id || req.user?._id;
        const candidateUserId = candidate.userId ? candidate.userId.toString() : null;
        const isOwner =
            candidateUserId &&
            currentUserId &&
            candidateUserId === currentUserId.toString();
        const isAdmin =
            req.user?.role === "admin" || req.user?.isAdmin === true;

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: "Forbidden: You are not authorized to access this resume"
            });
        }

        if (!candidate.s3Key) {
            return res.status(404).json({
                message: "No resume file found for this candidate"
            });
        }

        const url = await getResumeDownloadUrl(candidate.s3Key);

        return res.json({ url });
    } catch (error: any) {
        console.error("Get resume download URL error:", error);
        return res.status(500).json({
            message: error.message || "Failed to generate download URL"
        });
    }
};

export const deleteResumeHandler = async (req: any, res: any) => {
    try {
        const candidateId =
            req.params.candidateId || req.params.id || req.query.candidateId;

        if (!candidateId) {
            return res.status(400).json({
                message: "Candidate ID is required"
            });
        }

        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found"
            });
        }

        const currentUserId = req.user?.id || req.user?._id;
        const candidateUserId = candidate.userId ? candidate.userId.toString() : null;
        const isOwner =
            candidateUserId &&
            currentUserId &&
            candidateUserId === currentUserId.toString();
        const isAdmin =
            req.user?.role === "admin" || req.user?.isAdmin === true;

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: "Forbidden: You are not authorized to delete this resume"
            });
        }

        if (candidate.s3Key) {
            await deleteResume(candidate.s3Key);
            candidate.s3Key = "";
            candidate.fileName = "";
            candidate.size = 0;
            candidate.resumeText = "";
            await candidate.save();
        }

        return res.json({
            message: "Resume deleted successfully"
        });
    } catch (error: any) {
        console.error("Delete resume error:", error);
        return res.status(500).json({
            message: error.message || "Failed to delete resume"
        });
    }
};
