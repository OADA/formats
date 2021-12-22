import test from 'ava';

import mediaType2schema from './';

test('should resolve OADA formats media-type string', (t) => {
  const schema = mediaType2schema('application/vnd.oada.bookmarks.1+json');

  t.deepEqual(schema, [
    'https://formats.openag.io/oada/bookmarks/v1.schema.json',
  ]);
});

test('should not resolve non-OADA formats media-type string', (t) => {
  const schema = mediaType2schema('application/vnd.test.not.oada+json');

  t.deepEqual(schema, []);
});

test('should honor input schema parameter in media-type string', (t) => {
  const schema = mediaType2schema(
    'application/vnd.test.not.oada+json; schema="test foo bar"'
  );

  t.deepEqual(schema, ['test', 'foo', 'bar']);
});
