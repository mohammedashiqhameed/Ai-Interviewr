import express from "express";

import { protect }
    from "../middleware/authMiddleware";

import {
    createCandidate
}
    from "../controllers/candidateController";

const router =
    express.Router();

router.post(
    "/",
    protect,
    createCandidate
);

export default router;