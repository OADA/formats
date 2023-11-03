/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { format, parse } from 'content-type';

import mediaType2schema from '@oada/media-types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Options {}

function isArray(value: unknown): value is unknown[] | readonly unknown[] {
  return Array.isArray(value);
}

/**
 * Determines schema for a response and what headers to add etc.
 */
export function handleResponse(
  contentType?: string,
  links?: string | readonly string[],
): Record<string, string | string[]> {
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

  const aLinks = isArray(links) ? links : links ? [links] : [];

  /**
   * Looks like sending the same info twice,
   * because OADA formats use their public URL as their $id
   *
   * @todo Check for non-OADA schema rather than assuming $id is always URL?
   */
  return {
    /**
     * @see https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.11.1
     *
     * @todo Unclear if multiple schema entries means multiple Links or one?
     */
    'Link': [...aLinks, ...schema.map((s) => `<${s}#>; rel="describedby"`)],
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
 * Express middleware version
 */
export { middleware } from './middleware.js';

/**
 * Fastify plugin version
 */
export { plugin } from './plugin.js';
