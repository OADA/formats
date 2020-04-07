import * as Ajv from 'ajv'

import schemas from './schemas'

export const ajv = new Ajv()

// Load all the schemas into ajv (ajv does not fetch $ref's itself)
for (const { key, schema } of schemas()) {
  ajv.addSchema(schema, key)
}
