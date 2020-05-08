---
to: src/schemas/<%= name %>.schema.ts
---
import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
    $id: 'https://formats.openag.io/<%= name %>.schema.json',
    /* TODO: Put your JSON Schema here */
}

export default schema

