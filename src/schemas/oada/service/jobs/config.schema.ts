import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/service/jobs/config.schema.json',
  description: 'The format for @oada/jobs config to watch a job queue',
  type: 'object',
  properties: {
    domain: {
      description: 'OADA domain of the job queue',
      type: 'string'
    },
    token: {
      description: 'Token to use when interacting with job queue',
      type: 'string'
    }
  },
  required: ['domain', 'token'],
  examples: [
    {
      domain: 'dev.trellis.one',
      token: 'abc1234321cba'
    }
  ]
}

export default schema
