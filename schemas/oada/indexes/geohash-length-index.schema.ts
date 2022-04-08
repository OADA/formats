/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/indexes/geohash-length-index.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'geohash-length-index is an indexing scheme that groups data by geohash string lengths. As with all indexes, it is not a document type itself and therefore cannot be linked to.  It can also have a "datum" key which tells the earth model used for GPS.',
  properties: {
    datum: {
      description:
        'datum describes the model of the earth used for GPS coordinates. It can be from a set of known strings, or an EPSG model from http://spatialreference.org',
      anyOf: [
        {
          type: 'string',
          examples: ['WGS84'],
        },
        {
          required: ['type', 'properties'],
          properties: {
            type: {
              enum: ['EPSG'],
            },
            properties: {
              required: ['code'],
              properties: {
                code: {
                  type: 'number',
                },
              },
              type: 'object',
            },
          },
          type: 'object',
        },
      ],
    },
    // FIXME: Hack because the below patternProperties breaks the TS compiler
    ...Object.fromEntries(
      Array.from({ length: 15 })
        .fill(0)
        .map(
          (_, index) =>
            [
              `geohash-${index + 1}` as const,
              { $ref: '../link/v1.schema.json#/definitions/link' },
            ] as const
        )
    ),
  },
  /*
      PatternProperties: {
        '^geohash-[1-9][0-9]*$': {
          { $ref: '../link/v1.schema.json#/definitions/link' },
        },
      },
  */
  type: 'object',
};

export default schema;
