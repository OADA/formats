import { join } from 'path'

import { JSONSchema8 as Schema } from 'jsonschema8'

import * as Ajv from 'ajv'
import axios from 'axios'

import schemas from './schemas'

export const ajv: OADAFormats = new Ajv({ loadSchema }) as OADAFormats

export interface OADAFormats extends Ajv.Ajv {
  validate(ref: string | Schema, data: any): boolean
}

// Load all the schemas into ajv (ajv does not fetch $ref's itself)
for (const { key, schema } of schemas()) {
  ajv.addSchema(schema, key)
}

/**
 * Resolves a content-type to possible schema IDs
 */
export function * contentTypeToKey (
  contentType: string
): Generator<string, void, void> {
  const regex = /^application\/vnd\.([^.]+)\.(.*)\+json$/

  const matches = regex.exec(contentType.toLowerCase())
  if (!matches) {
    return
  }

  const [, domain, type] = matches
  const types = type.split('.')
  // Handle versioned types
  const key = `/${domain}/${types.join('/')}.schema.json`
  const ver = types.pop() ?? NaN
  if (!+ver) {
    yield key
  }

  // TODO: Enforce that version is a number??
  // Get separate version schema
  yield `/${domain}/${types.join('/')}/v${ver}.schema.json`
  // Allow versions definined within schemas??
  // Current verison of JSON Schema definitions
  yield `/${domain}/${types.join('/')}.schema.json#/$defs/v${ver}`
  // Deprecated version of JSON Schema definitions
  yield `/${domain}/${types.join('/')}.schema.json#/definitions/v${ver}`
}

// Support getting schema by content type?
const _getSchema = ajv.getSchema.bind(ajv)
ajv.getSchema = (ref: string) => {
  const schema = _getSchema(ref)
  if (schema) {
    return schema
  }

  for (const key of contentTypeToKey(ref)) {
    const schema = _getSchema(key)
    if (schema) {
      return schema
    }
  }
}

export async function loadSchema (uri: string) {
  const r = /^https:\/\/formats\.openag\.io/i

  if (uri.match(r)) {
    // Use local verison of openag schemas
    const file = uri
      .replace(r, join(__dirname, 'schemas'))
      .replace(/\.json$/, '')
    const { default: schema } = await import(file)
    return schema
  } else {
    // Try to fetch schema online
    const { data: schema } = await axios.get<Schema>(uri)
    console.dir(schema)
    return schema
  }
}
