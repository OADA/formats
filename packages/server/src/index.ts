import { parse, format } from 'content-type';

import mediaType2schema from '@oada/media-types';

export interface Options {}

/**
 * Determines schema for a response and what headers to add etc.
 */
export function handleResponse(
  contentType?: string,
  links?: string
): Record<string, string> {
  if (!contentType) {
    // Nothing to do
    return {};
  }
  const { type, parameters } = parse(contentType);
  const schema = mediaType2schema(contentType);
  if (schema.length === 0) {
    // Nothing to do
    return {};
  }

  /**
   * Looks like sending the same info twice,
   * becaue OADA formats use their public URL as their $id
   *
   * @todo Check for non-OADA schema rather than assuming $id is always URL?
   */
  return {
    /**
     * @see https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.11.1
     *
     * @todo Unclear if multiple schema entries means multiple Links or one?
     */
    'Link': [
      ...(links ? [links] : []),
      schema.map((schema) => `<${schema}#>; rel="describedby"`),
    ].join(', '),
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
