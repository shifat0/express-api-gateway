import express, { Response } from 'express';
import cors from 'cors';
import errorHandler from '@/middlewares/errorHandler';
import { corsConfigOptions } from '@/configs/corsConfig';
import logRequests from '@/middlewares/logRequests';
import rateLimiter from '@/middlewares/rateLimiter';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import proxyHandler from './middlewares/proxyHandler';

// Initializing the app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(logRequests);
app.use(helmet());
app.use(rateLimiter);
app.use(ExpressMongoSanitize());

proxyHandler(app);

// Health Route
app.get('/health', (_req, res: Response) => {
    res.status(200).json({
        status: 'Up',
        message: 'API Gateway is running'
    });
});

// error handler
app.use(errorHandler);

export default app;
