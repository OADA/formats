import test from 'ava';

import loadAllFormats from './';

test('should load all formats', async (t) => {
  await t.notThrowsAsync(loadAllFormats());
});
