import test from 'ava';

import { relative, isAbsolute, dirname, join } from 'path';

import type { JSONSchema8 as Schema } from 'jsonschema8';
import type { JSONSchema6 } from 'json-schema';
import Ajv from 'ajv';
import $RefParser from '@apidevtools/json-schema-ref-parser';

import schemas from './';

/**
 * @todo where should this live?
 */
export async function loadSchema(uri: string) {
  const r = /^https:\/\/formats\.openag\.io/i;

  if (uri.match(r)) {
    // Use local verison of openag schemas
    const file = uri.replace(r, '.').replace(/\.json$/, '');
    const { default: schema } = await import(file);
    return schema;
  } else {
    /*
    // Try to fetch schema online
    const { data: schema } = await axios.get<Schema>(uri);
    return schema;
     */
  }
}

const ajv = new Ajv({
  loadSchema,
  /* processCode, */
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

  // TODO: Why does compileAsync not work for meta schema?
  ajv.addMetaSchema(meta);
});

// TODO: Figure out less hacky way to make it find the files correctly
let checkRefs: (key: string, schema: Schema) => Promise<any>;
test.before('Initiallize $ref checker', () => {
  checkRefs = (key: string, schema: Schema) => {
    const $refparser = new $RefParser();
    return $refparser.dereference(schema as JSONSchema6, {
      resolve: {
        file: {
          order: 0,
          canRead: true,
          // TODO: Support external $ref
          async read({ url }) {
            const r = /^https:\/\/formats\.openag\.io/;
            const dir = '.';
            const path = r.test(url) ? url.replace(r, '') : relative('', url);
            const file = (
              isAbsolute(path) ? join(dir, path) : join(dir, dirname(key), path)
            ).replace(/\.json$/, '');
            const { default: schema } = await import('./' + file);
            return schema;
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
      await ajv.compileAsync(await schema);
    } catch (err) {
      // Already compiled?
    }
  });

  test(`${key} should be valid JSON Schema`, async (t) => {
    t.assert(ajv.validateSchema(await schema));
  });

  // $id needs to be consistent with file structure or most tools get upset
  test(`${key} should have conistent $id`, async (t) => {
    const { $id } = await schema;
    t.is($id, `https://${join('formats.openag.io/', key)}`);
  });

  test.todo(`${key} should have valid self $ref's`);

  test(`${key} should have valid external $ref's`, async (t) => {
    await t.notThrowsAsync(checkRefs(key, await schema));
  });

  test(`${key} should have valid default`, async (t) => {
    const { default: def } = await schema;
    t.plan(def ? 1 : 0);
    if (def) {
      t.assert(ajv.validate(await schema, def), ajv.errorsText());
    }
  });

  test(`${key} should validate examples`, async (t) => {
    const { examples } = await schema;
    t.plan(examples?.length ?? 0);
    for (const i in examples ?? []) {
      const example = examples![i];
      t.assert(ajv.validate(await schema, example), ajv.errorsText());
    }
  });
}
