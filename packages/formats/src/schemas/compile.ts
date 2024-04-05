/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { dirname, join } from 'node:path';
import fs from 'node:fs/promises';

import log from 'debug';
import { mkdirp } from 'mkdirp';
import yargs from 'yargs';

import loadAllSchemas, { schemasDirectory } from '@oada/schemas';

const debug = log('@oada/formats:compile:debug');

const { argv } = yargs(process.argv.slice(2)).options({
  outdir: {
    alias: 'o',
    describe: 'directory to which to output schemas',
    type: 'string',
    default: schemasDirectory,
  },
});

const { outdir } = await argv;

// Compile the schema files to JSON and to TypeScript types
for await (const { key, schema } of loadAllSchemas()) {
  const outfile = join(outdir, key.replace(/\.[cm][jt]s$/, '.json'));

  debug('Writing %s schema as JSON', key);
  debug(outfile);
  await mkdirp(dirname(outfile));
  // eslint-disable-next-line unicorn/no-null
  await fs.writeFile(outfile, JSON.stringify(schema, null, 2));
}
