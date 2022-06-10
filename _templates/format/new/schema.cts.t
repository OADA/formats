---
to: schemas/<%= name %>.schema.cts
---
import type { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
    $id: 'https://formats.openag.io/<%= name %>.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    /* TODO: Put your JSON Schema here */
}

export = schema

