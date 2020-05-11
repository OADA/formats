import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/service/job.schema.json',
  description: 'The format for an @oada/jobs job queue job.',
  type: 'object',
  properties: {
    service: {
      description: 'Service name which job is for',
      type: 'string'
    },
    type: {
      description: 'Service specific identifier of job type',
      type: 'string'
    },
    config: {
      description: 'Job spceific configuration object',
      type: 'object'
    },
    result: {
      description: 'Final result of job',
      type: 'object'
    },
    status: {
      description: 'Current status of job',
      type: 'string'
    },
    updates: {
      description:
        'A list of updates as job progresses. Keys shall be sorted in time order.',
      type: 'object',
      additionalProperties: {
        $ref: './job/update.schema.json'
      }
    }
  },
  required: ['service', 'type'],
  examples: [
    {
      service: 'shares',
      type: 'trading-partner',
      config: {
        resource: {
          _id: 'resources/TESTCOI1'
        },
        'trading-partner': {
          _id: 'resources/1b0yRTKhv21Rkbkt32PSokJOOrs_TP_LEGACYFARM'
        },
        path:
          '/bookmarks/trellisfw/trading-partners/1b0yRTKhv21Rkbkt32PSokJOOrs_TP_LEGACYFARM/bookmarks/trellisfw/cois'
      },
      status: 'pending',
      updates: {
        '1bF4ELuQwqU3CjDOsn2NF0d7Deu': {
          status: 'started',
          time: '2018-11-14T20:20:39+00:00'
        },
        '1bF4GjXWJvj6FJEXCiAj8DatQTD': {
          status: 'pending',
          time: '2018-11-13T20:20:39+00:00',
          information: 'Share requires manual approval'
        }
      }
    },
    {
      service: 'shares',
      type: 'trading-partner',
      config: {
        resource: {
          _id: 'resources/TESTCOI1'
        },
        'trading-partner': {
          _id: 'resources/1b0yRTKhv21Rkbkt32PSokJOOrs_TP_LEGACYFARM'
        },
        path:
          '/bookmarks/trellisfw/trading-partners/1b0yRTKhv21Rkbkt32PSokJOOrs_TP_LEGACYFARM/bookmarks/trellisfw/cois'
      },
      status: 'success',
      results: {
        path: '/bookmarks/new/path'
      },
      updates: {
        '1bWH1wv07R4XEhwyK2T3wJ2kLMo': {
          status: 'success',
          time: '2018-11-15T20:20:39+00:00',
          information: {
            approved: 'john'
          }
        },
        '1bF4ELuQwqU3CjDOsn2NF0d7Deu': {
          status: 'started',
          time: '2018-11-14T20:20:39+00:00'
        },
        '1bF4GjXWJvj6FJEXCiAj8DatQTD': {
          status: 'pending',
          time: '2018-11-13T20:20:39+00:00',
          information: 'Share requires manual approval'
        }
      }
    }
  ]
}

export default schema
