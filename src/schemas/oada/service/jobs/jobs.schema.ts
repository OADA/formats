import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/service/jobs/jobs.schema.json',
  description: 'The format for @oada/jobs jobs list',
  type: 'object',
  patternProperties: {
    '^.*$': {
      $ref: '../../../oada.schema.json#/definitions/link/definitions/versioned'
    }
  },
  additionalItems: false,
  examples: [
    {
      asdxjkacsdj: {
        _id: 'resources/ajajkjfsdaf',
        _rev: 1
      }
    }
  ]
}

export default schema
