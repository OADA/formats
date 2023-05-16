/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema = {
  $id: 'https://formats.openag.io/modus/v1/modus-submit.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Modus document for submitting sample events to FMIS',
  $comment:
    'Sadly, the standard appears to duplicate a lot of things here from modus-result. Sticking to the standard in the hope of fixing in the future.',
  type: 'object',
  properties: {
    _type: {
      $comment: 'content type for API responses',
      const: 'application/vnd.modus.v1.modus-submit+json',
    },
    Events: {
      type: 'array',
      items: {
        $comment: 'this is an "Event"',
        type: 'object',
        properties: {
          EventMetaData: { $ref: './global.schema.json#/$defs/EventMetaData' },

          LabMetaData: { $ref: './global.schema.json#/$defs/LabMetaData' },

          FMISMetadata: { $ref: './global.schema.json#/$defs/FMISMetadata' },

          SubmissionAttributes: {
            $ref: './global.schema.json#/$defs/SubmissionAttributes',
          },

          EventSamples: {
            type: 'object',
            properties: {
              Soil: {
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
                              DepthID: {
                                description:
                                  'Depth ID from the Depth Reference',
                                type: 'string',
                              },
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

              Plant: {
                description:
                  'Element to place samples and results from a plant tissue sample event',
                type: 'object',
                properties: {
                  RecommendationRefs: {
                    $ref: './global.schema.json#/$defs/RecommendationRefs',
                  },
                  PlantSample: {
                    type: 'object',
                    properties: {
                      SampleMetaData: {
                        $ref: './global.schema.json#/$defs/SampleMetaData',
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
            $ref: '#',
          },
        },
      },
    },
    Version: { type: 'string', default: '1.0' },
  },
} as const satisfies Schema;

export = schema;
