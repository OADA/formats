/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import test from 'ava';

import { formats } from './index.js';

const testSchema = { enum: ['foo1'] };
test.before('Load test schema', () => {
  formats.addSchema(
    testSchema,
    'https://formats.openag.io/test/foo/bar/v1.schema.json'
  );
});

test('should resolve to schemas', (t) => {
  const validate = formats.getSchema('application/vnd.test.foo.bar.1+json');
  t.is(validate?.schema, testSchema);
});
