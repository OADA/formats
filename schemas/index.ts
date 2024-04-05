/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import path from 'node:path';
import url from 'node:url';

import { glob } from 'glob';

import { importSchema } from './utils.cjs';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const schemasDirectory = dirname;

export const schemas = await glob('*.schema.{c,m,}js', {
  cwd: dirname,
  posix: true,
  dotRelative: true,
  matchBase: true,
});

/**
 * Load all the schemas
 */
async function* loadAllFormats() {
  for await (const s of schemas) {
    const schema = await importSchema(s);
    const key = s.replace(/\.[cm]?[jt]s$/, '.json');
    yield {
      key,
      path: path.join(dirname, key),
      schema,
    };
  }
}

export default loadAllFormats;
