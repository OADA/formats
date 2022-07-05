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
  $id: 'https://formats.openag.io/modus/v1/modus-submit.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Modus document for submitting sample events to FMIS',
  $comment: 'Sadly, the standard appears to duplicate a lot of things here from modus-result.  Sticking to the standard in the hope of fixing in the future.',
  type: 'object',
  properties: {
    _type: {
      const: 'application/vnd.modus.v1.modus-submit+json', // content type for API responses
    },
    Events: {
      type: 'array',
      items: {
        type: 'object', // this is an "Event"
        properties: {

          EventMetaData: ref('EventMetaData'),

          LabMetaData: ref('LabMetaData'),

          FMISMetadata: ref('FMISMetadata'),

          SubmissionAttributes: ref('SubmissionAttributes'),

          EventSamples: { 
            type: 'object',
            properties: {
              
              Soil: {
                type: 'object',
                properties: {
                  DepthRefs: ref('DepthRefs'),
                  RecommendationRefs: ref('RecommendationRefs'),
                  SoilSamples: {
                    type: 'array',
                    items: { // A "SoilSample" 
                      type: 'object',
                      properties: {
                        SampleMetaData: ref('SampleMetaData'),
                        Depths: {
                          type: 'array',
                          items: {
                            type: 'object', 
                            properties: {
                              DepthID: { 
                                description: 'Depth ID from the Depth Reference',
                                type: 'string'
                              },
                            },
                          },
                        }, // end Depths
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
};

export = schema;
