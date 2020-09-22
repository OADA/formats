import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/rules/action.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'A description of an action which can be used in OADA rules',
  allOf: [{ $ref: '../resource.schema.json' }],
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
    params: {
      description: 'Parameters for the action',
      $comment: 'Not yet implemented',
    },
  },
  required: ['name', 'service', 'type', 'description'],
};

export default schema;
