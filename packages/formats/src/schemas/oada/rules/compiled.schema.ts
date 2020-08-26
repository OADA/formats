import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/rules/compiled.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Represents a "compiled" bit of work to implement rules',
  allOf: [{ $ref: '../resource.schema.json' }],
  properties: {
    rule: {
      description: 'Reference to the rule this is implementing',
      $ref: '../link/v1.schema.json#/definitions/versioned'
    },
    action: {
      description: 'Name of the action invloved',
      type: 'string',
      examples: ['push audit']
    },
    service: {
      description: 'Name of the service performing this piece of work',
      type: 'string'
    },
    schema: {
      description: 'A JSON Schema to which filters inputs to this work',
      $ref: 'https://json-schema.org/draft/2019-09/schema'
    },
    path: {
      description: 'The path to an OADA list to watch for inputs',
      $ref: '../../oada.schema.json#/definitions/path'
    },
    type: {
      description: 'Content-type(s) with which this condition works',
      oneOf: [
        { type: 'string' },
        {
          type: 'array',
          items: { type: 'string' }
        }
      ]
    },
    options: {
      description: 'Parameter values for this work',
      type: 'object',
      $comment: 'Not yet implemented'
    }
  },
  required: ['rule', 'action', 'service', 'type', 'path', 'schema']
}

export default schema
