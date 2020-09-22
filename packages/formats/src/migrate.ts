/// <reference types='./types'/>

import { cwd } from 'process';
import { promises as fs } from 'fs';
import { dirname, join } from 'path';

import mkdirp = require('mkdirp');

import {
  JSONSchema8 as Schema,
  JSONSchema8ObjectSchema,
  JSONSchema8StringSchema,
} from 'jsonschema8';

import { contentTypeToKey } from './ajv';

import { JSONSchema8 as RealSchema } from 'jsonschema8';
import * as Ajv from 'ajv';

import traverse from './traverse';

export namespace Old {
  // The IDs on the generated schemas are weird
  export type Schema = RealSchema & { id: string };
  export interface Model {
    validate: Ajv.ValidateFunction;
    schema: () => Promise<Schema>;
    examples: () => Promise<{ [key: string]: any }>;
  }
  export interface Formats extends Ajv.Ajv {
    mediatypes: { [key: string]: string };
    _addMediatypes(types: { [key: string]: string }): void;
    model: (type: string) => Promise<Model>;
  }
}

type MigrateOptions = {
  format?: 'json' | 'ts';
  outdir?: string;
  root?: string;
};
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
  function fixid(
    id: string | undefined,
    type: string | null
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

    const { value: key } = contentTypeToKey(type).next() as { value: string };
    const $id = root + key;

    return { $id, key };
  }

  for (const type in formats.mediatypes) {
    console.info(type);
    let model;
    try {
      model = await formats.model(type);
    } catch (err) {
      console.error(`Failed to load type ${type}: %O`, err);
      continue;
    }
    let schema;
    let $id;
    let key;
    try {
      // Peel off weird id
      const { id, ...oldSchema }: Old.Schema = await model.schema();

      // Generate proper id
      ({ $id, key } = fixid(id, type));
      schema = { $id, ...oldSchema };
    } catch (err) {
      console.error(`Failed to load schema for ${type}: %O`, err);
      continue;
    }

    function fixRef($ref: string): string {
      const [id, path] = $ref.split('#');
      const { $id } = id ? fixid(id, null) : { $id: '' };
      return `${$id}#${path}`;
    }

    // Traverse schema to fix/normalize keywords?
    traverse<Schema>(schema, {
      cb(schema: Schema) {
        // Fix any refs
        if (schema.$ref) {
          schema.$ref = fixRef(schema.$ref);
        }

        // Clean up types?
        if (!('type' in schema)) {
          if ('properties' in schema) {
            (schema as JSONSchema8ObjectSchema).type = 'object';
          }
        } else {
          if ('enum' in schema || 'const' in schema) {
            // Typing an enum is redundant
            // @ts-ignore
            delete schema.type;
          }
        }

        // Delete extra keywords
        // @ts-ignore
        delete schema.vocab;
        // @ts-ignore
        delete schema._type;
        // @ts-ignore
        delete schema.indexingSchema;
        // @ts-ignore
        delete schema.indexing;
        // @ts-ignore
        delete schema.propertySchema;
        // @ts-ignore
        delete schema.propertySchemaDefault;

        // TODO: Should probably just delete these keys...
        // * is not a regex... (.* is)
        if ((schema as JSONSchema8StringSchema).pattern === '*') {
          (schema as JSONSchema8StringSchema).pattern = '.*';
        }
        const prop = (schema as JSONSchema8ObjectSchema).patternProperties?.[
          '*'
        ];
        if (prop) {
          // @ts-ignore
          delete schema.patternProperties['*'];
          // @ts-ignore
          schema.patternProperties['.*'] = prop;
        }

        // Change "known" to examples
        // @ts-ignore
        if (schema.known) {
          // @ts-ignore
          schema.examples = schema.known;
          // @ts-ignore
          delete schema.known;
        }
      },
    });

    // Fetch the examples
    const oldExamples = await model.examples();
    const examples: any[] = [];
    for (const example in oldExamples) {
      examples.push(oldExamples[example]);
    }

    let output;
    let path = join(outdir, key);
    const json = JSON.stringify({ ...schema, examples }, null, 2);
    switch (format) {
      case 'json':
        // Create plain JSON schema
        output = json;
        break;
      case 'ts':
        // Create "TypeScript" schema
        output = `
          import { JSONSchema8 as Schema } from 'jsonschema8'

          const schema: Schema = ${json}
          export default schema
        `;
        path = path.replace(/\.json$/, '.ts');
        break;
    }

    // Write file out
    await mkdirp(dirname(path));
    await fs.writeFile(path, output);
  }
}
