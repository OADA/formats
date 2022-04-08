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
  $id: 'https://formats.openag.io/oada/change/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    type: {
      description: 'Indicates the type of change that occured.',
      enum: ['merge', 'delete'],
    },
  },
  type: 'object',
  description: 'Tree-based change representation (OADA v1)',
  required: ['type', 'body'],
  properties: {
    type: { $ref: '#/definitions/type' },
    body: {
      $comment: 'Should probably narrow this schema down',
      description: 'The contents of what was changed.',
    },
  },
  examples: [
    // OADA v1
    {
      body: {
        test: 'abc',
        _rev: 1,
      },
      type: 'merge',
    },
  ],
};

export default schema;
