import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellisfw/locations/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'List of available locations',
  additionalProperties: { $ref: '../../oada/link/v1.schema.json#/definitions/versioned' },
  examples: [
    { }, // empty list

    // List with one location in it:
    {
       'kdojf203ijlfk': { _id: 'resources/90djfo2lk3fjlsdf', _rev: 1 },
    },

  ]
};

export default schema;
