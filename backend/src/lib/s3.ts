import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3Client = new S3Client({
    region: process.env.AWS_REGION
});

const getBucketName = (): string => {
    const bucket = process.env.S3_BUCKET;
    if (!bucket) {
        throw new Error("S3_BUCKET environment variable is not defined");
    }
    return bucket;
};

export const uploadResume = async (
    buffer: Buffer,
    userId: string,
    originalName?: string
): Promise<string> => {
    const randomId = crypto.randomUUID();
    const key = `resumes/${userId}/${randomId}.pdf`;

    const command = new PutObjectCommand({
        Bucket: getBucketName(),
        Key: key,
        Body: buffer,
        ContentType: "application/pdf"
    });

    await s3Client.send(command);
    return key;
};

export const getResumeDownloadUrl = async (key: string): Promise<string> => {
    const command = new GetObjectCommand({
        Bucket: getBucketName(),
        Key: key
    });

    return await getSignedUrl(s3Client, command, { expiresIn: 300 });
};

export const deleteResume = async (key: string): Promise<void> => {
    const command = new DeleteObjectCommand({
        Bucket: getBucketName(),
        Key: key
    });

    await s3Client.send(command);
};

