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
  $id: 'https://formats.openag.io/oada/clients/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'application/vnd.oada.clients.1+json',
  additionalProperties: true,
  required: ['name', 'list'],
  properties: {
    name: {
      type: 'string',
      pattern: 'clients',
    },
    list: {
      $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/list',
    },
  },
  examples: [
    {
      name: 'clients',
      list: {
        '0jfl290ijfklwsdf': {
          _id: '321cba',
          _rev: '90-k2983wfhjdsdf',
        },
        'kl9ojksfh92hkwef': {
          _id: '389dfj',
          _rev: '2-kdfj29eflwdfsd',
        },
      },
    },
  ],
};

export = schema;
