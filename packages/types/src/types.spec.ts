///<reference types='./types'/>

import test from 'ava';

import { schemas } from '@oada/formats';

import { TypeAssert, TypeCheck } from './';

type TypeModule<T = unknown> = {
  is: TypeCheck<T>;
  assert: TypeAssert<T>;
};

(async () => {
  for await (const { key, schema } of schemas()) {
    const type = key
      .replace(/^https:\/\/formats\.openag\.io/, '')
      .replace(/^\//, './')
      .replace(/\.schema\.json$/, '');

    for (const i in schema.examples ?? []) {
      const example = schema.examples?.[i];

      test(`${key} should check true for example ${i}`, async (t) => {
        const typeModule: TypeModule = await import(type);
        t.assert(typeModule.is(example));
      });

      test(`${key} should assert example ${i}`, async (t) => {
        const typeModule: TypeModule = await import(type);
        try {
          typeModule.assert(example);
          t.pass();
        } catch (err) {
          t.fail(err);
        }
      });
    }
  }
})();
