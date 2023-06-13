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
  $id: 'https://formats.openag.io/oada/user/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'application/vnd.oada.user.1+json',
  additionalProperties: true,
  properties: {
    bookmarks: {
      $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned',
    },
  },
  examples: [
    {
      bookmarks: {
        _id: 'kdjsl028ifej',
        _rev: 2,
      },
      username: 'frank',
      name: 'Farmer Frank',
      family_name: 'Frank',
      given_name: 'Farmer',
      middle_name: '',
      nickname: 'Frankie',
      email: 'frank@openag.io',
    },
  ],
} as const satisfies Schema;

export = schema;
