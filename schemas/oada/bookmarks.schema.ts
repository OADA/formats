import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/bookmarks.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'bookmarks is the top-level document returned by the OADA API',
  definitions: {
    v1: {
      type: 'object',
      properties: {
        _type: {
          enum: ['application/vnd.oada.bookmarks.1+.json'],
        },
      },
    },
  },
  allOf: [
    {
      $ref: 'resource.schema.json#',
    },
    {
      anyOf: [
        {
          $ref: '#/definitions/v1',
        },
        {
          type: 'object',
          properties: {
            _type: {
              type: 'string',
              pattern: 'application/vnd\\.oada\\.bookmarks\\.[0-9]+\\+\\.json',
            },
          },
        },
      ],
    },
  ],
};

export default schema;
