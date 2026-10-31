import express from "express";
import { upload } from "../middleware/uploadMiddleware";
import { protect } from "../middleware/authMiddleware";
import {
    uploadResume,
    getResumeDownloadLink,
    deleteResumeHandler
} from "../controllers/resumeController";

const router = express.Router();

router.post(
    "/upload",
    upload.single("resume"),
    uploadResume
);

router.get(
    "/download/:candidateId",
    protect,
    getResumeDownloadLink
);

router.get(
    "/:candidateId/download",
    protect,
    getResumeDownloadLink
);

router.delete(
    "/:candidateId",
    protect,
    deleteResumeHandler
);

export default router;
