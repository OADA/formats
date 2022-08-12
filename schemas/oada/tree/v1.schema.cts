/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

// HACK to estimate regex `^[^_]` in TypeScript
const chars: string[] = [];
for (let c = 'a'; c <= 'z'; c = String.fromCharCode(c.charCodeAt(0) + 1)) {
  chars.push(c);
}

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/tree/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Tree',
  description: 'An object representation of an OADA "tree".',
  definitions: {
    letter: {
      description: 'A letter in the alphabet',
      enum: chars,
    },
    treeKey: {
      title: 'Tree key',
      type: 'string',
      pattern: '^[^_]',
      ...{
        tsType: "`${Letter | '*' | Uppercase<Letter>}${string}`",
      },
    },
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
      ...{
        tsType: `{ [key: TreeKey]: Tree; }`,
      },
      patternProperties: {
        '^[^_]': {
          $ref: '#',
        },
      },
    },
  ],
};

export = schema;
