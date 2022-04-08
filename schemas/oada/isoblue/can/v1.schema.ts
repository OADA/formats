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
  $id: 'https://formats.openag.io/oada/isoblue/can/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'CAN frame collected from machine attached to ISOBlue (or similar) device',
  properties: {
    'templates': {
      description:
        'templates is a general key for holding a collection of data points indexed by random strings.  Templates serve as prototypes for data points under "data" keys. If you have a piece of information that exists is all or almost all of the data points in a particular group of points, you can put the repeated things in templates and then just put the name of the template into the data point.  The full data point is therefore a merge of the template object and the data point itself, with the data point overruling when there are any keys that exist in both objects.  Schema is therefore identical to "data".',
      patternProperties: {
        '^(?!(indexing|.*-index|_.*)).*$': {
          description:
            'data-point never appears as a word in any document or URL.  It is a general type of object that can hold any type of data.  It represents the type of object that can sit under "data" or "templates".',
          properties: {
            id: {
              description:
                'id (note this is NOT "_id") can be used to identify a particular data point, perhaps across documents which simply re-index the same data.',
              type: 'string',
            },
            time: {
              description:
                'time is a data type which holds a reading of...time...',
              properties: {
                units: {
                  type: 'string',
                  examples: ['unix-timestamp', 'sec'],
                },
              },
              type: 'object',
            },
            is_error_frame: {
              description: 'Error frame flag for can frame',
            },
            is_extended_frame: {
              description: 'Extended frame flag for can frame',
            },
            arbitration_id: {
              description: 'CAN ID portion of extended can frame',
            },
            dlc: {
              description: 'Data Length Code portion of extended can frame',
            },
            payload: {
              description: 'String representation can frame payload in base64',
            },
            is_remote_frame: {
              description: 'Remote frame flag from can frame',
            },
          },
          type: 'object',
        },
      },
    },
    'data': {
      description:
        'data is a general key for holding a collection of data points indexed by random strings.',
      patternProperties: {
        '^(?!(indexing|.*-index|_.*)).*$': {
          description:
            'data-point never appears as a word in any document or URL.  It is a general type of object that can hold any type of data.  It represents the type of object that can sit under "data" or "templates".',
          properties: {
            id: {
              description:
                'id (note this is NOT "_id") can be used to identify a particular data point, perhaps across documents which simply re-index the same data.',
              type: 'string',
            },
            time: {
              description:
                'time is a data type which holds a reading of...time...',
              properties: {
                units: {
                  type: 'string',
                  examples: ['unix-timestamp', 'sec'],
                },
              },
              type: 'object',
            },
            is_error_frame: {
              description: 'Error frame flag for can frame',
            },
            is_extended_frame: {
              description: 'Extended frame flag for can frame',
            },
            arbitration_id: {
              description: 'CAN ID portion of extended can frame',
            },
            dlc: {
              description: 'Data Length Code portion of extended can frame',
            },
            payload: {
              description: 'String representation can frame payload in base64',
            },
            is_remote_frame: {
              description: 'Remote frame flag from can frame',
            },
          },
          required: ['id', 'time'],
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
      enum: ['application/vnd.oada.isoblue.can.1+json'],
    },
    'indexing': {
      type: 'array',
      items: {
        anyOf: [
          {
            properties: {
              index: {
                enum: ['year-index'],
              },
              source: {
                enum: ['oada.vocab.year-index'],
              },
              value: {
                type: 'string',
                pattern: '^[0-9]{4}$',
              },
            },
            type: 'object',
          },
          {
            properties: {
              index: {
                enum: ['day-index'],
              },
              source: {
                enum: ['oada.vocab.day-index'],
              },
              value: {
                type: 'string',
                pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
              },
            },
            type: 'object',
          },
          {
            properties: {
              index: {
                enum: ['hour-index'],
              },
              source: {
                enum: ['oada.vocab.hour-index'],
              },
              value: {
                type: 'string',
                pattern: '^[0-9]{2}:[0-9]{2}$',
              },
            },
            type: 'object',
          },
        ],
      },
    },
    'year-index': {
      description: 'year-index splits things up by a 4-digit year',
      patternProperties: {
        '^[0-9]{4}$': {
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
    'day-index': {
      description:
        'day-index splits things up by days, with full year-month-day string for keys',
      patternProperties: {
        '^[0-9]{4}-[0-9]{2}-[0-9]{2}$': {
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
    'hour-index': {
      description:
        'hour-index splits things up by hours, 24-hour time string in GMT like 06:07 or 23:44',
      patternProperties: {
        '^[0-9]{2}:[0-9]{2}$': {
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
  },
  additionalProperties: true,
  required: ['_type'],
  type: 'object',
  examples: [],
};
export default schema;
