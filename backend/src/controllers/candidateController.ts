import Candidate
    from "../models/Candidate";

export const createCandidate =
    async (req: any, res: any) => {
        try {
            const {
                name,
                email,
                phone
            } = req.body;

            const candidate =
                await Candidate.create({
                    userId: req.user.id,
                    name,
                    email,
                    phone
                });

            res.status(201).json(
                candidate
            );
        } catch (error) {
            res.status(500).json(
                error
            );
        }
    };