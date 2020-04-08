import { JSONSchema8 as Schema } from 'jsonschema8'

export default {
  $id: 'https://formats.openag.io/oada/user/v1.schema.json',
  description: 'application/vnd.oada.user.1+json',
  additionalProperties: true,
  properties: {
    bookmarks: {
      $ref:
        'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned'
    }
  },
  examples: [
    {
      bookmarks: {
        _id: 'kdjsl028ifej',
        _rev: '2-djfh92843hj'
      },
      username: 'frank',
      name: 'Farmer Frank',
      family_name: 'Frank',
      given_name: 'Farmer',
      middle_name: '',
      nickname: 'Frankie',
      email: 'frank@openag.io'
    }
  ]
} as Schema
