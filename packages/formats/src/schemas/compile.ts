import { promises as fs } from 'fs';
import { resolve, join, dirname } from 'path';

import * as yargs from 'yargs';
import mkdirp = require('mkdirp');

import schemas from './';

// Where to output compiled schemas
const schemasDir = resolve('lib', 'schemas');

// Compile the schema files to JSON and to TypeScript types
async function doCompile(outdir: string) {
  // "Compile" schemas to JSON
  for await (const { glob: key, schema } of schemas()) {
    const outfile = join(outdir, key.replace(/\.ts$/, '.json'));

    console.debug(`Writing ${key} schema as JSON`);
    console.debug(outfile);
    await mkdirp(dirname(outfile));
    await fs.writeFile(outfile, JSON.stringify(await schema, null, 2));
  }
}

const { argv } = yargs.options({
  outdir: {
    alias: 'o',
    describe: 'directory to which to output schemas',
    type: 'string',
    default: schemasDir,
  },
});

// @ts-ignore
doCompile(argv.outdir);
