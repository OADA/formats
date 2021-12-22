import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/resource.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['_id', '_rev', '_meta', '_type'],
  properties: {
    _id: {
      $ref: '../oada.schema.json#/definitions/_id',
    },
    _rev: {
      $ref: '../oada.schema.json#/definitions/_rev',
    },
    _meta: {
      $ref: '../oada.schema.json#/definitions/link/definitions/versioned',
    },
    _type: {
      $ref: '../oada.schema.json#/definitions/_type',
    },
  },
};

export default schema;
