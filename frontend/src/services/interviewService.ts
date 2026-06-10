import api from "./api";

export const createCandidate =
    async (
        candidateData: any,
        token: string
    ) => {

        const response =
            await api.post(
                "/candidates",
                candidateData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;
    };

export const uploadResume =
    async (
        formData: FormData
    ) => {

        const response =
            await api.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

        return response.data;
    };

export const startInterview =
    async (
        candidateId: string
    ) => {

        const response =
            await api.post(
                "/interview/start",
                {
                    candidateId
                }
            );

        return response.data;
    };
export const submitAnswer =
    async (
        interviewId: string,
        answer: string
    ) => {

        const response =
            await api.post(
                "/interview/answer",
                {
                    interviewId,
                    answer
                }
            );

        return response.data;
    };

export const finishInterview =
    async (
        interviewId: string
    ) => {

        const response =
            await api.post(
                "/interview/finish",
                {
                    interviewId
                }
            );

        return response.data;
    };