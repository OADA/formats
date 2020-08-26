import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/service/fl-pusher/sync.schema.json',
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  /* TODO: Put your JSON Schema here */
  description: 'Extension of @oada/job format for fl-pusher',
  type: 'object',
  allOf: [{ $ref: '../../../oada/service/job.schema.json' }],
  properties: {
    service: {
      description: 'Service Name',
      const: 'fl-pusher'
    },
    type: {
      description: 'Foodlogiq Synchronization Job',
      const: 'sync'
    },
    config: {
      description: 'Job specific configuration object',
      // TODO
      type: 'object',
      required: ['resourceId', 'businessId'],
      properties: {
        resourceId: {
          description: 'id for virtualized pdf',
          type: 'string'
        },
        businessId: {
          description: 'The foodlogiq business ID where the document is stored',
          type: 'string'
        },
        communityIds: {
          description:
            'The foodlogiq community IDs the document is to be shared with',
          type: 'array',
          items: { type: 'string' }
        }
      }
    },
    result: {
      description: 'Final result of job'
    }
  },

  examples: [
    {
      service: 'fl-pusher',
      type: 'sync',
      config: {
        resourceId: 'resources/oivnoseklnvaoeij329814ng',
        businessId: '123456789012345678901234',
        communityIds: [
          '223456789012345678901234',
          '323456789012345678901234',
          '423456789012345678901234'
        ]
      },
      status: 'pending',
      updates: {
        aoihngklsdmfjoavin2398havj: {
          status: 'started',
          time: '2019-10-20T20:07:21+00:00',
          information: 'started'
        }
      }
    }
  ]
}

export default schema
