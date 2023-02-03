/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/* eslint-disable no-console, security/detect-non-literal-fs-filename */

import { dirname, join } from 'node:path';
import { cwd } from 'node:process';
import fs from 'node:fs/promises';

import type {
  JSONSchema8ObjectSchema,
  JSONSchema8StringSchema,
  JSONSchema8 as RealSchema,
  JSONSchema8 as Schema,
} from 'jsonschema8';
import type { default as Ajv } from 'ajv';
import { mkdirp } from 'mkdirp';

import { contentTypeToKey } from './ajv.js';

import traverse from './traverse.js';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Old {
  // The IDs on the generated schemas are weird
  // eslint-disable-next-line @typescript-eslint/no-shadow
  export type Schema = RealSchema & { id: string };
  export interface Model {
    validate: Ajv['validate'];
    schema: () => Promise<Schema>;
    examples: () => Promise<Record<string, unknown>>;
  }
  export interface Formats extends Ajv {
    mediatypes: Record<string, string>;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _addMediatypes(types: Record<string, string>): void;
    model(type: string): Promise<Model>;
  }
}

interface MigrateOptions {
  format?: 'json' | 'ts';
  outdir?: string;
  root?: string;
}
const defaultRoot = 'https://formats.openag.io';
/**
 * Function to dump all the schemas out of an old oada-formats
 */
export async function migrate(
  formats: Old.Formats,
  {
    format = 'json',
    outdir = `${cwd()}/schemas`,
    root = defaultRoot,
  }: MigrateOptions = {}
) {
  const r = /^oada-formats:\/\/(.+)$/;
  function fixID(
    id: string | undefined,
    type?: string
  ): { $id: Schema['$id']; key: string } {
    if (id) {
      // Parse id into content type
      const matches = r.exec(id);
      if (matches) {
        [, type] = matches;
      }
    }

    if (!type) {
      throw new Error('Schema has neither id nor type');
    }

    const key = contentTypeToKey(type);
    if (!key) {
      throw new Error('Failed to find schema key for type');
    }

    const $id = root + key;

    return { $id, key };
  }

  function fixReference($reference: string): string {
    const [id, path] = $reference.split('#');
    const { $id } = id ? fixID(id) : { $id: '' };
    return `${$id}#${path}`;
  }

  for await (const type of Object.values(formats.mediatypes)) {
    console.info(type);
    let model;
    try {
      model = await formats.model(type);
    } catch (error: unknown) {
      console.error(`Failed to load type ${type}: %O`, error);
      continue;
    }

    let schema;
    let $id;
    let key;
    try {
      // Peel off weird id
      const { id, ...oldSchema }: Old.Schema = await model.schema();

      // Generate proper id
      ({ $id, key } = fixID(id, type));
      schema = { $id, ...oldSchema };
    } catch (error: unknown) {
      console.error(`Failed to load schema for ${type}: %O`, error);
      continue;
    }

    // Traverse schema to fix/normalize keywords?
    traverse<Schema>(schema, {
      cb(s: Schema) {
        // Fix any refs
        if (s.$ref) {
          s.$ref = fixReference(s.$ref);
        }

        // Clean up types?
        if (!('type' in s)) {
          if ('properties' in s) {
            (s as JSONSchema8ObjectSchema).type = 'object';
          }
        } else if ('enum' in s || 'const' in s) {
          // Typing an enum is redundant
          // @ts-expect-error delete
          delete s.type;
        }

        // Delete extra keywords
        // @ts-expect-error delete
        delete s.vocab;
        // @ts-expect-error delete
        delete s._type;
        // @ts-expect-error delete
        delete s.indexingSchema;
        // @ts-expect-error delete
        delete s.indexing;
        // @ts-expect-error delete
        delete s.propertySchema;
        // @ts-expect-error delete
        delete s.propertySchemaDefault;

        // FIXME: Should probably just delete these keys...
        // * is not a regex... (.* is)
        if ((s as JSONSchema8StringSchema).pattern === '*') {
          (s as JSONSchema8StringSchema).pattern = '.*';
        }

        const property = (s as JSONSchema8ObjectSchema).patternProperties?.[
          '*'
        ];
        if (property) {
          // @ts-expect-error delete
          delete s.patternProperties['*'];
          // @ts-expect-error whatever
          s.patternProperties['.*'] = property;
        }

        // Change "known" to examples
        // @ts-expect-error known
        if (s.known) {
          // @ts-expect-error known
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          s.examples = s.known;
          // @ts-expect-error delete
          delete s.known;
        }
      },
    });

    // Fetch the examples
    const oldExamples = await model.examples();
    const examples: unknown[] = [];
    for (const example of Object.values(oldExamples)) {
      examples.push(example);
    }

    let output;
    let path = join(outdir, key);
    const json = JSON.stringify({ ...schema, examples }, null, 2);
    switch (format) {
      case 'json': {
        // Create plain JSON schema
        output = json;
        break;
      }

      case 'ts': {
        // Create "TypeScript" schema
        output = `
          import { JSONSchema8 as Schema } from 'jsonschema8'

          const schema: Schema = ${json}
          export default schema
        `;
        path = path.replace(/\.json$/, '.ts');
        break;
      }

      default: {
        throw new Error(`Unknown format ${format}`);
      }
    }

    // Write file out
    await mkdirp(dirname(path));
    await fs.writeFile(path, output);
  }
}
