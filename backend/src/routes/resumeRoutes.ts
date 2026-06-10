import express from "express";

import {
    upload
}
    from "../middleware/uploadMiddleware";

import {
    uploadResume
}
    from "../controllers/resumeController";

const router =
    express.Router();

router.post(
    "/upload",
    upload.single(
        "resume"
    ),
    uploadResume
);

export default router;