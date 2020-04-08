import { promises as fs } from 'fs'
import { resolve, join, basename, dirname } from 'path'

import mkdirp = require('mkdirp')
import { compileFromFile } from 'json-schema-to-typescript'

import formats, { schemas } from '@oada/formats'

// Where to put compiled types
const typesDir = resolve('./')

const compileStr = '`$ yarn build`'

// Compile the schema files to TypeScript types
async function doCompile () {
  // Compile schemas to TS types
  for (const {
    key,
    path,
    schema: { $id }
  } of schemas()) {
    const file = key.replace(/^\//, './')
    const outfile = join(typesDir, file.replace(/\.schema\.json$/, '.ts'))
    const name = basename(path, '.schema.json')
    const cwd = dirname(path)
    const typeName = `${name[0].toUpperCase()}${name.substr(1)}`

    // Make the banner comment a bit more informative
    // TODO: Figure out some TS magic to use instead of this code generation??
    const bannerComment = `
        /* tslint:disable */
        /**
         * File was automatically generated using json-schema-to-typescript.
         * DO NOT MODIFY IT BY HAND.
         * Instead, modify the source file ${key} of @oada/formats
         * and run ${compileStr} to regenerate this file.
         */

        // ajv with all the OADA type schemas loaded
        import formats from '@oada/formats'

        /**
         * Returns true if val is a @type ${typeName}, false otherwise
         */
        export function is (val: any): val is ${typeName} {
          return formats.validate('${key}', val) as boolean
        }

        /**
         * Asserts that val is a @type ${typeName}
         */
        export function assert (val: any): asserts val is ${typeName} {
          if (!formats.validate('${key}', val) as boolean) {
            throw formats.errors
          }
        }

        // Augment module interface?
        declare module '@oada/formats' {
          /**
           * @todo Figure out how do type overrides for getSchema
           */
          interface OADAFormats {
            validate(ref: '${$id}' | '${key}', data: any): data is ${typeName}
          }
        }

        export default ${typeName}
      `

    console.debug(`Compiling ${key} to TypeScript types`)
    try {
      const r = /^https:\/\/formats\.openag\.io/
      const ts = await compileFromFile(path, {
        bannerComment,
        unreachableDefinitions: true,
        $refOptions: {
          // Use local versions of openag schemas
          resolve: {
            http: {
              order: 0,
              canRead: r,
              async read ({ url }) {
                const path = url.replace(r, '')
                return JSON.stringify(formats.getSchema(path)?.schema)
              }
            }
          }
        },
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
