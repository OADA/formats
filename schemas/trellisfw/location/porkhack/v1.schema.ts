import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellisfw/location/porkhack/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Proposed Location structure for Pork Hack 21',
  additionalProperties: true,
  definitions: {
    locationtype: {
      type: 'string',
      enum: [ 'finish', 'farrow' ],
    },
  },

  properties: {
    id: { type: 'string' },
    locationtype: { $ref: '#/definitions/locationtype' },
    name: { type: 'string' },
    address: { type: 'string' },
    lat: { type: "number" },
    lon: { type: "number" },
    premiseid: { type: "string" },
  },

  examples: [
    {
      id: '0i2jfo2ljfoik',
      locationtype: 'finish',
      name: 'West Barn',
      premiseid: '19482',
    },
    {
      id: 'kdjf20joekl',
      locationtype: 'finish',
      name: 'East Barn',
      premiseid: '938794032',
      lat: -50.1923821,
      lon: 80.091928392,
    },
  ],

};

export default schema;
