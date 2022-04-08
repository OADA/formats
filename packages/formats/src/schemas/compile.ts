/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/* eslint-disable security/detect-non-literal-fs-filename */

import { dirname, join, resolve } from 'node:path';
import fs from 'node:fs/promises';

import log from 'debug';
import { options } from 'yargs';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import mkdirp = require('mkdirp');

import schemas from './';

const debug = log('@oada/formats:compile:debug');

// Where to output compiled schemas
const schemasDirectory = resolve('dist', 'schemas');

// Compile the schema files to JSON and to TypeScript types
async function doCompile(outdir: string) {
  // "Compile" schemas to JSON
  for await (const { glob: key, schema } of schemas()) {
    const outfile = join(outdir, key.replace(/\.ts$/, '.json'));

    debug('Writing %s schema as JSON', key);
    debug(outfile);
    await mkdirp(dirname(outfile));
    await fs.writeFile(outfile, JSON.stringify(await schema));
  }
}

const { argv } = options({
  outdir: {
    alias: 'o',
    describe: 'directory to which to output schemas',
    type: 'string',
    default: schemasDirectory,
  },
});

// @ts-expect-error nonsense
void doCompile(argv.outdir);
