import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/rules/condition.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'A description of a condtion which can be used in OADA rules',
  allOf: [{ $ref: '../resource.schema.json' }],
  properties: {
    name: {
      description: 'Name of the condition',
      type: 'string',
      examples: ['signature_valid'],
    },
    service: {
      description: 'Name of the service implementing/performing the condition',
      type: 'string',
      $comment: 'service conditions not yet implemented',
    },
    schema: {
      description: 'A JSON Schema to which implements this condition',
      $ref: 'https://json-schema.org/draft/2019-09/schema',
    },
    type: {
      description: 'Content-type(s) with which this condition works',
      oneOf: [
        { type: 'string' },
        {
          type: 'array',
          items: { type: 'string' },
        },
      ],
    },
    description: {
      description: 'Human description of the condition for UI etc.',
      type: 'string',
      examples: ['has a valid signature'],
    },
    params: {
      description: 'Parameters for the condtion',
      type: 'object',
      $comment: 'Not yet implemented',
    },
  },
  required: ['name', 'type', 'description'],
};

export default schema;
