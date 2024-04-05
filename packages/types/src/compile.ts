/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { basename, dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { promises as fs } from 'node:fs';
import { setTimeout } from 'node:timers/promises';

import { $RefParser } from '@apidevtools/json-schema-ref-parser';

import _Ajv from 'ajv';

import _addFormats from 'ajv-formats';

import _standaloneCode from 'ajv/dist/standalone/index.js';
import addFormats2019 from 'ajv-formats-draft2019';
import clone from 'clone-deep';
import { compile } from 'json-schema-to-typescript';
import log from 'debug';
import { mkdirp } from 'mkdirp';
import { toSafeString } from 'json-schema-to-typescript/dist/src/utils.js';

import { loadSchema } from '@oada/formats/dist/ajv.js';

import { schemas } from '@oada/formats';

type Ajv = _Ajv.default;
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
const Ajv = _Ajv as unknown as typeof _Ajv.default;
const addFormats = _addFormats as unknown as typeof _addFormats.default;
const standaloneCode =
  _standaloneCode as unknown as typeof _standaloneCode.default;

const require = createRequire(import.meta.url);

const debug = log('@oada/types:compile:debug');
const error = log('@oada/types:compile:error');

// HACK: fix for ref-parser
$RefParser.dereference = $RefParser.dereference.bind($RefParser);
$RefParser.resolve = $RefParser.resolve.bind($RefParser);

const typescript: typeof String.raw = (
  raw: TemplateStringsArray,
  ...v: readonly string[]
) => String.raw({ raw }, ...v);

function example(
  [type = '']: TemplateStringsArray,
  v: unknown | readonly unknown[],
) {
  const vs: readonly unknown[] = Array.isArray(v) ? v : [v];
  const examples = vs.map(
    (ex) => `@example
\`\`\`${type}
${JSON.stringify(ex, undefined, 2)}
\`\`\`
`,
  );
  return examples.join('\n');
}

function indent([prefix]: TemplateStringsArray, v: unknown) {
  const raw = `\n${v}`.replaceAll('\n', `${prefix}`);
  return String.raw({ raw });
}

/**
 * Where to put compiled types
 */
const typesDirectory = resolve('./types');

const compileString = '`$ yarn build`';

// Create ajv for packing validation functions
const ajv = addFormats2019(
  addFormats(
    new Ajv({
      strict: false,
      async loadSchema(id) {
        debug(`Loading schema ${id}`);
        return clone(await loadSchema(id));
      },
      code: { source: true },
    }),
  ),
);

// Compile the schema files to TypeScript types
const metaSchema = await $RefParser.dereference(
  'https://json-schema.org/draft/2019-09/schema',
);
ajv.addMetaSchema(metaSchema);

let errored: Error | undefined;
const exports: Record<string, string> = {};
// Compile schemas to TS types
for await (const { key, path, schema } of schemas()) {
  debug({ path, schema }, `Loading ${key}`);
  // Normalize(schema)

  const { $id, title, description = '', examples = [] } = clone(schema);
  const file = key
    .replace(/^https:\/\/formats\.openag\.io/, '')
    .replace(/^\//, './');
  const outfile = join(typesDirectory, file.replace(/\.schema\.json$/, '.ts'));
  const name = basename(path, '.json');
  const typeName = toSafeString(title ?? name);

  // HACK: Add to exports?
  const exp = file.replace(/\.schema\.json$/, '.js');
  // eslint-disable-next-line import/no-commonjs
  exports[exp] = `./${join('dist', 'types', exp)}`;

  /**
   * @todo Automagically add `examples` to `description` for _all schemas
   */
  // eslint-disable-next-line sonarjs/no-nested-template-literals
  const desc = `${description}\n${example`json${examples}`}`;

  try {
    // Pack up validation function
    const validate =
      ajv.getSchema($id) ?? (await ajv.compileAsync(clone(schema)));
    const moduleCode = standaloneCode(ajv, validate);
    const packedfile = resolve(
      './dist/types/',
      file.replace(/\.schema\.json$/, '-validate.cjs'),
    );

    /**
     * Make the banner comment a bit more useful
     *
     * FIXME: Figure out some TS magic to use instead of this for code generation??
     */
    const bannerComment = typescript`
/* eslint-disable unicorn/no-abusive-eslint-disable, eslint-comments/no-unlimited-disable */
/* eslint-disable */
/* tslint:disable */
/**${indent`
 * ${desc}`}
 *
 * File automatically generated using json-schema-to-typescript.
 * ! DO NOT MODIFY IT BY HAND !
 * Instead, modify the source file ${key} of @oada/formats
 * and run ${compileString} to regenerate this file.
 *
 * @packageDocumentation
 */

import { AssertError } from '@oada/types';

// Import packed validation function
import validate from './${basename(packedfile)}'

/**
 * \`$id\` of the source schema
 * @see {@link ${$id}}
 */
export const $id = '${$id}'

/**
 * JSON Schema used to generate this type
 * @see {@link ${$id}}
 */
export const schema = ${JSON.stringify(schema)} as const;

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
    throw new AssertError(val, validate.errors!);
  }
}

/**${indent`
 * ${desc}`}
 */
export default ${typeName}`;

    debug('Compiling %s to TypeScript types', key);
    // This function mutates the input, so be sure to clone it first
    const ts = await compile(
      { title: typeName, ...clone(schema) } as Record<string, unknown>,
      $id!,
      {
        format: true,
        style: {
          singleQuote: true,
          quoteProps: 'consistent',
          proseWrap: 'always',
        },
        bannerComment,
        enableConstEnums: true,
        unknownAny: true,
        unreachableDefinitions: true,
        $refOptions: {
          parse: {
            json: false,
            object: {
              canParse({ data }) {
                return typeof data === 'object' && !Buffer.isBuffer(data);
              },
              async parse({ data }) {
                return data as unknown as Record<string, unknown>;
              },
            },
          },
          // Use local versions of openag schemas
          resolve: {
            // Load schemas through @oada/formats
            formats: {
              order: 1,
              canRead: true,
              async read({ url }: { url: string }) {
                debug(`Loading schema ${url}`);
                return clone(await loadSchema(url));
              },
            },
            file: false,
            http: false,
          },
        },
        // Resolve relative to current file?
        cwd: dirname(path),
      },
    );
    await Promise.all([mkdirp(dirname(outfile)), mkdirp(dirname(packedfile))]);
    // ???: Figure out wtf is up with mkdirp that I need this...
    await setTimeout(50);
    debug('Outputting %s', packedfile);
    await fs.writeFile(packedfile, moduleCode);
    debug('Outputting %s', outfile);
    await fs.writeFile(outfile, ts);
  } catch (cError: unknown) {
    error(cError, `Error compiling ${$id}`);
    errored ||= cError as Error;
  }
}

// HACK: Add exports to package.json
// eslint-disable-next-line import/no-commonjs
const packageJson = require('../../package.json') as Record<string, unknown>;
await fs.writeFile(
  './package.json',
  JSON.stringify(
    {
      ...packageJson,
      exports: {
        ...(packageJson.exports as Record<string, string>),
        ...exports,
      },
    },
    // eslint-disable-next-line unicorn/no-null
    null,
    2,
  ),
);

if (errored) {
  throw errored;
}
