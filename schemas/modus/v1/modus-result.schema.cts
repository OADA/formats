/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/modus/v1/modus-result.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Modus document for submission of lab results to FMIS',
  $comment: 'The main lab result format for Modus V1, converted from the XSD',
  type: 'object',
  properties: {
    _type: {
      $comment: 'content type for API responses',
      const: 'application/vnd.modus.v1.modus-result+json',
    },
    Events: {
      type: 'array',
      items: {
        $comment: 'this is an "Event"',
        type: 'object',
        properties: {
          EventMetaData: {
            type: 'object',
            properties: {
              EventCode: {
                description:
                  'Unique human readable code for the sample event. Often referred to a Layer ID',
                type: 'string',
              },
              EventType: { $ref: './global.schema.json#/$defs/EventType' },
              EventExpirationDate: {
                type: 'string',
                format: 'date',
                description:
                  'The date the data in event is to expire for use in a recommendation',
              },
            },
          },

          LabMetaData: { $ref: './global.schema.json#/$defs/LabMetaData' },

          FMISMetadata: { $ref: './global.schema.json#/$defs/FMISMetadata' },

          EventSamples: {
            description: 'Element contains the field sample points and data',
            type: 'object',
            properties: {
              Soil: {
                description:
                  'Element to place samples and results from a soil sample event',
                type: 'object',
                properties: {
                  DepthRefs: { $ref: './global.schema.json#/$defs/DepthRefs' },
                  RecommendationRefs: {
                    $ref: './global.schema.json#/$defs/RecommendationRefs',
                  },
                  SoilSamples: {
                    type: 'array',
                    items: {
                      $comment: 'A "SoilSample"',
                      description:
                        'Element that contains the soil sample event data under the soil event',
                      type: 'object',
                      properties: {
                        SampleMetaData: {
                          $ref: './global.schema.json#/$defs/SampleMetaData',
                        },
                        Depths: {
                          description:
                            'A container for the different depths being reported',
                          type: 'array',
                          items: {
                            description:
                              'Container for results at a defined depth. The Depth ID is defined in DepthRefs',
                            type: 'object',
                            properties: {
                              NutrientResults: {
                                $ref: './global.schema.json#/$defs/NutrientResults',
                              },
                              TextureResults: {
                                $ref: './global.schema.json#/$defs/TextureResults',
                              },
                              DepthID: {
                                description:
                                  'Depth ID from the Depth Reference',
                                type: ['number', 'string'],
                              },
                            },
                          },
                        },
                        NutrientRecommendations: {
                          $ref: './global.schema.json#/$defs/NutrientRecommendations',
                        },
                        Comments: {
                          $ref: './global.schema.json#/$defs/Comments',
                        },
                      },
                    },
                  },
                },
              },

              Plant: {
                description:
                  'Element to place samples and results from a plant tissue sample event',
                type: 'object',
                properties: {
                  RecommendationRefs: {
                    $ref: './global.schema.json#/$defs/RecommendationRefs',
                  },
                  PlantSamples: {
                    type: 'object',
                    properties: {
                      SampleMetaData: {
                        $ref: './global.schema.json#/$defs/SampleMetaData',
                      },
                      NutrientResults: {
                        $ref: './global.schema.json#/$defs/NutrientResults',
                      },
                      NutrientRecommendations: {
                        $ref: './global.schema.json#/$defs/NutrientRecommendations',
                      },
                      Comments: {
                        $ref: './global.schema.json#/$defs/Comments',
                      },
                    },
                  },
                },
              },

              Nematode: {
                description:
                  'Element to place samples and results from a nematode sample event',
                type: 'object',
                properties: {
                  DepthRefs: { $ref: './global.schema.json#/$defs/DepthRefs' },
                  NematodeSamples: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        SampleMetaData: {
                          $ref: './global.schema.json#/$defs/SampleMetaData',
                        },
                        Depths: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              NematodeResults: {
                                $ref: './global.schema.json#/$defs/NematodeResults',
                              },
                              DepthID: { type: 'integer', minimum: 1 },
                            },
                          },
                        },
                        Comments: {
                          $ref: './global.schema.json#/$defs/Comments',
                        },
                      },
                    },
                  },
                },
              },

              Water: {
                type: 'object',
                properties: {
                  WaterSamples: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        SampleMetaData: {
                          $ref: './global.schema.json#/$defs/SampleMetaData',
                        },
                        Source: { type: 'string' },
                        NutrientResults: {
                          $ref: './global.schema.json#/$defs/NutrientResults',
                        },
                        Comments: {
                          $ref: './global.schema.json#/$defs/Comments',
                        },
                      },
                    },
                  },
                },
              },

              Residue: {
                type: 'object',
                properties: {
                  ResidueSamples: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        SampleMetaData: {
                          $ref: './global.schema.json#/$defs/SampleMetaData',
                        },
                        ResidueResults: {
                          $ref: './global.schema.json#/$defs/ResidueResults',
                        },
                        Comments: {
                          $ref: './global.schema.json#/$defs/Comments',
                        },
                      },
                    },
                  },
                },
              },
            },
          },

          Comments: { $ref: './global.schema.json#/$defs/Comments' },

          ModusSubmit: {
            $comment: 'can hold an entire ModusSubmit document?',
            $ref: './modus-submit.schema.json',
          },
        },
      },
    },
    Version: { type: 'string', default: '1.0' },
  },

  // More examples can be found at https://github.com/oats-center/modus/examples
  examples: [
    {
      _type: 'application/vnd.modus.v1.modus-result+json',
      ModusResult: {
        Events: [
          {
            EventMetaData: {
              EventCode: 'ece3a2a8-4340-48b1-ae1f-d48d1f1e1692',
              EventDate: '2021-09-24',
              EventType: { Soil: true },
            },
            LabMetaData: {
              LabName: 'A & L Great Lakes Laboratories',
              LabEventID: 'F21267-0039',
              Contact: {
                Name: 'A & L Great Lakes Laboratories',
                Phone: '260.483.4759',
                Address: '3505 Conestoga Dr.\nFort Wayne, IN 46808',
              },
              ReceivedDate: '2021-09-24T00:00:00.000',
              ProcessedDate: '2021-09-28T00:00:00.000',
              ClientAccount: {
                AccountNumber: '30039',
                Company: 'THE ANDERSONS FARM CTR - GPS',
                City: 'N MANCHESTER',
                State: 'IN',
              },
              Reports: {
                '1': {
                  LabReportID: 'F21271-0035',
                },
              },
            },
            FMISMetaData: {
              FMISEventID: 'ece3a2a8-4340-48b1-ae1f-d48d1f1e1692',
              FMISProfile: {
                'Grower': 'CARL AULT',
                'Farm': 'ENYART EAST 50',
                'Field': '50.1 AC',
                'Sub-Field': '',
              },
            },
            EventSamples: {
              Soil: {
                DepthRefs: {
                  '1': {
                    Name: 'Unknown Depth',
                    StartingDepth: 0,
                    EndingDepth: 8,
                    ColumnDepth: 8,
                    DepthUnit: 'in',
                  },
                },
                SoilSamples: [
                  {
                    SampleMetaData: {
                      SampleNumber: 1,
                      ReportID: 28_051,
                    },
                    Depths: [
                      {
                        DepthID: '1',
                        NutrientResults: {
                          'pH': { Value: 7, ValueUnit: 'none' },
                          'OM': { Value: 2.4, ValueUnit: '%' },
                          'P': { Value: 34, ValueUnit: 'ppm' },
                          'K': { Value: 161, ValueUnit: 'ppm' },
                          'Ca': { Value: 1150, ValueUnit: 'ppm' },
                          'Mg': { Value: 240, ValueUnit: 'ppm' },
                          'CEC': { Value: 8.2, ValueUnit: 'meq/100g' },
                          'BS-Ca': { Value: 70.4, ValueUnit: '%' },
                          'BS-Mg': { Value: 24.5, ValueUnit: '%' },
                          'BS-K': { Value: 5.1, ValueUnit: '%' },
                          'SO4-S': { Value: 7, ValueUnit: 'ppm' },
                          'Zn': { Value: 3.3, ValueUnit: 'ppm' },
                          'Mn': { Value: 46, ValueUnit: 'ppm' },
                          'B': { Value: 0.7, ValueUnit: 'ppm' },
                        },
                      },
                    ],
                  },

                  {
                    SampleMetaData: {
                      SampleNumber: 2,
                      ReportID: 28_052,
                    },
                    Depths: [
                      {
                        DepthID: '1',
                        NutrientResults: {
                          'pH': { Value: 7.6, ValueUnit: 'none' },
                          'OM': { Value: 2.7, ValueUnit: '%' },
                          'P': { Value: 30, ValueUnit: 'ppm' },
                          'K': { Value: 190, ValueUnit: 'ppm' },
                          'Ca': { Value: 1950, ValueUnit: 'ppm' },
                          'Mg': { Value: 265, ValueUnit: 'ppm' },
                          'CEC': { Value: 12.4, ValueUnit: 'meq/100g' },
                          'BS-Ca': { Value: 78.3, ValueUnit: '%' },
                          'BS-Mg': { Value: 17.7, ValueUnit: '%' },
                          'BS-K': { Value: 3.9, ValueUnit: '%' },
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    },
  ],
};

export = schema;