import { relative, join } from 'path'

import { expect } from 'chai'

import { JSONSchema8 as Schema } from 'jsonschema8'
import * as Ajv from 'ajv'
import * as $RefParser from '@apidevtools/json-schema-ref-parser'

import schemas from '../src/schemas'

describe('Type Schemas', () => {
  let ajv: Ajv.Ajv
  before('Initialize JSON Schema validator', () => {
    ajv = new Ajv()
  })

  // TODO: Figure out less hacky way to make it find the files correctly
  let checkRefs: (key: string, schema: Schema) => Promise<any>
  before('Initiallize $ref checker', () => {
    const $refparser = new $RefParser()
    checkRefs = (key: string, schema: Schema) =>
      $refparser.dereference(schema, {
        resolve: {
          file: {
            order: 0,
            canRead: true,
            async read ({ url }) {
              const dir = join('../src/schemas', key)
              const path = relative(__dirname, url)
              const file = join(dir, path).replace(/\.json$/, '')
              const { default: schema } = await import(file)
              return schema
            }
          }
        }
      })
  })

  for (const { schema, key } of schemas()) {
    describe(key, () => {
      it('should be valid JSON Schema', () => {
        expect(ajv.validateSchema(schema))
      })

      // $id needs to be consistent with file structure
      // or most tools get upset
      it('should have conistent $id', () => {
        expect(schema.$id).to.equal(
          `https://${join('formats.openag.io/', key)}`
        )
      })

      it("should have valid $ref's", async () => {
        await checkRefs(key, schema)
      })
    })
  }
})
