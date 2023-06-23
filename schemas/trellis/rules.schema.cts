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
  $id: 'https://formats.openag.io/trellis/rules.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Endpoint for rules engine stuff',
  allOf: [{ $ref: '../oada/resource.schema.json' }],
  properties: {
    actions: {},
    conditions: {},
    configured: {},
    compiled: {},
  },
} as const satisfies Schema;

export = schema;
