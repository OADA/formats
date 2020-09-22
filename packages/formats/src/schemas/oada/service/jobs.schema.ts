import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/service/jobs.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'The format for @oada/jobs jobs list',
  type: 'object',
  additionalProperties: {
    type: 'object',
    properties: {
      _id: {
        $ref: '../../oada.schema.json#/definitions/_id',
      },
    },
    required: ['_id'],
  },
  examples: [
    {
      asdxjkacsdj: {
        _id: 'resources/ajajkjfsdaf',
        _rev: 1,
      },
    },
  ],
};

export default schema;
