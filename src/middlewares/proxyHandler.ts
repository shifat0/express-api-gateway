import { Application } from 'express';
import config from '@/configs/config.json';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function proxyHandler(app: Application) {
    Object.entries(config.services).forEach(([name, service]) => {
        const proxy = createProxyMiddleware({
            target: `http://localhost:${service.port}/${service.endpoint}`,
            changeOrigin: true,
            logger: console
        });

        app.use(service.endpoint, proxy);
    });
}
