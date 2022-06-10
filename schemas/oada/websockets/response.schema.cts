/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/websockets/response.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'This is the format of an OADA websocket response (server to client)',
  definitions: {
    id: {
      $ref: 'request.schema.json#/properties/requestId',
    },
  },
  type: 'object',
  required: ['requestId', 'status'],
  properties: {
    requestId: {
      description:
        'Array of request IDs to which this response pertains. A single string is supported only for legacy purposes.',
      anyOf: [
        {
          type: 'array',
          minItems: 1,
          items: {
            $ref: '#/definitions/id',
          },
        },
        { $ref: '#/definitions/id' },
      ],
    },
    status: {
      type: 'integer',
    },
    statusText: { type: 'string' },
    headers: {
      type: 'object',
      additionalProperties: { type: 'string' },
    },
    resourceId: {
      $ref: '../../oada.schema.json#/definitions/_id',
    },
    resource: {
      $comment: 'Not sure if this is always actually a resource...',
    },
    data: {
      description: 'The optional data payload of the request',
    },
  },
};

export = schema;
