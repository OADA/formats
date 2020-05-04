import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/change.schema.json',
  definitions: {
    type: {
      description: 'Indicates the type of change that occured.',
      enum: ['merge', 'delete']
    }
  },
  oneOf: [
    {
      type: 'object',
      description: 'Tree-based change representation (OADA v1)',
      required: ['type', 'body'],
      properties: {
        type: { $ref: '#/definitions/type' },
        body: {
          $comment: 'Should probably narrow this schema down',
          description: 'The contents of what was changed.'
        }
      }
    },
    {
      type: 'array',
      description: 'Array-based change representation (OADA v2)',
      items: {
        type: 'object',
        required: ['type', 'body', 'path', 'resource_id'],
        properties: {
          type: { $ref: '#/definitions/type' },
          body: {
            $comment: 'Should probably narrow this schema down',
            description: 'The contents of what was changed.'
          },
          path: { $ref: '../oada.schema.json#/definitions/path' },
          resource_id: { $ref: '../oada.schema.json#/definitions/_id' }
        }
      }
    }
  ],
  examples: [
    // OADA v1
    {
      body: {
        test: 'abc',
        _rev: 1
      },
      type: 'merge'
    },
    // OADA v2
    [
      {
        resource_id: 'resources/default:resources_bookmarks_123',
        path: '',
        body: {
          rocks: {
            _rev: 1
          },
          _rev: 1
        },
        type: 'merge'
      },
      {
        resource_id: 'resources/default:resources_rocks_123',
        path: '/rocks',
        body: {
          test: 'abc',
          _rev: 1
        },
        type: 'merge'
      }
    ]
  ]
}

export default schema
