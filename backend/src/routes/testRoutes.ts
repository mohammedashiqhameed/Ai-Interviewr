import express from "express";

import {
    testGemini
}
    from "../controllers/testGeminiController";

const router =
    express.Router();

router.get(
    "/",
    testGemini
);

export default router;