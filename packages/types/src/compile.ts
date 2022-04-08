/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/* eslint-disable security/detect-non-literal-fs-filename */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="./types"/>

import { basename, dirname, join, resolve } from 'node:path';
import { promises as fs } from 'node:fs';
import { setTimeout } from 'node:timers';
import util from 'node:util';

import $RefParser from '@apidevtools/json-schema-ref-parser';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addFormats2019 from 'ajv-formats-draft2019';
import clone from 'clone-deep';
import { compile } from 'json-schema-to-typescript';
import log from 'debug';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import mkdirp = require('mkdirp');
import standaloneCode from 'ajv/dist/standalone';
import { toSafeString } from 'json-schema-to-typescript/dist/src/utils.js';

import { loadSchema } from '@oada/formats/dist/ajv';

import { schemas } from '@oada/formats';

const debug = log('@oada/types:compile:debug');
const error = log('@oada/types:compile:error');

// Hacky fix for ref-parser
$RefParser.dereference = $RefParser.dereference.bind($RefParser);
$RefParser.resolve = $RefParser.resolve.bind($RefParser);

/**
 * Where to put compiled types
 */
const typesDirectory = resolve('./src');

const compileString = '`$ yarn build`';

// Create ajv for packing validation functions
const ajv = addFormats2019(
  addFormats(new Ajv({ strict: false, loadSchema, code: { source: true } }))
);

const delay = util.promisify((done) => setTimeout(done, 50));

// Compile the schema files to TypeScript types
async function doCompile() {
  const metaSchema = await $RefParser.dereference(
    'https://json-schema.org/draft/2019-09/schema'
  );
  ajv.addMetaSchema(metaSchema);

  // Compile schemas to TS types
  for await (const { key, path, schema: _schema } of schemas()) {
    debug('Loading %s', key);

    // Normalize(schema)
    const schema = await _schema;

    const { $id, title } = schema;
    const file = key
      .replace(/^https:\/\/formats\.openag\.io/, '')
      .replace(/^\//, './');
    const outfile = join(
      typesDirectory,
      file.replace(/\.schema\.json$/, '.ts')
    );
    const name = basename(path, '.json');
    const typeName = toSafeString(title ?? name);

    // Pack up validation function
    const validate = await ajv.compileAsync(schema);
    const moduleCode = standaloneCode(ajv, validate);
    const packedfile = join(
      typesDirectory,
      file.replace(/\.schema\.json$/, '-validate.js')
    );

    /**
     * Make the banner comment a bit more useful?
     *
     * FIXME: Figure out some TS magic to use instead of this for code generation??
     */
    const bannerComment = `/* eslint-disable unicorn/no-abusive-eslint-disable, eslint-comments/no-unlimited-disable */
/* eslint-disable */
/* tslint:disable */
/**
 * File automatically generated using json-schema-to-typescript.
 * ! DO NOT MODIFY IT BY HAND !
 * Instead, modify the source file ${key} of @oada/formats
 * and run ${compileString} to regenerate this file.
 * @packageDocumentation
 */

// Import packed validation function
import validate from './${name}-validate.js'

/**
 * \`$id\` of the source schema
 * @see {@link ${$id}}
 */
export const $id = '${$id}'

/**
 * Returns true if \`val\` is a @type \`${typeName}\`, false otherwise
 */
export function is (val: unknown): val is ${typeName} {
  return validate(val) as boolean
}

/**
 * Asserts that \`val\` is a @type \`${typeName}\`
 */
export function assert (val: unknown): asserts val is ${typeName} {
  if (!validate(val) as boolean) {
    throw {
      errors: validate.errors,
      input: val
    }
  }
}

export default ${typeName}`;

    debug('Compiling %s to TypeScript types', key);
    try {
      // This function mutates the input, so be sure to clone it first
      const ts = await compile(clone(schema) as Record<string, unknown>, $id!, {
        format: false,
        bannerComment,
        unreachableDefinitions: true,
        // NormalizerRules: rules,
        $refOptions: {
          // Use local versions of openag schemas
          resolve: {
            // Load schemas through @oada/formats
            formats: {
              order: 1,
              canRead: true,
              async read({ url }: { url: string }) {
                return loadSchema(url);
              },
            },
          },
        },
        // Resolve relative to current file?
        cwd: dirname(path),
      });
      await mkdirp(dirname(outfile));
      // TODO: Figure out wtf is up with mkdirp that I need this...
      await delay();
      debug('Outputting %s', packedfile);
      await fs.writeFile(packedfile, moduleCode);
      debug('Outputting %s', outfile);
      await fs.writeFile(outfile, ts);
    } catch (cError: unknown) {
      error(cError, `Error compiling ${$id}`);
    }
  }
}

void doCompile();
