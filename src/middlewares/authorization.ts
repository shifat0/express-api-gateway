import CustomError from '@/utils/customError';
import { RequestHandler } from 'express';

const authorization: RequestHandler = async (req, _res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(' ').pop();
        if (!accessToken) CustomError('Unauthorized Access! No Token Provided', 401);

        const authenticatedUser = await fetch(`http:localhost:8000/api/v1/auth/verify-token`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!authenticatedUser) CustomError('Unauthorized Access! No Token Provided', 401);

        next();
    } catch (error: any) {
        next(error);
    }
};

export default authorization;
