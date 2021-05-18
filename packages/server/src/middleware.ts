import type { RequestHandler } from 'express';

import { Options, handleResponse } from './';

/**
 * Create an express middleware version
 *
 * Must be mounted _after_ Content-Type of response is set
 */
export function middleware(_opts: Options): RequestHandler {
  return async function (_req, res, next) {
    try {
      const headers = handleResponse(res.get('Content-Type'), res.get('Link'));
      // @ts-ignore
      res.log?.trace('Setting schema headers: %O', headers);
      res.set(headers);
    } catch (err) {
      return next(err);
    }
    return next();
  };
}
