import test from 'ava';

import { formats } from './';

const testSchema = { enum: ['foo1'] };
test.before('Load test schema', () => {
  formats.addSchema(
    testSchema,
    'https://formats.openag.io/test/foo/bar.schema.json'
  );
});

test('should resolve to schemas', (t) => {
  const validate = formats.getSchema('application/vnd.test.foo.bar+json');
  t.is(validate?.schema, testSchema);
});

const rootSchema = { enum: ['foo2'] };
test.before('Load version root schema', () => {
  formats.addSchema(
    rootSchema,
    'https://formats.openag.io/test/foo/v1.schema.json'
  );
});
test('should resolve to version root schemas', (t) => {
  const validate = formats.getSchema('application/vnd.test.foo.1+json');
  t.is(validate?.schema, rootSchema);
});

const defsSchema = { enum: ['foo3'] };
test.before('Load version $defs schema', () => {
  const schema = { $defs: { v1: defsSchema } };
  formats.addSchema(schema, 'https://formats.openag.io/test/bar.schema.json');
});
test('should resolve to version $defs schemas', (t) => {
  const validate = formats.getSchema('application/vnd.test.bar.1+json');
  t.is(validate?.schema, defsSchema);
});

const definitionsSchema = { enum: ['foo4'] };
test.before('Load version definitions schema', () => {
  const schema = { definitions: { v1: definitionsSchema } };
  formats.addSchema(schema, 'https://formats.openag.io/test/baz.schema.json');
});
test('should resolve to version definitions schemas', (t) => {
  const validate = formats.getSchema('application/vnd.test.baz.1+json');
  t.is(validate?.schema, definitionsSchema);
});
