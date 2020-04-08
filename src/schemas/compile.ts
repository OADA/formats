import { promises as fs } from 'fs'
import { resolve, join, dirname } from 'path'

import mkdirp = require('mkdirp')

import schemas from './'

// Where to output compiled schemas
const schemasDir = resolve('lib', 'schemas')

// Compile the schema files to JSON and to TypeScript types
async function doCompile () {
  // "Compile" schemas to JSON
  for (const { key, schema } of schemas()) {
    const outfile = join(schemasDir, key.replace(/\.ts$/, '.json'))

    console.debug(`Writing ${key} schema as JSON`)
    await mkdirp(dirname(outfile))
    await fs.writeFile(outfile, JSON.stringify(schema, null, 2))
  }
}

doCompile()
