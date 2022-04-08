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
  $id: 'https://formats.openag.io/oada/service.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'The format for the collection of @oada/jobs items.',
  type: 'object',
  properties: {
    jobs: {
      $ref: '../oada.schema.json#/definitions/link/definitions/unversioned',
    },
    watches: {
      $ref: '../oada.schema.json#/definitions/link/definitions/unversioned',
    },
  },
  examples: [
    {
      jobs: {
        _id: 'resources/KXxjds93',
      },
      watches: {
        _id: 'resources/glakceo3r',
      },
    },
  ],
};

export default schema;
