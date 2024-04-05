/**
 * @license
 * Copyright 2023 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { $ref, typescript } from '@oada/schemas/utils';

import type { JSONSchema8 as Schema } from 'jsonschema8';

import oadaSchema from '../../oada.schema.cjs';

/**
 * Wrapper around a `$ref` to the OADA non-reserved key definition
 */
const nonReserved$ref = $ref(
  oadaSchema,
  '/definitions/key/definitions/nonReserved',
);

const schema = {
  $id: 'https://formats.openag.io/oada/list/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'OADA "list"',
  title: 'List',
  definitions: {
    item: {
      title: 'List item',
      $ref: '../link/v1.schema.json',
    },
  },
  type: 'object',
  properties: {},
  allOf: [
    {
      $ref: '../resource.schema.json',
    },
    {
      description: 'listed items',
      type: 'object',
      ...typescript`{[key: ${nonReserved$ref}]: ListItem}`,
      patternProperties: {
        [nonReserved$ref.pattern]: {
          $ref: '#/definitions/item',
        },
      },
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
      _type: 'application/vnd.oada.list.1+json',
      asdxjkacsdj: {
        _id: 'resources/ajajkjfsdaf',
        _rev: 1,
      },
    },
  ],
} as const satisfies Schema;

export = schema;
