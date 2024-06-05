// src/proxy.ts
import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from './config';

export const setupProxyMiddleware = () => {
  return createProxyMiddleware({
    target: config.targetDomain,
    changeOrigin: true,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {},
    onProxyRes: (proxyRes, req, res) => {},
    pathRewrite: (path, req) => path,
  });
};