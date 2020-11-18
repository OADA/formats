import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/rules/condition.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'A description of a condtion which can be used in OADA rules',
  allOf: [{ $ref: '../../oada/resource.schema.json' }],
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
    uischema: {
      description: 'UISchema for the params',
      $comment: 'Not sure this is a good idea',
      type: 'object',
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
        type: 'object',
        required: ['name', 'iskey'],
        properties: {
          name: {
            description: 'Name of the input to apply at this path.',
            type: 'string',
          },
          iskey: {
            description: 'Wether to replace the key or the value.',
            type: 'boolean',
          },
        },
      },
      examples: [
        {
          '/a/b/c': { name: 's1', iskey: true },
          '/d/e': { name: 's2', iskey: false },
        },
      ],
    },
  },
  required: ['name', 'type', 'description'],
};

export default schema;
