/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { parse } from 'content-type';

const root = 'https://formats.openag.io';
const regex = /^application\/vnd\.([^.]+)\.(.*)\+json$/;

/**
 * Get schema id coressponding to an OADA formats media-type
 *
 * @param mediaType (e.g., 'application/vnd.oada.foo.1+json')
 * @returns coressponding schema $id relative to root
 * (e.g., /oada/foo.schema.json)
 */
export function getSchema(mediaType: string): string | undefined {
  const matches = regex.exec(mediaType.toLowerCase());
  if (!matches) {
    return;
  }

  const [, domain, type] = matches;
  const types = type?.split('.') ?? [];
  // Handle versioned types
  const version = types.pop() ?? Number.NaN;
  if (!Number(version)) {
    return;
  }

  // TODO: Enforce that version is a number??
  return `${domain}/${types.join('/')}/v${version}.schema.json`;
}

/**
 * Resolve to full OADA formats schema URL
 */
function resolveSchema(type: string) {
  const schema = getSchema(type);
  return schema && `${root}/${schema}`;
}

/**
 * Find correspond OADA formats schema(s) based on media-type
 *
 * @returns array of schema corresponding to the input (yes it's one-to-many)
 */
export default function mediaType2schema(
  ...parameters: Parameters<typeof parse>
) {
  const {
    type,
    parameters: { schema = resolveSchema(type) },
  } = parse(...parameters);

  return schema ? schema.split(' ') : [];
}
