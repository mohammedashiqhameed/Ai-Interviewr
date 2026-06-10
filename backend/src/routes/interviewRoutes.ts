import express from "express";

import {
    startInterview,
    submitAnswer,
    finishInterview,
    getResult
}
    from "../controllers/interviewController";

const router =
    express.Router();

router.post(
    "/start",
    startInterview
);

router.post(
    "/answer",
    submitAnswer
);

router.post(
    "/finish",
    finishInterview
);

router.get(
    "/result/:interviewId",
    getResult
);

export default router;