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
  $id: 'https://formats.openag.io/oada/service/jobs.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'The format for @oada/jobs jobs list',
  title: 'OADA jobs list',
  allOf: [
    {
      $ref: '../list/v1.schema.json',
    },
  ],
  examples: [
    {
      _id: 'resources/123',
      _rev: 3,
      _meta: {
        _id: 'resources/123/_meta',
        _rev: 3,
      },
      _type: 'application/vnd.oada.service.jobs.1+json',
      asdxjkacsdj: {
        _id: 'resources/ajajkjfsdaf',
        _rev: 1,
      },
    },
  ],
} as const satisfies Schema;

export = schema;
