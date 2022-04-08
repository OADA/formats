/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { FastifyPluginAsync } from 'fastify';

import { Options, handleResponse } from './';

/**
 * Create a fastify plugin version
 */
export const plugin: FastifyPluginAsync<Options> = async (
  fastify,
  _options
) => {
  fastify.addHook('onSend', async (_request, reply) => {
    const headers = handleResponse(
      reply.getHeader('Content-Type'),
      reply.getHeader('Link')
    );
    reply.log.trace('Setting schema headers: %O', headers);
    void reply.headers(headers);
  });
};
