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

const schemas = await globP('/**/*.schema.{ts,js}', {
  cwd: dirname,
  root: dirname,
  nomount: true,
});

/**
 * Every .schema.ts file we have
 */
export const glob = schemas.map((key) =>
  key.replace(/\/+/, '/').replace(/\.(?:ts|js)$/, '.json')
);

export interface SchemaInfo {
  schema: Schema;
  key: string;
  path: string;
  glob: string;
}

export const requireSchema: (path: string) => Schema = createRequire(
  path.join(dirname, 'schemas')
);

function loadSchemaInfo(key: string): SchemaInfo {
  const inFile = key.replace(/^\//, './').replace(/\.json$/, '');
  const schema = requireSchema(inFile);
  const schemaPath = path.join(dirname, key);

  return { schema, key, path: schemaPath, glob: key };
}

/**
 * Load all the schemas
 */
function* loadAll(): Generator<SchemaInfo, void, void> {
  for (const key of glob) {
    yield loadSchemaInfo(key);
  }
}

export default loadAll;
