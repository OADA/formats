import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/service/queue.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'The format for @oada/jobs queue a job queue request',
  type: 'object',
  properties: {
    domain: {
      description: 'OADA domain of the job queue',
      type: 'string',
    },
    token: {
      description: 'Token to use when interacting with job queue',
      type: 'string',
    },
  },
  required: ['domain', 'token'],
  examples: [
    {
      domain: 'dev.trellis.one',
      token: 'abc1234321cba',
    },
  ],
};

export default schema;
