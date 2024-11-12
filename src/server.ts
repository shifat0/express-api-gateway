import app from '@/app';
import envConfig from '@/configs/envConfig';
import connectDB from '@/db';
import logger from '@/utils/logger';

const port = envConfig.PORT || 8005;

// Database Connection
connectDB();

app.listen(port, () => {
    logger.info(`API Gateway is running on port:${port}`);
});
