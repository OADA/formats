/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/* eslint-disable unicorn/prefer-module */

import { join } from 'node:path';

import type { JSONSchema8 as Schema } from 'jsonschema8';
import { sync as _glob } from 'glob';

/**
 * Every .schema.ts file we have
 */
export const glob = _glob('/**/*.schema.{ts,js}', {
  cwd: __dirname,
  root: __dirname,
  nomount: true,
}).map((key) => key.replace(/\/+/, '/').replace(/\.(?:ts|js)$/, '.json'));

export class SchemaInfo {
  // Don't load schema until needed
  #schema?: Promise<Schema>;

  key: string;
  path: string;

  constructor(key: string) {
    this.path = join(__dirname, key);
    this.key = key;
  }

  get schema(): Promise<Schema> {
    if (this.#schema === undefined) {
      const inFile = this.key.replace(/^\//, './').replace(/\.json$/, '');
      // eslint-disable-next-line github/no-then
      this.#schema = import(inFile).then(
        ({ default: schema }) => schema as Schema
      );
    }

    return this.#schema;
  }
}

/**
 * Load all the schemas
 */
function* loadAllFormats(): Generator<SchemaInfo, void, void> {
  for (const key of glob) {
    yield new SchemaInfo(key);
  }
}

export default loadAllFormats;
