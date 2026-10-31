import mongoose from "mongoose";

const candidateSchema =
    new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },

            name: {
                type: String,
                required: true
            },

            email: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                required: true
            },

            resumeText: {
                type: String,
                default: ""
            },

            s3Key: {
                type: String,
                default: ""
            },

            fileName: {
                type: String,
                default: ""
            },

            size: {
                type: Number,
                default: 0
            }
        },
        {
            timestamps: true
        }
    );

export default mongoose.model(
    "Candidate",
    candidateSchema
);
