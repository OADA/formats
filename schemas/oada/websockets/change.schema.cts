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
  $id: 'https://formats.openag.io/oada/websockets/change.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Websocket change representation',
  description:
    'This is the format of an OADA websocket change notification (server to client)',
  definitions: {
    id: {
      description: 'The id a WATCH request',
      $ref: 'request.schema.json#/properties/requestId',
    },
  },
  type: 'object',
  required: ['requestId', 'resourceId', 'change'],
  properties: {
    requestId: {
      description: 'List of WATCH requests that should receive this change',
      type: 'array',
      minItems: 1,
      items: {
        $ref: '#/definitions/id',
      },
    },
    resourceId: {
      description: 'The `_id` of the resource which received the change',
      $ref: '../../oada.schema.json#/definitions/_id',
    },
    change: {
      $ref: '../change.schema.json#',
    },
  },
};

export = schema;
