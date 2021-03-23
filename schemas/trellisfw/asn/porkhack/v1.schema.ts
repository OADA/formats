import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellisfw/asn/porkhack/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Proposed ASN structure for Pork Hack 21',
  additionalProperties: true,
  definitions: {

    //--------------------------------
    // Time:
    day: {
      type: "string",
      pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$", // YYYY-MM-DD
    },
    timestamp: {
      type: "number", // unix timestamp, always GMT
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
            name: {
              type: "string",
            },
          },
        },
      ],
    },


    //--------------------------------
    // Stats:
    head: {
      type: "object",
      properties: {
        value: { type: "number" },
        units: { type: "string", enum: [ "count" ] },
      }
    },
    weight: {
      type: 'object',
      properties: {
        value: { type: "number" },
        units: { type : "string", enum: [ "lbs", "kg" ] },
      }
    },

    //--------------------------------
    // Certifications:
    pac: { // private automated certification (AGAPECert)
      type: 'object',
      properties: {
        pacid: { type: 'string' },
        result: { 
          type: 'string',
          enum: [ 'valid', 'invalid' ],
        },
        signatures: {
          type: 'array',
          items: {
            type: 'string' // each signature is a JWT
          }
        }
      }
    },
    certification: {
      type: 'object',
      properties: {
        certtype: {
          type: 'string',
          enum: [ 'TQA', 'PQA-PLUS' ],
        },
        certificationid: { type: "string" },
        expiration: { $ref: "#/definitions/day" },
      },
    },
    certifications: {
      type: "object",
      additionalProperties: { $ref: "#/definitions/certification" },
    }

  },
  properties: {
    status: {
      type: 'string',
      // If you need to reschedule a load, cancel this ASN and make a new one.  That is why there is no "delayed" status.
      enum: [ "scheduled", "canceled", "enroute", "arrived", "received" ],
    },
    shipdate: { $ref: "#/definitions/day" },
    scheduled: {
      type: 'object',
      properties: {
        shipfromlocation: { $ref: "#/definitions/location" },
      },
    },
    enroute: {
      type: 'object',
      properties: {
        head: { $ref: "#/definitions/head" },
        weight: { $ref: "#/definitions/weight" },
        departuretime: { $ref: '#/definitions/timestamp' },
        arrivaltime: { $ref: '#/definitions/timestamp' },
        locations: {
          type: "object",
          // objects w/ lat, lon, time:
          additionalProperties: {
            allOf: [
              { $ref: "#/definitions/latlon" },
              { 
                type: 'object',
                properties: {
                  time: { $ref: '#/definitions/timestamp' }
                },
              },
            ],
          },
        },
      },
    },
    arrived: {
      type: 'object',
      properties: {
        arrivaltime: { $ref: '#/definitions/timestamp' },
        head: { $ref: '#/definitions/head' },
        weight: { $ref: '#/definitions/weight' },
      }
    },
    farmer: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        certifications: { 
          type: 'object',
          additionalProperties: { $ref: "#/definitions/certification" },
        },
        // Any internal ID's the farmer's system uses to identify processor or farmer:
        processorid: { type: 'string' },
        haulerid: { type: 'string' },
      }
    },
    hauler: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        certifications: { 
          type: 'object',
          additionalProperties: { $ref: "#/definitions/certification" },
        },
        // Any internal ID's the farmer's system uses to identify processor or hauler:
        farmerid: { type: 'string' },
        haulerid: { type: 'string' },
      }
    },
    processor: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        certifications: { 
          type: 'object',
          additionalProperties: { $ref: "#/definitions/certification" },
        },
        // Any internal ID's the farmer's system uses to identify farmer or hauler:
        farmerid: { type: 'string' },
        haulerid: { type: 'string' },
      }
    },
  },
  required: [ 'shipdate', 'status' ],
  examples: [

    {
      shipdate: "2021-03-25",
      status: "arrived",

      scheduled: {
        shipfromlocation: {
          name: "West Barn",
          premiseid: "1939842",
          address: "Address",
        },
      },

      enroute: {
        head: { value: 200, units: "count" },
        weight: { value: 49000, units: "lbs" },
        locations: {
          '208eifojfe': { time: 123984934.43, lat: 50.1984, lon: -81.83495 },
        },
        departuretime: 9023029431.0394,
        arrivaltime: 1893083093.439,
      },

      arrived: {
        arrivaltime: 190849103423.934,
        head: { value: 199, units: "count" },
        weight: { value: 48500, units: "lbs" },
      },


      farmer: {
        name: "Ault Farms, Inc.",
        certifications: {
          "02jkfjf0i2ofk": {
            certtype: "PQA-PLUS",
            expiration: "2022-04-20",
            certificationid: "9381923834"
          }
        },
        processorid: "internal_farmerid_for_processor",
        haulerid: "internal_farmrerid_for_hauler",
      },
      hauler: {
        name: "Hauler, Inc.",
        address: "the address",

        certifications: {
          "902u390r2j3iof": {
            certtype: "TQA",
            expiration: "2022-04-25",
            certificationid: "2890183410942",
            pac: {
              pacid: "ijd20fijedlkfj",
              result: "valid"
            }
          }
        },
        processorid: "internal_hauler_id_1",
        farmerid: "internal_hauler_id_2",
      },
      processor: {
        name: "Processor, Inc.",
        certifications: {
          "certification-random-string": {
            certtype: "TQA",
            expiration: "2022-04-25",
            certificationid: "444444444444",
            pac: {
              pacid: "pacid",
              result: "valid"
            }
          }
        },
        farmerid: "internal_processor_id_1",
        haulerid: "internal_processor_id_2",
      }
    },
    
        
  ]
};

export default schema;
