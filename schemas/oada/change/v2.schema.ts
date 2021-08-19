import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/change/v2.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    change: {
      allOf: [
        {
          type: 'object',
          required: ['type', 'body', 'path', 'resource_id'],
          properties: {
            type: { enum: ['merge', 'delete'] },
            path: { $ref: '../../oada.schema.json#/definitions/path' },
            resource_id: { $ref: '../../oada.schema.json#/definitions/_id' },
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
  description: 'Array-based change representation (OADA v2)',
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

export default schema;
