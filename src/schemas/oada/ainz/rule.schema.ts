import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/ainz/rule.schema.json',
  description: 'The format for ainz orchestation rules',
  type: 'object',
  properties: {
    list: {
      description: 'A path to an OADA list to watch for changes',
      $ref: '../../oada.schema.json#/definitions/path'
    },
    destination: {
      description: 'A path to an OADA list to which to add maching items',
      $ref: '../../oada.schema.json#/definitions/path'
    },
    schema: {
      description: 'A JSON Schema to which to compare new items in list',
      $ref: 'https://json-schema.org/draft/2019-09/schema#'
    },
    meta: {
      description: "And object to PUT on matching items's _meta",
      type: 'object'
    }
  },
  required: ['list', 'schema'],
  examples: [
    {
      list: '/bookmarks/stuff',
      schema: {
        const: { foo: 'bar' }
      },
      destination: '/bookmarks/foo'
    }
  ]
}

export default schema
