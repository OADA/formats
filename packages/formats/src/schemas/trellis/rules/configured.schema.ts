import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/rules/configured.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Representation of a constructed OADA rule for rules engine',
  properties: {
    enabled: {
      description: 'Wether this rule should be active',
      type: 'boolean',
      default: true,
    },
    services: {
      description: 'Array of the names of the services involved in this rule',
      $comment: 'Should this be here?',
      type: 'array',
      items: {
        type: 'string',
      },
      uniqueItems: true,
    },
    type: {
      description: 'Content-type this rule applies to',
      type: 'string',
    },
    on: {
      $comment: 'Where should this definiton live?',
      description: 'Whether to trigger on new item, changed item, etc.',
      oneOf: [
        {
          description: 'Trigger on a new item being added',
          enum: ['new'],
        },
        {
          description: 'Trigger on any change to an item',
          enum: ['change'],
        },
      ],
      default: 'new',
    },
    path: {
      description: 'The path to an OADA list to which to apply this rule',
      $ref: '../../oada.schema.json#/definitions/path',
    },
    conditions: {
      description: 'OADA list of conditions used in this rule',
      $ref: '../link/v1.schema.json#/definitions/list/definitions/versioned',
    },
    actions: {
      description: 'OADA list of actions used in this rule',
      $ref: '../link/v1.schema.json#/definitions/list/definitions/versioned',
    },
  },
  required: ['type', 'path', 'conditions', 'actions'],
  examples: [
    {
      type: 'application/json',
      enabled: true,
      path: '/bookmarks/foo',
      on: 'new',
      services: ['test-service'],
      actions: {
        'test-action': {
          _id: 'resources/foo',
          _rev: 1,
        },
      },
      conditions: {},
    },
  ],
};

export default schema;
