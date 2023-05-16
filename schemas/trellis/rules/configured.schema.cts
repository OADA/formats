/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema = {
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
      description: 'List of conditions involved in this rule',
      additionalProperties: {
        description: 'Particular condition involved in this rule',
        type: 'object',
        properties: {
          condition: {
            description: 'A link to the condition document',
            $ref: '../../oada/link/v1.schema.json#/definitions/versioned',
          },
          options: {
            description: 'Parameter values for this condition',
            type: 'object',
          },
        },
        required: ['condition'],
      },
    },
    actions: {
      description: 'List of actions involved in this rule',
      additionalProperties: {
        description: 'Particular action involved in this rule',
        type: 'object',
        properties: {
          action: {
            description: 'A link to the action document',
            $ref: '../../oada/link/v1.schema.json#/definitions/versioned',
          },
          options: {
            description: 'Parameter values for this action',
            type: 'object',
          },
        },
        required: ['action'],
      },
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
          action: {
            _id: 'resources/foo',
            _rev: 1,
          },
          options: {
            foo: 1,
            bar: 'a',
          },
        },
      },
      conditions: {},
    },
  ],
} as const satisfies Schema;

export = schema;
