import test from 'ava';

import { formats } from './';

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
