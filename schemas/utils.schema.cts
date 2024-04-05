/**
 * @license
 * Copyright 2023 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { typescript } from '@oada/schemas/utils';

import type { JSONSchema8 as Schema } from 'jsonschema8';

// HACK to estimate regex `^[^_]` in TypeScript
const chars: string[] = [];
for (let c = 'a'; c <= 'z'; c = String.fromCodePoint(c.codePointAt(0)! + 1)) {
  chars.push(c);
}

for (let c = 'A'; c <= 'Z'; c = String.fromCodePoint(c.codePointAt(0)! + 1)) {
  chars.push(c);
}

for (let c = '0'; c <= '9'; c = String.fromCodePoint(c.codePointAt(0)! + 1)) {
  chars.push(c);
}

const schema = {
  $id: 'https://formats.openag.io/utils.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Utility schema types',
  definitions: {
    anyOtherString: {
      title: 'Any other string',
      description:
        'Workaround to make TypeScript autocomplete better for string enums',
      ...typescript`string & Record<never, never>`,
      type: 'string',
      // @ts-expect-error this is actually valid JSON Schema
      additionalProperties: false,
    },
    alphanumeric: {
      description: 'A single alphanumeric character',
      pattern: '^\\w$',
      enum: chars,
    },
  },
} as const satisfies Schema;

export = schema;
