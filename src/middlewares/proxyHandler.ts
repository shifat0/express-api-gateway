import { Application } from 'express';
import config from '@/configs/config.json';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import envConfig from '@/configs/envConfig';
import logger from '@/utils/logger';

export default function proxyHandler(app: Application) {
    Object.entries(config.services).forEach(([name, service]) => {
        const proxy = createProxyMiddleware({
            target: `http://127.0.0.1:${service.port}`,
            changeOrigin: true,
            pathFilter: `${service.endpoint}`,
            // pathRewrite: { [`^${service.endpoint}`]: '' },
            // pathRewrite: { [`^${envConfig.API_VERSION}`]: '' },
            logger: logger,
            on: {
                proxyReq: fixRequestBody,
                error: (err: any, req: any, res: any) => {
                    console.log(err);
                }
            }
        });

        app.use(proxy);
    });
}
