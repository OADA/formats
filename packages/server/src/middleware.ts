/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { RequestHandler } from 'express';

import type { Options } from './index.js';
import { handleResponse } from './index.js';

/**
 * Create an express middleware version
 *
 * Must be mounted _after_ Content-Type of response is set
 */
export function middleware(_options: Options): RequestHandler {
  return async function (_request, response, next) {
    try {
      const headers = handleResponse(
        response.get('Content-Type'),
        response.get('Link')
      );
      // @ts-expect-error stuff
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      response.log?.trace('Setting schema headers: %O', headers);
      response.set(headers);

      next();
    } catch (error: unknown) {
      next(error);
    }
  };
}
