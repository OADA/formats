import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/change.schema.json',
  description: 'Wrapper type for any version of an OADA change document.',
  oneOf: [
    { $ref: './change/v1.schema.json' },
    { $ref: './change/v2.schema.json' }
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
