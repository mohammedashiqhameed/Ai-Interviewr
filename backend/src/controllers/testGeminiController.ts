import { model }
    from "../config/gemini";

export const testGemini =
    async (req: any, res: any) => {
        try {
            const result =
                await model.generateContent(
                    "Say Hello"
                );

            res.json({
                response:
                    result.response.text()
            });
        } catch (error) {
            res.status(500).json(
                error
            );
        }
    };