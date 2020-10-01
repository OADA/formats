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
      description: 'Input parameters for the condition',
      $ref: 'https://json-schema.org/draft/2019-09/schema',
    },
    pointers: {
      description: 'A map for applying params to schema.',
      type: 'object',
      $comment: 'Is there a way to specify the keys are JSON pointers?',
      additionalProperties: {
        type: 'boolean',
      },
      examples: [
        {
          '/a/b/c': true,
          '/d/e': false,
        },
      ],
    },
  },
  required: ['name', 'type', 'description'],
};

export default schema;
