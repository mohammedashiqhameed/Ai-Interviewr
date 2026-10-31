import multer from "multer";

const storage = multer.memoryStorage();

const multerInstance = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            const error: any = new Error("Only PDF files are allowed");
            error.statusCode = 400;
            cb(error);
        }
    }
});

const originalSingle = multerInstance.single.bind(multerInstance);

multerInstance.single = (fieldName: string) => {
    const middleware = originalSingle(fieldName);
    return ((req: any, res: any, next: any) => {
        middleware(req, res, (err: any) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    if (err.code === "LIMIT_FILE_SIZE") {
                        return res.status(400).json({
                            message: "File size exceeds 10 MB limit"
                        });
                    }
                    return res.status(400).json({
                        message: err.message
                    });
                }
                return res.status(400).json({
                    message: err.message || "Only PDF files are allowed"
                });
            }
            next();
        });
    }) as any;
};

export const upload = multerInstance;
