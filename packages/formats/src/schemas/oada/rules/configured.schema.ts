import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/rules/configured.schema.json',
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
