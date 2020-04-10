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
  function fixid (id: string): { $id: Schema['$id']; key: string } {
    // Parse id into content type
    const matches = r.exec(id)
    if (!matches) {
      throw new Error(`Unknown schema id format: ${id}`)
    }
    const [, type] = matches

    const { value: key } = contentTypeToKey(type).next() as { value: string }
    const $id = root + key

    return { $id, key }
  }

  for (const type in formats.mediatypes) {
    const model = await formats.model(type)
    // Peel off weird id
    const { id, ...oldSchema }: Old.Schema = await model.schema()

    // Generate proper id
    const { $id, key } = fixid(id)
    const schema = { $id, ...oldSchema }

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
      const { $id } = id ? fixid(id) : { $id: '' }
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
