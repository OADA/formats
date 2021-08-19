import { promises as fs } from 'fs';
import { resolve, join, basename, dirname } from 'path';

import Bluebird from 'bluebird';
import mkdirp = require('mkdirp');
import { compileFromFile } from 'json-schema-to-typescript';
import { dereference } from '@apidevtools/json-schema-ref-parser';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addFormats2019 from 'ajv-formats-draft2019';
import standaloneCode from 'ajv/dist/standalone';

import { loadSchema } from '@oada/formats/lib/ajv';

import loadFormats, { schemas } from '@oada/formats';

import { rules } from './normalize';

// Where to put compiled types
const typesDir = resolve('./');

const compileStr = '`$ yarn build`';

// Create ajv for packing validation functions
const ajv = addFormats2019(
  addFormats(new Ajv({ strict: false, loadSchema, code: { source: true } }))
);

// Compile the schema files to TypeScript types
async function doCompile() {
  const metaSchema = await dereference(
    'https://json-schema.org/draft/2019-09/schema'
  );
  ajv.addMetaSchema(metaSchema);

  const formats = await loadFormats();

  // Compile schemas to TS types
  for (const { key, path, schema: _schema } of schemas()) {
    //normalize(schema)
    const schema = await _schema;

    const { $id } = schema;
    const file = key
      .replace(/^https:\/\/formats\.openag\.io/, '')
      .replace(/^\//, './');
    const outfile = join(typesDir, file.replace(/\.schema\.json$/, '.ts'));
    const name = basename(path, '.schema.json');
    const cwd = join(typesDir, dirname(path));
    const typeName = `${name[0].toUpperCase()}${name.substr(1)}`;

    // Pack up validation function
    const validate = await ajv.compileAsync(schema);
    const moduleCode = standaloneCode(ajv, validate);
    const packedfile = join(
      typesDir,
      file.replace(/\.schema\.json$/, '-validate.js')
    );

    // Make the banner comment a bit more informative
    // TODO: Figure out some TS magic to use instead of this code generation??
    const bannerComment = `
        /* tslint:disable */
        /**
         * File was automatically generated using json-schema-to-typescript.
         * DO NOT MODIFY IT BY HAND.
         * Instead, modify the source file ${key} of @oada/formats
         * and run ${compileStr} to regenerate this file.
         */

        // Import packed validation function
        import validate from './${name}-validate.js'

        /**
         * $id of the source schema
         * @see {@link ${$id}}
         */
        export const $id = '${$id}'

        /**
         * Returns true if val is a @type ${typeName}, false otherwise
         */
        export function is (val: unknown): val is ${typeName} {
          return validate(val) as boolean
        }

        /**
         * Asserts that val is a @type ${typeName}
         */
        export function assert (val: unknown): asserts val is ${typeName} {
          if (!validate(val) as boolean) {
            throw {
              errors: validate.errors,
              input: val
            }
          }
        }

        // Augment module interface?
        //declare module '@oada/formats' {
        //  /**
        //   * @todo Figure out how do type overrides for getSchema
        //   */
        //  interface OADAFormats {
        //    validate(ref: '${$id}' | '${key}', data: any): data is ${typeName}
        //  }
        //}

        export default ${typeName}
      `;

    console.debug(`Compiling ${key} to TypeScript types`);
    try {
      const ts = await compileFromFile(path, {
        bannerComment,
        unreachableDefinitions: true,
        normalizerRules: rules,
        $refOptions: {
          // Use local versions of openag schemas
          resolve: {
            file: {
              order: 0,
            },
            oada: {
              order: 1,
              canRead: /^https:\/\/formats\.openag\.io/,
              async read({ url }: { url: string }) {
                return formats.getSchema(url)?.schema;
              },
            },
            http: {
              order: 2,
            },
          },
        },
        cwd,
      });
      await mkdirp(dirname(outfile));
      // TODO: Figure out wtf is up with mkdirp that I need this...
      await Bluebird.delay(50);
      console.debug(`Outputting ${packedfile}`);
      await fs.writeFile(packedfile, moduleCode);
      console.debug(`Outputting ${outfile}`);
      await fs.writeFile(outfile, ts);
    } catch (err) {
      console.error(`Error compiling ${key}: %O`, err);
    }
  }
}

doCompile();
