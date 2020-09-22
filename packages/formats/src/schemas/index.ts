import { join } from 'path';

import { JSONSchema8 as Schema } from 'jsonschema8';
import { sync as _glob } from 'glob';

// Use every .schema.ts file we have
export const glob = _glob('/**/*.schema.{ts,js}', {
  cwd: __dirname,
  root: __dirname,
  nomount: true,
}).map((key) => key.replace(/\/+/, '/').replace(/\.(ts|js)$/, '.json'));

// Find all the schemas
export default function* (): Generator<
  { schema: Schema; key: string; path: string; glob: string },
  void,
  void
> {
  for (const key of glob) {
    const infile = key.replace(/^\//, './').replace(/\.json$/, '');
    const { default: schema } = require(infile);
    const path = join(__dirname, key);

    yield { schema, key: schema.$id, path, glob: key };
  }
}
