///<reference types='./types'/>

import test from 'ava';

import { relative, isAbsolute, dirname, join } from 'path';

/*
import { js_beautify as beautify } from 'js-beautify'
import { createInstrumenter } from 'istanbul-lib-instrument'
import { createCoverageMap } from 'istanbul-lib-coverage'
import { createContext } from 'istanbul-lib-report'
import { create as createReport } from 'istanbul-reports'
 */

import { JSONSchema8 as Schema } from 'jsonschema8';
import * as Ajv from 'ajv';
import * as $RefParser from '@apidevtools/json-schema-ref-parser';

import schemas from './schemas';
import { loadSchema } from './ajv';
import { JSONSchema6 } from 'json-schema';

/*
const instrumenter = createInstrumenter()
function processCode (code: string, { $id }: Schema = {}): string {
  // Instrument schema validation code for coverage
  return instrumenter.instrumentSync(beautify(code), $id as string)
}
 */
const ajv = new Ajv({
  loadSchema,
  /* processCode, */
  inlineRefs: false,
  allErrors: true,
});
test.before('Initialize JSON Schema validator', async () => {
  const meta = await $RefParser.dereference(
    'https://json-schema.org/draft/2019-09/schema'
  );

  // TODO: Why does compileAsync not work for meta schema?
  ajv.addMetaSchema(meta);
});
/*
test.after('Report ajv instrumenter coverage', () => {
  // @ts-ignore
  const coverage = createCoverageMap(global.__coverage__)
  const context = createContext({
    dir: '.coverage',
    coverageMap: coverage
  })
  const report = createReport('json', { file: 'coverage-schemas.json' })
  // @ts-ignore
  report.execute(context)
})
 */

// TODO: Figure out less hacky way to make it find the files correctly
let checkRefs: (key: string, schema: Schema) => Promise<any>;
test.before('Initiallize $ref checker', () => {
  const $refparser = new $RefParser();
  checkRefs = (key: string, schema: Schema) =>
    $refparser.dereference(schema as JSONSchema6, {
      resolve: {
        file: {
          order: 0,
          canRead: true,
          // TODO: Support external $ref
          async read({ url }) {
            const r = /^https:\/\/formats\.openag\.io/;
            const dir = '../src/schemas';
            const path = r.test(url) ? url.replace(r, '') : relative('', url);
            const file = (isAbsolute(path)
              ? join(dir, path)
              : join(dir, dirname(key), path)
            ).replace(/\.json$/, '');
            const { default: schema } = await import(file);
            return schema;
          },
        },
      },
    });
});

// TODO: Make these parallel in ava?
for (const { schema, key, glob } of schemas()) {
  const { $id } = schema as { $id: string };
  test.before(`Compile schema ${key}`, async () => {
    try {
      await ajv.compileAsync(schema);
    } catch (err) {
      // Already compiled
    }
  });

  test(`${key} should be valid JSON Schema`, (t) => {
    t.assert(ajv.validateSchema(schema));
  });

  // $id needs to be consistent with file structure
  // or most tools get upset
  test(`${key} should have conistent $id`, (t) => {
    t.is($id, `https://${join('formats.openag.io/', glob)}`);
  });

  test.todo(`${key} should have valid self $ref's`);

  test(`${key} should have valid external $ref's`, async (t) => {
    await t.notThrowsAsync(checkRefs(glob, schema));
  });

  if (schema.default) {
    test(`${key} should have valid default`, (t) => {
      t.assert(ajv.validate($id, schema.default), ajv.errorsText());
    });
  }

  for (const i in schema.examples ?? []) {
    const example = schema.examples?.[i];

    test(`${key} should validate example ${i}`, (t) => {
      t.assert(ajv.validate($id, example), ajv.errorsText());
    });
  }
}
