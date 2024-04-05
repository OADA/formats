/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
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

const treeKey = {
  title: 'Tree key',
  pattern: '^[^_]',
  oneOf: [{ const: '*' }, { ...nonReserved$ref }],
} as const satisfies Schema;

const schema = {
  $id: 'https://formats.openag.io/oada/tree/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Tree',
  description: 'An object representation of an OADA "tree".',
  definitions: {
    treeKey,
  },
  type: 'object',
  properties: {
    _type: {
      $ref: '../../oada.schema.json#/definitions/_type',
    },
    _rev: {
      $ref: '../../oada.schema.json#/definitions/_rev',
    },
  },
  allOf: [
    {
      description: 'sub trees',
      type: 'object',
      ...typescript`{ [key in '*' | ${nonReserved$ref}]: Tree; }`,
      patternProperties: {
        [$ref(treeKey).pattern]: {
          $ref: '#',
        },
      },
    },
  ],
} as const satisfies Schema;

export = schema;
