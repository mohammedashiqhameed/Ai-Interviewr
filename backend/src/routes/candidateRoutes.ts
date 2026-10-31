import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
    createCandidate,
    deleteCandidate
} from "../controllers/candidateController";

const router = express.Router();

router.post(
    "/",
    protect,
    createCandidate
);

router.delete(
    "/:id",
    protect,
    deleteCandidate
);

export default router;
