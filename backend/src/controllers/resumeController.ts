import fs from "fs";

import { PDFParse } from "pdf-parse";

import Candidate from "../models/Candidate";

export const uploadResume =
    async (
        req: any,
        res: any
    ) => {
        try {

            const filePath =
                req.file.path;

            const dataBuffer =
                fs.readFileSync(
                    filePath
                );

            const parser = new PDFParse({ data: dataBuffer });
            const pdfData = await parser.getText();
            await parser.destroy();

            const resumeText =
                pdfData.text;

            const candidate =
                await Candidate.findById(
                    req.body.candidateId
                );

            if (!candidate) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Candidate not found"
                    });
            }

            candidate.resumeText =
                resumeText;

            await candidate.save();

            res.json({
                message:
                    "Resume Uploaded",
                resumeText
            });

        } catch (error) {

            res
                .status(500)
                .json(error);

        }
    };