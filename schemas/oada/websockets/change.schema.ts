/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/websockets/change.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'This is the format of an OADA websocket change notification (server to client)',
  definitions: {
    id: {
      $ref: 'request.schema.json#/properties/requestId',
    },
    path_leftover: {
      $ref: '../../oada.schema.json#/definitions/path',
    },
  },
  type: 'object',
  required: ['requestId', 'resourceId', 'path_leftover', 'change'],
  properties: {
    requestId: {
      type: 'array',
      minItems: 1,
      items: {
        $ref: '#/definitions/id',
      },
    },
    resourceId: {
      $ref: '../../oada.schema.json#/definitions/_id',
    },
    path_leftover: {
      anyOf: [
        {
          type: 'array',
          minItems: 1,
          items: {
            $ref: '#/definitions/path_leftover',
          },
        },
        { $ref: '#/definitions/path_leftover' },
      ],
    },
    change: {
      $ref: '../change.schema.json#',
    },
  },
};

export default schema;
