/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { createRequire } from 'node:module';
import path from 'node:path';
import url from 'node:url';

import type { JSONSchema8 as Schema } from 'jsonschema8';
import globP from 'glob-promise';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

const schemas = await globP('/**/*.schema.{c,m,}js', {
  cwd: dirname,
  root: dirname,
  nomount: true,
});
/**
 * Every .schema.ts file we have
 */
export const glob = schemas.map((key) =>
  key.replace(/\/+/, '/').replace(/\.[cm]?[jt]s$/, '.json')
);

export const requireSchema: (path: string) => Schema = createRequire(
  path.join(dirname, 'schemas')
);
export class SchemaInfo {
  key;
  path;
  readonly schema;

  constructor(key: string) {
    this.path = path.join(dirname, key);
    this.key = key;
    const inFile = this.key.replace(/^\//, './').replace(/\.json$/, '.cjs');
    this.schema = requireSchema(inFile);
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
