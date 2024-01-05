import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from './config';

// This function sets up a proxy middleware using the specified target domain.
export const setupProxyMiddleware = () => {
  return createProxyMiddleware({
    target: config.targetDomain,
    changeOrigin: true,
    logLevel: 'debug', // You can change the log level as per your needs.
    onProxyReq: (proxyReq, req, res) => {
      // This can be used to modify proxy request headers
    },
    onProxyRes: (proxyRes, req, res) => {
      // This can be used to modify proxy response headers
    },
    pathRewrite: (path, req) => {
      // This can be used if you need to rewrite paths before sending requests to the target
      return path;
    },
   // Additional configurations can be placed here.
  });
};
