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
  $id: 'https://formats.openag.io/oada/service/queues.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'The format for @oada/jobs queues list',
  type: 'object',
  additionalProperties: {
    $ref: './queue.schema.json',
  },
  examples: [
    {
      asdxjkacsdj: {
        domain: 'https://dev.trellis.one',
        token: 'abc1234321cba',
        path: '/bookmarks/services/MyCoolService',
      },
    },
  ],
} as const satisfies Schema;

export = schema;
