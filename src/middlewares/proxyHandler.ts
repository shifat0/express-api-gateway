import { Application } from 'express';
import config from '@/configs/config.json';
import { createProxyMiddleware } from 'http-proxy-middleware';
import envConfig from '@/configs/envConfig';

export default function proxyHandler(app: Application) {
    Object.entries(config.services).forEach(([name, service]) => {
        const proxy = createProxyMiddleware({
            target: `http://localhost:${service.port}`,
            changeOrigin: true,
            pathFilter: `${envConfig.API_VERSION}${service.endpoint}`,
            logger: console
        });

        app.use(proxy);
    });
}
