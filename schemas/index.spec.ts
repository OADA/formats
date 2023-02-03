/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import test from 'ava';

import { dirname, isAbsolute, join, relative } from 'node:path';

import { $RefParser } from '@apidevtools/json-schema-ref-parser';
import { default as Ajv } from 'ajv';
import type { JSONSchema6 } from 'json-schema';
import type { JSONSchema8 as Schema } from 'jsonschema8';

import schemas, { requireSchema } from './index.js';

/**
 * @todo where should this live?
 */
export function loadSchema(uri: string) {
  const r = /^https:\/\/formats\.openag\.io/i;

  if (r.test(uri)) {
    // Use local version of openag schemas
    const file = uri.replace(r, '.').replace(/\.json$/, '');
    return requireSchema(file);
  }

  throw new Error(`Unknown schema URI: ${uri}`);
  /*
    // Try to fetch schema online
    const { data: schema } = await axios.get<Schema>(uri);
    return schema;
     */
}

const ajv = new Ajv({
  async loadSchema(uri) {
    return loadSchema(uri);
  },
  /* ProcessCode, */
  inlineRefs: false,
  allErrors: true,
  strict: false,
  // AJV complains about standard formats if this is on
  validateFormats: false,
});
test.before('Initialize JSON Schema validator', async () => {
  const meta = await $RefParser.dereference(
    'https://json-schema.org/draft/2019-09/schema'
  );

  // ???: Why does compileAsync not work for meta schema?
  ajv.addMetaSchema(meta);
});

// TODO: Figure out less hacky way to make it find the files correctly
let checkReferences: (key: string, schema: Schema) => Promise<unknown>;
test.before('Initialize $ref checker', () => {
  checkReferences = async (key: string, schema: Schema) => {
    const $refparser = new $RefParser();
    return $refparser.dereference(schema as JSONSchema6, {
      resolve: {
        file: {
          order: 0,
          canRead: true,
          // TODO: Support external $ref
          async read({ url }: { url: string }) {
            const r = /^https:\/\/formats\.openag\.io/;
            const directory = './';
            const path = url.startsWith('https://formats.openag.io')
              ? url.replace(r, '')
              : relative('', url);
            const file = `./${(isAbsolute(path)
              ? join(directory, path)
              : join(directory, dirname(key), path)
            ).replace(/\.json$/, '.cjs')}`;
            return requireSchema(file);
          },
        },
      },
    });
  };
});

// TODO: Can you make these parallel in ava?
for (const { schema, key } of schemas()) {
  test.before(`Compile schema ${key}`, async () => {
    try {
      await ajv.compileAsync(schema);
    } catch {
      // Already compiled?
    }
  });

  test(`${key} should be valid JSON Schema`, (t) => {
    t.assert(ajv.validateSchema(schema));
  });

  // $id needs to be consistent with file structure or most tools get upset
  test(`${key} should have consistent $id`, (t) => {
    const { $id } = schema;
    t.is($id, `https://${join('formats.openag.io/', key)}`);
  });

  test.todo(`${key} should have valid self $ref's`);

  // eslint-disable-next-line @typescript-eslint/no-loop-func
  test(`${key} should have valid external $ref's`, async (t) => {
    await t.notThrowsAsync(checkReferences(key, schema));
  });

  test(`${key} should have valid default`, (t) => {
    // eslint-disable-next-line unicorn/prevent-abbreviations
    const { default: def } = schema;
    t.plan(def ? 1 : 0);
    if (def) {
      // eslint-disable-next-line ava/assertion-arguments
      t.assert(ajv.validate(schema, def), ajv.errorsText());
    }
  });

  test(`${key} should validate examples`, (t) => {
    const { examples = [] } = schema;
    t.plan(examples?.length ?? 0);
    for (const example of examples) {
      // eslint-disable-next-line ava/assertion-arguments
      t.assert(ajv.validate(schema, example), ajv.errorsText());
    }
  });
}
