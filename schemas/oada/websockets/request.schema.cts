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
  $id: 'https://formats.openag.io/oada/websockets/request.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'This is the format of an OADA websocket request (client to server)',
  definitions: {
    id: {
      type: 'string',
    },
  },
  type: 'object',
  required: ['requestId', 'path', 'method', 'headers'],
  properties: {
    requestId: { $ref: '#/definitions/id' },
    path: { $ref: '../../oada.schema.json#/definitions/path' },
    method: {
      anyOf: [
        {
          $comment: 'Standard HTTP methods',
          $ref: '../../oada.schema.json#/definitions/method',
        },
        {
          $comment: 'WebSocket only methods',
          enum: [
            'watch',
            'head-watch',
            'get-watch',
            'put-watch',
            'post-watch',
            'delete-watch',
            'unwatch',
            'ping',
          ],
        },
      ],
    },
    headers: {
      type: 'object',
      required: ['authorization'],
      properties: { authorization: { type: 'string' } },
    },
    data: {
      description: 'The optional data payload of the request',
    },
  },
};

export = schema;
