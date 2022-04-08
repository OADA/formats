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
  $id: 'https://formats.openag.io/oada/irrigation/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'application/vnd.oada.irrigation.1+json',
  additionalProperties: true,
  properties: {
    machines: {
      $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned',
    },
  },
  examples: [
    {
      machines: {
        _id: 'dummyid123AFG',
        _rev: 12,
      },
    },
  ],
};

export default schema;
