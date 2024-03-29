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
  $id: 'https://formats.openag.io/oada/change.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Wrapper type for any version of an OADA change document.',
  oneOf: [
    { $ref: './change/v1.schema.json' },
    { $ref: './change/v2.schema.json' },
  ],
  examples: [
    // OADA v1
    {
      body: {
        test: 'abc',
        _rev: 1,
      },
      type: 'merge',
    },
    // OADA v2
    [
      {
        resource_id: 'resources/default:resources_bookmarks_123',
        path: '',
        body: {
          rocks: {
            _rev: 1,
          },
          _rev: 1,
        },
        type: 'merge',
      },
      {
        resource_id: 'resources/default:resources_rocks_123',
        path: '/rocks',
        body: {
          test: 'abc',
          _rev: 1,
        },
        type: 'merge',
      },
    ],
  ],
} as const satisfies Schema;

export = schema;
