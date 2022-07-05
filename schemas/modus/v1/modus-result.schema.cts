/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

// Handy helper function for the refs:
const ref = (term: string, description?: string) => {
  const refschema: Schema = { $ref: `./global.schema.json#/$defs/${term}` };
  if (description) refschema.description = description;
  return refschema;
}

const schema: Schema = {
  $id: 'https://formats.openag.io/modus/v1/modus-result.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Modus document for submission of lab results to FMIS',
  $comment: 'The main lab result format for Modus V1, converted from the XSD',
  type: 'object',
  properties: {
    _type: {
      const: 'application/vnd.modus.v1.modus-result+json', // content type for API responses
    },
    Events: {
      type: 'array',
      items: {
        type: 'object', // this is an "Event"
        properties: {

          EventMetaData: {
            type: 'object',
            properties: {
              EventCode: {
                description: 'Unique human readable code for the sample event. Often referred to a Layer ID',
                type: 'string',
              },
              EventType: ref('EventType'),
              EventExpirationDate: ref('date', 'The date the data in event is to expire for use in a recommendation'),
            },
          }, // end EventMetaData

          LabMetaData: ref('LabMetaData'),

          FMISMetadata: ref('FMISMetadata'),

          EventSamples: { 
            description: 'Element contains the field sample points and data',
            type: 'object',
            properties: {
              
              Soil: {
                description: 'Element to place samples and results from a soil sample event',
                type: 'object',
                properties: {
                  DepthRefs: ref('DepthRefs'),
                  RecommendationRefs: ref('RecommendationRefs'),
                  SoilSamples: {
                    type: 'array',
                    items: { // A "SoilSample" 
                      description: 'Element that contains the soil sample event data under the soil event',
                      type: 'object',
                      properties: {
                        SampleMetaData: ref('SampleMetaData'),
                        Depths: {
                          description: 'A container for the different depths being reported',
                          type: 'array',
                          items: {
                            description: 'Container for results at a defined depth. The Depth ID is defined in DetphRefs',
                            type: 'object', 
                            properties: {
                              NutrientResults: ref('NutrientResults'),
                              TextureResults: ref('TextureResults'),
                              DepthID: { 
                                description: 'Depth ID from the Depth Reference',
                                type: 'string'
                              },
                            },
                          },
                        }, // end Depths
                        NutrientRecommendations: ref('NutrientRecommendations'),
                        Comments: ref('Comments'),
                      },
                    },
                  },
                },
              }, // end Soil key in EventSamples

              Plant: {
                description: 'Element to place samples and results from a plant tissue sample event',
                type: 'object',
                properties: {
                  RecommendationRefs: ref('RecommendationRefs'),
                  PlantSample: {
                    type: 'object',
                    properties: {
                      SampleMetaData: ref('SampleMetaData'),
                      NutrientResults: ref('NutrientResults'),
                      NutrientRecommendations: ref('NutrientRecommendations'),
                      Comments: ref('Comments'),
                    },
                  },
                },
              }, // end Plant key in EventSamples

              Nematode: {
                description: 'Element to place samples and results from a nematode sample event',
                type: 'object',
                properties: {
                  DepthRefs: ref('DepthRefs'),
                  NematodeSamples: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        SampleMetaData: ref('SampleMetaData'),
                        Depths: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              NematodeResults: ref('NematodeResults'),
                              DepthID: { type: 'integer', minimum: 1 },
                            },
                          },
                        },
                        Comments: ref('Comments'),
                      },
                    },
                  },
                },
              }, // end Nematode key in EventSamples

              Water: {
                type: 'object',
                properties: {
                  WaterSamples: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        SampleMetaData: ref('SampleMetaData'),
                        Source: { type: 'string' },
                        NutrientResults: ref('NutrientResults'),
                        Comments: ref('Comments'),
                      },
                    },
                  },
                },
              }, // end Water key in EventSamples

              Residue: {
                type: 'object',
                properties: {
                  ResidueSamples: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        SampleMetaData: ref('SampleMetaData'),
                        ResidueResults: ref('ResidueResults'),
                        Comments: ref('Comments'),
                      },
                    },
                  },
                },

              }, // end Residue key in EventSamples

            },
          }, // end EventSamples

          Comments: ref('Comments'),

          ModusSubmit: { $ref: './modus-submit.schema.json' }, // can hold an entire ModusSubmit document?

        }, // end Events.items.properties

      }, // end Events.items
    }, // end Events
    Version: { type: 'string', default: '1.0' },
  },

  // More examples can be found at https://github.com/oats-center/modus/examples
  examples: [
    {
      "_type": "application/vnd.modus.v1.modus-result+json",
      "ModusResult": {
        "Events": [
          { 
            "EventMetaData": {
              "EventCode": "ece3a2a8-4340-48b1-ae1f-d48d1f1e1692",
              "EventDate": "2021-09-24",
              "EventType": "Soil"
            },
            "LabMetaData": {
              "LabName": "A & L Great Lakes Laboratories",
              "LabEventID": "F21267-0039",
              "Contact": {
                "Name": "A & L Great Lakes Laboratories",
                "Phone": "260.483.4759",
                "Address": "3505 Conestoga Dr.\nFort Wayne, IN 46808"
              },
              "ReceivedDate": "2021-09-24T00:00:00.000",
              "ProcessedDate": "2021-09-28T00:00:00.000",
              "ClientAccount": {
                "AccountNumber": "30039",
                "Company": "THE ANDERSONS FARM CTR - GPS",
                "City": "N MANCHESTER",
                "State": "IN"
              },
              "Reports": {
                "1": {
                  "LabReportID": "F21271-0035"
                }
              }
            },
            "FMISMetaData": {
              "FMISEventID":"ece3a2a8-4340-48b1-ae1f-d48d1f1e1692",
              "FMISProfile": {
                "Grower": "CARL AULT",
                "Farm": "ENYART EAST 50",
                "Field": "50.1 AC",
                "Sub-Field": ""
              }
            },
            "EventSamples": {
              "Soil": {
                "DepthRefs": {
                  "1": {
                    "Name": "Unknown Depth",
                    "StartingDepth": 0,
                    "EndingDepth": 8,
                    "ColumnDepth": 8,
                    "DepthUnit": "in"
                  }
                },
                "SoilSamples": [
                  {
                    "SampleMetaData": {
                      "SampleNumber": 1,
                      "ReportID": 28051
                    },
                    "Depths": [
                      {
                        "DepthID": "1",
                        "NutrientResults": {
                          "pH": { "Value": 7.0, "ValueUnit": "none" },
                          "OM": { "Value": 2.4, "ValueUnit": "%" },
                          "P": { "Value": 34, "ValueUnit": "ppm" },
                          "K": { "Value": 161, "ValueUnit": "ppm" },
                          "Ca": { "Value": 1150, "ValueUnit": "ppm" },
                          "Mg": { "Value": 240, "ValueUnit": "ppm" },
                          "CEC": { "Value": 8.2, "ValueUnit": "meq/100g" },
                          "BS-Ca": { "Value": 70.4, "ValueUnit": "%" },
                          "BS-Mg": { "Value": 24.5, "ValueUnit": "%" },
                          "BS-K": { "Value": 5.1, "ValueUnit": "%" },
                          "SO4-S": { "Value": 7, "ValueUnit": "ppm" },
                          "Zn": { "Value": 3.3, "ValueUnit": "ppm" },
                          "Mn": { "Value": 46, "ValueUnit": "ppm" },
                          "B": { "Value": 0.7, "ValueUnit": "ppm" }
                        }
                      }
                    ]
                  },

                  {
                    "SampleMetaData": {
                      "SampleNumber": 2,
                      "ReportID": 28052
                    },
                    "Depths": [
                      {
                        "DepthID": "1",
                        "NutrientResults": {
                          "pH": { "Value": 7.6, "ValueUnit": "none" },
                          "OM": { "Value": 2.7, "ValueUnit": "%" },
                          "P": { "Value": 30, "ValueUnit": "ppm" },
                          "K": { "Value": 190, "ValueUnit": "ppm" },
                          "Ca": { "Value": 1950, "ValueUnit": "ppm" },
                          "Mg": { "Value": 265, "ValueUnit": "ppm" },
                          "CEC": { "Value": 12.4, "ValueUnit": "meq/100g" },
                          "BS-Ca": { "Value": 78.3, "ValueUnit": "%" },
                          "BS-Mg": { "Value": 17.7, "ValueUnit": "%" },
                          "BS-K": { "Value": 3.9, "ValueUnit": "%" }
                        }
                      }
                    ]
                  },

                ], // end SoilSamples
              } // end Soil
            } // end EventSamples
          }
        ] // end Events 
      } // end ModusResult
    },



  ],

};

export = schema;
