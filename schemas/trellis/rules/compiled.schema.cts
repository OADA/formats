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
  $id: 'https://formats.openag.io/trellis/rules/compiled.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Represents a "compiled" bit of work to implement rules',
  allOf: [{ $ref: '../../oada/resource.schema.json' }],
  properties: {
    rule: {
      description: 'Reference to the rule this is implementing',
      $ref: '../../oada/link/v1.schema.json#/definitions/versioned',
    },
    action: {
      description: 'Name of the action invloved',
      type: 'string',
      examples: ['push audit'],
    },
    service: {
      description: 'Name of the service performing this piece of work',
      type: 'string',
    },
    schema: {
      description: 'A JSON Schema which filters inputs to this work',
      $ref: 'https://json-schema.org/draft/2019-09/schema',
    },
    path: {
      description: 'The path to an OADA list to watch for inputs',
      $ref: '../../oada.schema.json#/definitions/path',
    },
    type: {
      description: 'Content-type(s) with which this works',
      oneOf: [
        { type: 'string' },
        {
          type: 'array',
          items: { type: 'string' },
        },
      ],
    },
    on: {
      $comment: 'Where should this definiton live?',
      $ref: './configured.schema.json#/properties/on',
    },
    options: {
      description: 'Parameter values for this work',
      $comment: 'Should these live in parent rule?',
      type: 'object',
    },
  },
  required: ['rule', 'action', 'service', 'type', 'on', 'path', 'schema'],
} as const satisfies Schema;

export = schema;
