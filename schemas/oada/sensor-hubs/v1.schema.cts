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
  $id: 'https://formats.openag.io/oada/sensor-hubs/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'Holds a listing of links to various sensor hubs (each hub may have many sensors it is responsible for',
  properties: {
    'serial-numbers': {
      description:
        'serial-numbers is an object whose keys represent serial numbers of something (i.e. a sensor hub), and each key just links to that thing',
      patternProperties: {
        '^(?!(indexing|.*-index|_.*)).*$': {
          description:
            'A link in OADA has at least an _id key and links one resource to another.',
          properties: {
            _id: {
              description: '_id identifies a resource in the OADA API.',
              type: 'string',
            },
          },
          required: ['_id'],
          type: 'object',
        },
      },
    },
    '_id': {
      description: '_id identifies a resource in the OADA API.',
      type: 'string',
    },
    '_rev': {
      description:
        '_rev is the revision string for a resource in the OADA API.',
      type: 'integer',
    },
    '_meta': {
      description: '_meta is a link to the meta document for a resources.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string',
        },
        _rev: {
          description:
            '_rev is the revision string for a resource in the OADA API.',
          type: 'integer',
        },
      },
      required: ['_id', '_rev'],
      type: 'object',
    },
    '_type': {
      enum: ['application/vnd.oada.sensor-hubs.1+json'],
    },
  },
  additionalProperties: true,
  required: ['_type'],
  type: 'object',
  examples: [
    {
      '_type': 'application/vnd.oada.sensor-hubs.1+json',
      'serial-numbers': {
        'df874j3': {
          _id: '8f2ofj2308f2i',
        },
        '02kjf20': {
          _id: 'mxmxh92f8hsdf',
        },
      },
    },
  ],
} as const satisfies Schema;
export = schema;
