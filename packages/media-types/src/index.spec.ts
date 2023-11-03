/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import test from 'ava';

import mediaType2schema from './index.js';

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
    'application/vnd.test.not.oada+json; schema="test foo bar"',
  );

  t.deepEqual(schema, ['test', 'foo', 'bar']);
});
