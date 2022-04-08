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
  $id: 'https://formats.openag.io/oada/irrigation/machines/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'application/vnd.oada.irrigation.machines.1+json',
  required: ['name', 'list'],
  additionalProperties: true,
  properties: {
    name: {
      type: 'string',
      pattern: 'irrigation',
    },
    list: {
      $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/list',
    },
  },
  examples: [
    {
      name: 'irrigation',
      list: {
        dummyrandomthing: {
          _id: 'dummyid123AFG',
          _rev: '1-dummy02ijfl',
        },
        klsdfj0982ifjoow: {
          _id: 'df002jfk2ojsl',
          _rev: '3-jkfd0ijs8zk',
        },
      },
    },
  ],
};

export default schema;
