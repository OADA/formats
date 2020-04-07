import * as Ajv from 'ajv'

import schemas from './schemas'

export const ajv = new Ajv()

// Load all the schemas into ajv (ajv does not fetch $ref's itself)
for (const { key, schema } of schemas()) {
  ajv.addSchema(schema, key)
}

/**
 * Resolves a content-type to possible schema IDs
 */
export function * contentTypeToKey (contentType: string): Generator<string> {
  const regex = /^application\/vnd\.([^.]+)\.(.*)\+json$/

  const matches = regex.exec(contentType.toLowerCase())
  if (!matches) {
    return
  }

  const [, domain, type] = matches
  const types = type.split('.')

  yield `/${domain}/${types.join('/')}.schema.json`

  // Allow versions definined within schemas??
  const ver = types.pop()
  // Current verison of JSON Schema definitions
  yield `/${domain}/${types.join('/')}.schema.json#/$defs/v${ver}`
  // Deprecated version of JSON Schema definitions
  yield `/${domain}/${types.join('/')}.schema.json#/definitions/v${ver}`
}

// Support getting schema by content type?
const _getSchema = ajv.getSchema.bind(ajv)
ajv.getSchema = ref => {
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
