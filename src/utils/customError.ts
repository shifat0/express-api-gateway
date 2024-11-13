interface IError extends Error {
    message: string;
    status: number;
}

export default function CustomError(message: string, status?: number) {
    const error = new Error(message) as IError;
    error.status = status || 500;

    throw error;
}
