import { promises as fs } from 'fs'
import { resolve, join, basename, dirname, relative } from 'path'

import mkdirp = require('mkdirp')
import { compileFromFile } from 'json-schema-to-typescript'

import schemas, { glob } from './'

const schemasDir = resolve('lib', 'schemas')
const typesDir = resolve('types')

const compileStr = '`$ yarn build`'

// Compile the schema files to JSON and to TypeScript types
async function doCompile () {
  // "Compile" schemas to JSON
  for (const { key, schema } of schemas()) {
    const outfile = join(schemasDir, key.replace(/\.ts$/, '.json'))

    console.debug(`Writing ${key} schema as JSON`)
    await mkdirp(dirname(outfile))
    await fs.writeFile(outfile, JSON.stringify(schema, null, 2))
  }

  // Compile schemas to TS types
  for (const key of glob) {
    const file = key.replace(/^\//, './')
    const infile = join(schemasDir, file)
    const outfile = join(typesDir, file.replace(/\.schema\.json$/, '.ts'))
    const name = basename(infile, '.schema.json')
    const cwd = dirname(infile)
    const typeName = `${name[0].toUpperCase()}${name.substr(1)}`

    // Make the banner comment a bit more informative
    // TODO: Figure out some TS magic to use instead of this code generation??
    const bannerComment = `
        /* tslint:disable */
        /**
         * File was automatically generated using json-schema-to-typescript.
         * DO NOT MODIFY IT BY HAND.
         * Instead, modify the source file ${key}
         * and run ${compileStr} to regenerate this file.
         */

        // ajv with all the OADA type schemas loaded
        import { ajv } from '${relative(
          resolve(dirname(outfile)),
          resolve(__dirname, '../ajv')
        )}'

        /**
         * Returns true if val is a @type ${typeName}, false otherwise
         */
        export function is (val: any): val is ${typeName} {
          return ajv.validate('${key}', val) as boolean
        }

        /**
         * Asserts that val is a @type ${typeName}
         */
        export function assert (val: any): asserts val is ${typeName} {
          if (!ajv.validate('${key}', val) as boolean) {
            throw ajv.errors
          }
        }

        export default ${typeName}
      `

    console.debug(`Compiling ${key} to TypeScript types`)
    try {
      const ts = await compileFromFile(infile, {
        bannerComment,
        unreachableDefinitions: true,
        cwd
      })
      await mkdirp(dirname(outfile))
      await fs.writeFile(outfile, ts)
    } catch (err) {
      console.error(`Error compiling ${key}: %O`, err)
    }
  }
}

doCompile()
