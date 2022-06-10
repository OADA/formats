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
  $id: 'https://formats.openag.io/oada/bookmarks.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'bookmarks is the top-level document returned by the OADA API',
  definitions: {
    v1: {
      type: 'object',
      properties: {
        _type: {
          enum: ['application/vnd.oada.bookmarks.1+.json'],
        },
      },
    },
  },
  allOf: [
    {
      $ref: 'resource.schema.json#',
    },
    {
      anyOf: [
        {
          $ref: '#/definitions/v1',
        },
        {
          type: 'object',
          properties: {
            _type: {
              type: 'string',
              pattern: 'application/vnd\\.oada\\.bookmarks\\.[0-9]+\\+\\.json',
            },
          },
        },
      ],
    },
  ],
};

export = schema;
