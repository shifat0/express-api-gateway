import { Application } from 'express';
import config from '@/configs/config.json';
import { createProxyMiddleware } from 'http-proxy-middleware';
import envConfig from '@/configs/envConfig';
import logger from '@/utils/logger';
import { IncomingMessage, ServerResponse } from 'http';

export default function proxyHandler(app: Application) {
    Object.entries(config.services).forEach(([name, service]) => {
        const proxy = createProxyMiddleware({
            target: `http://localhost:${service.port}`,
            changeOrigin: true,
            pathFilter: `${service.endpoint}`,
            // pathRewrite: { [`^${envConfig.API_VERSION}`]: '' },
            logger: logger,
            on: {
                proxyReq: (proxyReq: any, req: any, res: any) => {
                    console.log(proxyReq);
                },
                proxyRes: (proxyRes: any, req: any, res: any) => {
                    console.log(proxyRes);
                },
                error: (err: any, req: any, res: any) => {
                    console.log(err);
                }
            }
        });

        app.use(proxy);
    });
}
