import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/rules/action.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'A description of an action which can be used in OADA rules',
  allOf: [{ $ref: '../../oada/resource.schema.json' }],
  properties: {
    name: {
      description: 'Name of the action',
      type: 'string',
      examples: ['email', 'push audit'],
    },
    service: {
      description: 'Name of the service implementing/performing the action',
      type: 'string',
    },
    type: {
      description: 'Content-type(s) with which this action works',
      oneOf: [
        { type: 'string' },
        {
          type: 'array',
          items: { type: 'string' },
        },
      ],
    },
    description: {
      description: 'Human description of the action for UI etc.',
      type: 'string',
      examples: ['send an email to {{address}}'],
    },
    uischema: {
      description: 'UISchema for the params',
      $comment: 'Not sure this is a good idea',
      type: 'object',
    },
    params: {
      description: 'Input parameters for the action',
      $ref: 'https://json-schema.org/draft/2019-09/schema',
    },
  },
  required: ['name', 'service', 'type', 'description'],
};

export default schema;
