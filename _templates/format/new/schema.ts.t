---
to: src/schemas/<%= name %>.schema.ts
---
import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
    $id: 'https://formats.openag.io/<%= name %>.schema.json',
    $schema: 'https://json-schema.org/draft/2019-09/schema',
    /* TODO: Put your JSON Schema here */
}

export default schema

