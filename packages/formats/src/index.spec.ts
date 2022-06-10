/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import test from 'ava';

import loadAllFormats from './index.js';

test('should load all formats', async (t) => {
  await t.notThrowsAsync(loadAllFormats());
});
