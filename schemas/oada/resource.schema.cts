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
  $id: 'https://formats.openag.io/oada/resource.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['_id', '_rev', '_meta', '_type'],
  title: 'OADA Resource',
  properties: {
    _id: {
      $ref: '../oada.schema.json#/definitions/_id',
    },
    _rev: {
      $ref: '../oada.schema.json#/definitions/_rev',
    },
    _meta: {
      $ref: '../oada.schema.json#/definitions/link/definitions/versioned',
    },
    _type: {
      $ref: '../oada.schema.json#/definitions/_type',
    },
  },
} as const satisfies Schema;

export = schema;
