import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellisfw/trading-partner/porkhack/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Proposed trading partner structure for Pork Hack 21',
  additionalProperties: true,
  definitions: {
    partnertype: {
      type: 'string',
      enum: [ 'hauler', 'processor', 'farmer' ],
    },

    //--------------------------------
    // Locations:
    address: {
      type: 'string',
      // Todo: better definition
    },
    latlon: {
      type: 'object',
      properties: {
        lat: { type: "number" },
        lon: { type: "number" },
      },
    },
    premiseid: {
      type: "string"
    },


    location: {
      anyOf: [
        { $ref: "#/definitions/address" },
        { $ref: "#/definitions/latlon" },
        { $ref: "#/definitions/premiseid" },
        { 
          type: 'object',
          properties: {
            id: { type: "string" }, // Key in the locations array
            name: { type: "string" },
          },
        },
      ],
    },
  },

  properties: {
    id: { type: 'string' },
    partnertype: { $ref: '#/definitions/partnertype' },
    name: { type: 'string' },
    address: { $ref: '#/definitions/address' },
    locations: {
      type: 'object',
      additionalProperties: { $ref: '#/definitions/location' }
    },
    bookmarks: { $ref: "../../../oada/link/v1.schema.json#/definitions/nonversioned" },
  },

  examples: [
    {
      id: '0i2jfo2ljfoik',
      partnertype: 'hauler',
      name: 'Happy Hauler',
    },
    {
      id: 'kdjf203oi3rjkl',
      partnertype: 'processor',
      name: 'Pig Processor',
      locations: {
        '09o2j3klkj': {
          id: '09o2j3klkj',
          name: 'Orlando East Plant',
          address: 'someplace in orlando',
          lat: '28.515899',
          lon: '-81.426453',
        },
      },
    },
    {
      id: '092iojflekjf',
      partnertype: 'farmer',
      name: 'Frank Farmer',
      locations: {
        '02iojf230fij': {
          id: '02iojf230fij',
          name: 'East barn',
          premiseid: '9294823',
        },
        '99jdfkwojei': {
          id: '99jdfkwojei',
          name: 'West barn',
          premiseid: '54832093',
        },
      },
    },
  ],

};

export default schema;
