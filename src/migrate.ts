import { cwd } from 'process'
import { promises as fs } from 'fs'
import { dirname, join } from 'path'

import mkdirp = require('mkdirp')

import { JSONSchema8 as Schema } from 'jsonschema8'

import { contentTypeToKey } from './ajv'

import { JSONSchema8 as RealSchema } from 'jsonschema8'
import * as Ajv from 'ajv'

export namespace Old {
  // The IDs on the generated schemas are weird
  export type Schema = RealSchema & { id: string }
  export interface Model {
    validate: Ajv.ValidateFunction
    schema: () => Promise<Schema>
    examples: () => Promise<{ [key: string]: any }>
  }
  export interface Formats extends Ajv.Ajv {
    mediatypes: { [key: string]: string }
    _addMediatypes(types: { [key: string]: string }): void
    model: (type: string) => Promise<Model>
  }
}

type MigrateOptions = {
  format?: 'json' | 'ts'
  outdir?: string
  root?: string
}
const defaultRoot = 'https://formats.openag.io'
/**
 * Function to dump all the schemas out of an old oada-formats
 */
export async function migrate (
  formats: Old.Formats,
  {
    format = 'json',
    outdir = `${cwd()}/schemas`,
    root = defaultRoot
  }: MigrateOptions = {}
) {
  const r = /^oada-formats:\/\/(.+)$/
  function fixid (
    id: string | undefined,
    type: string | null
  ): { $id: Schema['$id']; key: string } {
    if (id) {
      // Parse id into content type
      const matches = r.exec(id)
      if (matches) {
        ;[, type] = matches
      }
    }
    if (!type) {
      throw new Error('Schema has neither id nor type')
    }

    const { value: key } = contentTypeToKey(type).next() as { value: string }
    const $id = root + key

    return { $id, key }
  }

  for (const type in formats.mediatypes) {
    console.info(type)
    let model
    try {
      model = await formats.model(type)
    } catch (err) {
      console.error(`Failed to load type ${type}: %O`, err)
      continue
    }
    let schema
    let $id
    let key
    try {
      // Peel off weird id
      const { id, ...oldSchema }: Old.Schema = await model.schema()

        // Generate proper id
      ;({ $id, key } = fixid(id, type))
      schema = { $id, ...oldSchema }
    } catch (err) {
      console.error(`Failed to load schema for ${type}: %O`, err)
      continue
    }

    // TODO: Fix $refs more intelligently
    function fixRefs (obj: { [key: string]: any }): void {
      Object.keys(obj).forEach(key => {
        if (key === '$ref') {
          obj[key] = fixRef(obj[key])
        } else if (typeof obj[key] === 'object') {
          fixRefs(obj[key])
        }
      })
    }
    function fixRef ($ref: string): string {
      const [id, path] = $ref.split('#')
      const { $id } = id ? fixid(id, null) : { $id: '' }
      return `${$id}#${path}`
    }
    fixRefs(schema)

    // Fetch the examples
    const oldExamples = await model.examples()
    const examples: any[] = []
    for (const example in oldExamples) {
      examples.push(oldExamples[example])
    }

    let output
    let path = join(outdir, key)
    const json = JSON.stringify({ ...schema, examples }, null, 2)
    switch (format) {
      case 'json':
        // Create plain JSON schema
        output = json
        break
      case 'ts':
        // Create "TypeScript" schema
        output = `
          import { JSONSchema8 as Schema } from 'jsonschema8'

          const schema: Schema = ${json}
          export default schema
        `
        path = path.replace(/\.json$/, '.ts')
        break
    }

    // Write file out
    await mkdirp(dirname(path))
    await fs.writeFile(path, output)
  }
}
