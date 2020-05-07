import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/service/jobs/configs.schema.json',
  description: 'The format for @oada/jobs config list',
  type: 'object',
  patternProperties: {
    '^.*$': {
      $ref: './config.schema.json'
    }
  },
  additionalProperties: false,
  examples: [
    {
      asdxjkacsdj: {
        domain: 'https://dev.trellis.one',
        token: 'abc1234321cba'
      }
    }
  ]
}

export default schema
