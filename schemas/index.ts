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

export class SchemaInfo {
  constructor(key: string) {
    this.path = join(__dirname, key);
    this.key = key;
  }
  // Don't load schema until needed
  #schema?: Promise<Schema>;
  get schema(): Promise<Schema> {
    if (this.#schema === undefined) {
      const infile = this.key.replace(/^\//, './').replace(/\.json$/, '');
      this.#schema = import(infile).then(({ default: schema }) => schema);
    }
    return this.#schema;
  }
  key: string;
  path: string;
}

/**
 * Load all the schemas
 */
export default function* (): Generator<SchemaInfo, void, void> {
  for (const key of glob) {
    yield new SchemaInfo(key);
  }
}
