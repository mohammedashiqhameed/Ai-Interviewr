import Candidate from "../models/Candidate";
import { deleteResume } from "../lib/s3";

export const createCandidate = async (req: any, res: any) => {
    try {
        const { name, email, phone } = req.body;

        const candidate = await Candidate.create({
            userId: req.user.id,
            name,
            email,
            phone
        });

        res.status(201).json(candidate);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteCandidate = async (req: any, res: any) => {
    try {
        const candidateId = req.params.id || req.params.candidateId;
        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
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
                message: "Forbidden: You are not authorized to delete this candidate"
            });
        }

        if (candidate.s3Key) {
            try {
                await deleteResume(candidate.s3Key);
            } catch (s3Error) {
                console.error("Failed to delete S3 object:", s3Error);
            }
        }

        await Candidate.findByIdAndDelete(candidateId);

        return res.json({ message: "Candidate deleted successfully" });
    } catch (error: any) {
        console.error("Delete candidate error:", error);
        return res.status(500).json({
            message: error.message || "Failed to delete candidate"
        });
    }
};
