/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema = {
  $id: 'https://formats.openag.io/oauth-dyn-reg/response.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'application/vnd.oada.oauth-dny-reg.register-response.1+json',
  description:
    '@see {@link https://datatracker.ietf.org/doc/html/rfc7591#section-3.2.1 Client Information Response}',
  required: ['client_id'],
  allOf: [{ $ref: './metadata.schema.json' }],
  properties: {
    client_id: {
      type: 'string',
      description: 'OAuth 2.0 client identifier string',
    },
    client_secret: {
      type: 'string',
      description: 'OAuth 2.0 client secret string',
    },
    client_id_issued_at: {
      type: 'number',
      description:
        'Time at which the client identifier was issued. The time is represented as the number of seconds from 1970-01-01T00:00:00Z as measured in UTC until the date/time of issuance.',
    },
    client_secret_expires_at: {
      type: 'number',
      description:
        'Time at which the client secret will expire or 0 if it will not expire. The time is represented as the number of seconds from 1970-01-01T00:00:00Z as measured in UTC until the date/time of expiration.',
    },
  },
  type: 'object',
} as const satisfies Schema;
export = schema;
