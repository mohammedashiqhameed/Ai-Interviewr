import mongoose from "mongoose";

const interviewSchema =
    new mongoose.Schema(
        {
            candidateId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Candidate"
            },

            candidateName: String,

            email: String,

            questions: [String],

            answers: [String],

            score: {
                type: Number,
                default: 0
            },

            feedback: {
                type: String,
                default: ""
            },
            evaluation: {
                type: String,
                default: ""
            },

            completed: {
                type: Boolean,
                default: false
            }
        },
        {
            timestamps: true
        }
    );

export default mongoose.model(
    "Interview",
    interviewSchema
);