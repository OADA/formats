import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellisfw/asns/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'List of available ASN\'s.  Core indexing is by day of scheduled ship date.',
  additionalProperties: true,
  properties: {
    'day-index': { 
      type: 'object',
      patternProperties: {
        '^[0-9]{4}-[0-9]{2}-[0-9]{2}$': { $ref: '../../oada/link/v1.schema.json#/definitions/versioned' },
      },
    }
  },
  examples: [
    { }, // empty list

    // List with one day in it:
    {
      'day-index': { 
        '2021-03-13': { _id: 'resources/90djfo2lk3fjlsdf', _rev: 1 },
      },
    },

  ]
};

export default schema;
