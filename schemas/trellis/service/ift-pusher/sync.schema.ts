import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/service/ift-pusher/sync.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  /* TODO: Put your JSON Schema here */
  description: 'Extension of @oada/job format for ift-pusher',
  type: 'object',
  allOf: [{ $ref: '../../../oada/service/job.schema.json' }],
  properties: {
    service: {
      description: 'Service Name',
      const: 'ift-pusher',
    },
    type: {
      description: 'IFT Synchronization Job',
      const: 'sync',
    },
    config: {
      description: 'Job specific configuration object',
      type: 'object',
      required: ['resourceId'],
      properties: {
        resourceId: {
          description: 'id for virtualized pdf',
          type: 'string',
        },
      },
    },
    result: {
      description: 'Final result of job',
    },
  },

  examples: [
    {
      service: 'ift-pusher',
      type: 'sync',
      config: {
        resourceId: 'resources/oivnoseklnvaoeij329814ng',
      },
      status: 'pending',
      updates: {
        aoihngklsdmfjoavin2398havj: {
          status: 'started',
          time: '2019-10-20T20:07:21+00:00',
          information: 'started',
        },
      },
    },
  ],
};

export default schema;
