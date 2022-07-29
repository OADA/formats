/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/change/v2.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Array-based change representation (OADA v2)',
  description:
    'Array of the changes to this resource and its ancestor changes to descendant resources',
  definitions: {
    change: {
      description:
        'An element of a change array representing a single change to a single resource',
      allOf: [
        {
          type: 'object',
          required: ['type', 'body', 'path', 'resource_id'],
          properties: {
            type: {
              description: 'Indicates the type of change that occurred.',
              enum: ['merge', 'delete'],
            },
            path: {
              description:
                'JSON Pointer to the descendant of this resource which changed (or "" for this resource)',
              $ref: '../../oada.schema.json#/definitions/path',
            },
            resource_id: {
              description: 'The `_id` of the resource which actually changed',
              $ref: '../../oada.schema.json#/definitions/_id',
            },
          },
        },
        {
          oneOf: [
            {
              type: 'object',
              required: ['body'],
              properties: {
                body: {
                  $comment: 'Should probably narrow this schema down',
                  description: 'The contents of what changed',
                  type: 'object',
                  required: ['_rev'],
                  properties: {
                    _rev: {
                      $ref: '../../oada.schema.json#/definitions/_rev',
                    },
                  },
                },
              },
            },
            {
              type: 'object',
              required: ['type', 'body'],
              properties: {
                type: {
                  enum: ['delete'],
                },
                body: {
                  type: 'null',
                },
              },
            },
          ],
        },
      ],
    },
  },
  type: 'array',
  items: {
    $ref: '#/definitions/change',
  },
  examples: [
    // OADA v2
    [
      {
        resource_id: 'resources/default:resources_bookmarks_123',
        path: '',
        body: {
          rocks: {
            _rev: 1,
          },
          _rev: 1,
        },
        type: 'merge',
      },
      {
        resource_id: 'resources/default:resources_rocks_123',
        path: '/rocks',
        body: {
          test: 'abc',
          _rev: 1,
        },
        type: 'merge',
      },
    ],
  ],
};

export = schema;
