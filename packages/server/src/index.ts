import type { ServerResponse } from 'http';

import { parse, format } from 'content-type';

import mediaType2schema from '@oada/media-types';

export interface Options {}

/**
 * Determines schema for a response and what headers to add etc.
 */
export function handleResponse(res: ServerResponse) {
  const { type, parameters } = parse(res);
  const schema = mediaType2schema(res);
  if (schema.length === 0) {
    // Nothing to do
    return {};
  }
  // Append to existing links
  const link = ([] as Array<string | number>).concat(
    res.getHeader('Link') || []
  );
  // Looks like sending the same info twice
  // becaue OADA formats use their public URL as their $id
  // TODO: Check for non-OADA schema rather than assuming $id is always URL?
  return {
    /**
     * @see https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.11.1
     *
     * @todo Unclear if multiple schema entries means multiple Links or one?
     */
    'Link': link.concat(
      schema.map((schema) => `<${schema}#>; rel="describedby"`)
    ),
    /**
     *  @see https://json-schema.org/draft/2019-09/json-schema-core.html#parameter
     */
    'Content-Type': format({
      type,
      parameters: { ...parameters, schema: schema.join(' ') },
    }),
  };
}

/**
 * express middleware version
 */
export { middleware } from './middleware';

/**
 * fastify plugin version
 */
export { plugin } from './plugin';
