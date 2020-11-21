import { join } from 'path';

import type { JSONSchema8 as Schema } from 'jsonschema8';
import * as _glob from 'glob';
import * as Bluebird from 'bluebird';

// Promisify glob?
const globP = Bluebird.promisify<string[], string, _glob.IOptions>(_glob);

/**
 * Every .schema.ts file we have
 */
export const glob = globP('/**/*.schema.{ts,js}', {
  cwd: __dirname,
  root: __dirname,
  nomount: true,
}).map((key) => key.replace(/\/+/, '/').replace(/\.(ts|js)$/, '.json'));

/**
 * Load all the schemas
 */
export default async function* (): AsyncGenerator<
  { schema: Schema; key: string; path: string; glob: string },
  void,
  void
> {
  for (const key of await glob) {
    const infile = key.replace(/^\//, './').replace(/\.json$/, '');
    const { default: schema } = await import(infile);
    const path = join(__dirname, key);

    yield { schema, key: schema.$id, path, glob: key };
  }
}
