import type { FastifyPluginAsync } from 'fastify';

import { Options, handleResponse } from './';

/**
 * Create a fastify plugin version
 */
export const plugin: FastifyPluginAsync<Options> = async function (
  fastify,
  _opts
) {
  fastify.addHook('onSend', async (_request, reply) => {
    const headers = handleResponse(
      reply.getHeader('Content-Type'),
      reply.getHeader('Link')
    );
    reply.log.trace('Setting schema headers: %O', headers);
    reply.headers(headers);
  });
};
