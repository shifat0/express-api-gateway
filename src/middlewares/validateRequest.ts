import logger from '@/utils/logger';
import { errorResponse } from '@/utils/response';
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export default function validateRequest<T>(schema: ZodSchema<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { data, error } = schema.safeParse(req.body);

        if (error instanceof ZodError) {
            logger.error(error.errors);
            errorResponse(
                res,
                error.errors.map(err => `${err.path.join('.')} - ${err.message}`)
            );
            return;
        }

        req.body = data;
        next();
    };
}
