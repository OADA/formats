import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/service/job/update.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'A list of updates as job progresses. Keys shall be sorted in time order.',
  type: 'object',
  properties: {
    status: {
      description: 'Status of job at the time of update',
      type: 'string'
    },
    time: {
      description: 'ISO8601 UTC date-time of update time',
      type: 'string'
    },
    meta: {
      description: 'Additional meta data about the status update'
    }
  },
  required: ['status', 'time'],
  examples: [
    {
      status: 'started',
      time: '2018-11-14T20:20:39+00:00',
      meta: {
        example: 'data'
      }
    }
  ]
}

export default schema
