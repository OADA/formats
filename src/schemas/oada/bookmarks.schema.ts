import { JSONSchema8 as Schema } from 'jsonschema8'

export default {
  $id: 'https://formats.openag.io/oada/bookmarks.schema.json',
  description: 'bookmarks is the top-level document returned by the OADA API',
  definitions: {
    v1: {
      properties: {
        _type: {
          enum: ['application/vnd.oada.bookmarks.1+.json']
        }
      }
    }
  },
  allOf: [
    {
      $ref: 'resource.schema.json#'
    },
    {
      anyOf: [
        {
          $ref: '#/definitions/v1'
        },
        {
          properties: {
            _type: {
              type: 'string',
              pattern: 'application/vnd\\.oada\\.bookmarks\\.[0-9]+\\+\\.json'
            }
          }
        }
      ]
    }
  ]
} as Schema

