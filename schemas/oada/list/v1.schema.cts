/**
 * @license
 * Copyright 2023 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

// HACK to estimate regex `^[^_]` in TypeScript
const chars: string[] = [];
for (let c = 'a'; c <= 'z'; c = String.fromCodePoint(c.codePointAt(0)! + 1)) {
  chars.push(c);
}

const letter = `"${chars.join('"|"')}"`;

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/list/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'OADA "list"',
  title: 'List',
  definitions: {
    letter: {
      description: 'A letter in the alphabet',
      enum: chars,
    },
    nonOadaKey: {
      title: 'non OADA key',
      description: 'keys that are not OADA reserved keys',
      type: 'string',
      pattern: '^[^_]',
      // eslint-disable-next-line unicorn/no-useless-spread
      ...{
        tsType: `\`\${${letter} | number | Uppercase<${letter}>}\${string}\``,
      },
    },
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
      description: 'listed jobs',
      type: 'object',
      // eslint-disable-next-line unicorn/no-useless-spread
      ...{
        tsType: `{ [key: NonOADAKey]: ListItem }`,
      },
      patternProperties: {
        '^[^_]': {
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
};

export = schema;
