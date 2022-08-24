/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import test from 'ava';

import { schemas } from '@oada/formats';

import type { TypeAssert, TypeCheck } from './index.js';

interface TypeModule<T = unknown> {
  is: TypeCheck<T>;
  assert: TypeAssert<T>;
}

for (const { key, schema } of schemas()) {
  const type = key
    .replace(/^https:\/\/formats\.openag\.io/, '')
    .replace(/^\//, '../types/')
    .replace(/\.schema\.json$/, '.js');

  const { examples } = schema;
  for (const [index, example] of Object.entries(examples ?? [])) {
    test(`${key} should check true for example ${index}`, async (t) => {
      const typeModule: TypeModule = (await import(type)) as TypeModule;
      t.assert(typeModule.is(example));
    });

    test(`${key} should assert example ${index}`, async (t) => {
      const typeModule: TypeModule = (await import(type)) as TypeModule;
      try {
        typeModule.assert(example);
        t.pass();
      } catch (error: unknown) {
        t.fail(`${error}`);
      }
    });
  }
}
