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
  $id: 'https://formats.openag.io/modus/v2/modus-result.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Modus document for submission of lab results to FMIS',
  $comment: 'A Flatter version of modus v1',
  type: 'object',
  properties: {
    version: { type: 'string', default: '1.0-slim' },
  },

  // More examples can be found at https://github.com/oats-center/modus/examples
  examples: [
    {
      _type: 'application/vnd.modus.v1.modus-result+json',
      id: 'ece3a2a8-4340-48b1-ae1f-d48d1f1e1692',
      dateCollected: '2021-09-24',
      type: 'soil',
      lab: {
        id: { source: 'local', value: '1' },
        name: 'A & L Great Lakes Laboratories',
        resultid: 'F21267-0039',
        contact: {
          name: 'A & L Great Lakes Laboratories',
          phone: '260.483.4759',
          address: '3505 Conestoga Dr.\nFort Wayne, IN 46808',
        },
        dateReceived: '2021-09-24T00:00:00.000',
        dateProcessed: '2021-09-28T00:00:00.000',
        clientAccount: {
          accountNumber: '30039',
          company: 'THE ANDERSONS FARM CTR - GPS',
          city: 'N MANCHESTER',
          state: 'IN',
        },
        report: {
          LabReportID: 'F21271-0035',
        },

      },
      FMIS: {
        id: 'ece3a2a8-4340-48b1-ae1f-d48d1f1e1692',
        profile: {
          Grower: 'CARL AULT',
          Farm: 'ENYART EAST 50',
          Field: '50.1 AC',
          'Sub-Field': '',
        },
      },
      samples: [
        {
          id: '123453ndkf',
          crop: 'corn',
          depth: { ... },
          geolocation: {
            lat: 12.342342, 
            lon: -93.4889343,
            geojson: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [ 12.342342, -93.4889343 ] } },
          },
          results: [
            { element: 'N', value: '...', },...
          ],
        },
      ],


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