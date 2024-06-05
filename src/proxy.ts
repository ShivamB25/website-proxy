// src/proxy.ts
import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from './config';
import { getCache } from './websocket';
import { Request, ParamsDictionary, Response, NextFunction } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export const setupProxyMiddleware = () => {
  return (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>, next: NextFunction) => {
    const cache = getCache();
    if (cache) {
      res.send(cache);
    } else {
      createProxyMiddleware({
        target: config.targetDomain,
        changeOrigin: true,
        logLevel: 'debug',
        onProxyReq: (proxyReq, req, res) => {},
        onProxyRes: (proxyRes, req, res) => {},
        pathRewrite: (path, req) => path,
      })(req, res, next);
    }
  };
};