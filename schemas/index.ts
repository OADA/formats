import { join } from 'path';

import type { JSONSchema8 as Schema } from 'jsonschema8';
import { sync as _glob } from 'glob';

/**
 * Every .schema.ts file we have
 */
export const glob = _glob('/**/*.schema.{ts,js}', {
  cwd: __dirname,
  root: __dirname,
  nomount: true,
}).map((key) => key.replace(/\/+/, '/').replace(/\.(ts|js)$/, '.json'));

export interface SchemaInfo {
  schema: Promise<Schema>;
  key: string;
  path: string;
  glob: string;
}

function loadSchema(key: string): SchemaInfo {
  const infile = key.replace(/^\//, './').replace(/\.json$/, '');
  const schema = import(infile).then(({ default: schema }) => schema);
  const path = join(__dirname, key);

  return { schema, key, path, glob: key };
}

/**
 * Load all the schemas
 */
export default function* (): Generator<SchemaInfo, void, void> {
  for (const key of glob) {
    yield loadSchema(key);
  }
}
