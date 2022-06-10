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
  $id: 'https://formats.openag.io/oada/tiled-maps/moisture-map/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'The "moisture-map" document contains harvested moisture readingstrade moisture, aggregated at various zoom levels for mapping and fast statistical calculation',
  properties: {
    'datum': {
      description:
        'datum describes the model of the earth used for GPS coordinates.  It can be from a set of known strings, or an EPSG model from http://spatialreference.org',
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
    'stats': {
      description:
        'stats sits at the top of a resource to list stats about the data inside that resource. Basic stats are sum, count, sum-of-squares.  The actual keys under stats are data names that you have stats for like weight, area, etc.  The same units and data names are valid under stats that are valid under data',
      properties: {
        template: {
          description:
            'template sits inside a data point and gives the name of a template (key in the templates object) which serves as prototype for a given data point.  The full data point is the merge of that template object with the data point, with the data point taking precedence in key collisions. This is a string because its value is the key in templates, not the template itself.',
          type: 'string',
        },
        geohash: {
          description:
            'A geohash is a base 32 encoded string which represents the combination of latitude and longitude into a single number which, in general, has a property such that points close in number are close on the globe.',
          type: 'string',
          pattern: '^[0-9bcdefghjkmnpqrstuvwxyz]+$',
        },
        area: {
          description: 'area is a data type which holds a reading of...area...',
          properties: {
            units: {
              type: 'string',
              examples: ['ac', 'acres', 'ha', 'hectares', 'sqft'],
            },
          },
          type: 'object',
        },
        moisture: {
          description:
            'moisture is a data type which holds a reading of the amount of moisture in a crop. It is typically in units of % water (%H2O).',
          properties: {
            units: {
              type: 'string',
              examples: ['%H2O'],
            },
          },
          type: 'object',
        },
      },
      type: 'object',
    },
    'templates': {
      description:
        'templates is a general key for holding a collection of data points indexed by random strings.  Templates serve as prototypes for data points under "data" keys. If you have a piece of information that exists is all or almost all of the data points in a particular group of points, you can put the repeated things in templates and then just put the name of the template into the data point.  The full data point is therefore a merge of the template object and the data point itself, with the data point overruling when there are any keys that exist in both objects.  Schema is therefore identical to "data".',
      patternProperties: {
        '^(?!(indexing|.*-index|_.*)).*$': {
          description:
            'data-point never appears as a word in any document or URL.  It is a general type of object that can hold any type of data.  It represents the type of object that can sit under "data" or "templates".',
          properties: {
            template: {
              description:
                'template sits inside a data point and gives the name of a template (key in the templates object) which serves as prototype for a given data point.  The full data point is the merge of that template object with the data point, with the data point taking precedence in key collisions. This is a string because its value is the key in templates, not the template itself.',
              type: 'string',
            },
            geohash: {
              description:
                'A geohash is a base 32 encoded string which represents the combination of latitude and longitude into a single number which, in general, has a property such that points close in number are close on the globe.',
              type: 'string',
              pattern: '^[0-9bcdefghjkmnpqrstuvwxyz]+$',
            },
            area: {
              description:
                'area is a data type which holds a reading of...area...',
              properties: {
                units: {
                  type: 'string',
                  examples: ['ac', 'acres', 'ha', 'hectares', 'sqft'],
                },
              },
              type: 'object',
            },
            moisture: {
              description:
                'moisture is a data type which holds a reading of the amount of moisture in a crop. It is typically in units of % water (%H2O).',
              properties: {
                units: {
                  type: 'string',
                  examples: ['%H2O'],
                },
              },
              type: 'object',
            },
          },
          type: 'object',
        },
      },
    },
    'geohash-data': {
      description:
        'geohash-data is much like "geohash-index" except that the geohash strings in geohashes are links to resources, whereas in geohash-data the geohash strings are actual data points representing data values for that geohash.  This is used primarily in tiled-maps.  The allowable values are the same as the values under "data"',
      patternProperties: {
        '^[0-9bcdefghjkmnpqrstuvwxyz]+$': {
          description:
            'data-point never appears as a word in any document or URL.  It is a general type of object that can hold any type of data.  It represents the type of object that can sit under "data" or "templates".',
          properties: {
            template: {
              description:
                'template sits inside a data point and gives the name of a template (key in the templates object) which serves as prototype for a given data point.  The full data point is the merge of that template object with the data point, with the data point taking precedence in key collisions. This is a string because its value is the key in templates, not the template itself.',
              type: 'string',
            },
            geohash: {
              description:
                'A geohash is a base 32 encoded string which represents the combination of latitude and longitude into a single number which, in general, has a property such that points close in number are close on the globe.',
              type: 'string',
              pattern: '^[0-9bcdefghjkmnpqrstuvwxyz]+$',
            },
            area: {
              description:
                'area is a data type which holds a reading of...area...',
              properties: {
                units: {
                  type: 'string',
                  examples: ['ac', 'acres', 'ha', 'hectares', 'sqft'],
                },
              },
              type: 'object',
            },
            moisture: {
              description:
                'moisture is a data type which holds a reading of the amount of moisture in a crop. It is typically in units of % water (%H2O).',
              properties: {
                units: {
                  type: 'string',
                  examples: ['%H2O'],
                },
              },
              type: 'object',
            },
          },
          required: ['area', 'moisture'],
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
      enum: ['application/vnd.oada.tiled-maps.moisture-map.1+json'],
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
                enum: ['crop-index'],
              },
              value: {
                type: 'string',
                examples: ['corn', 'soybeans', 'wheat'],
              },
              source: {
                type: 'string',
                examples: ['oada.vocab.crop-type'],
              },
            },
            type: 'object',
          },
          {
            properties: {
              index: {
                enum: ['geohash-length-index'],
              },
              value: {
                type: 'string',
                pattern: '^geohash-[1-9][0-9]*$',
              },
              source: {
                type: 'string',
                examples: ['oada.vocab.geohash-length-index'],
              },
            },
            type: 'object',
          },
          {
            properties: {
              index: {
                enum: ['geohash-index'],
              },
              value: {
                description:
                  'A geohash is a base 32 encoded string which represents the combination of latitude and longitude into a single number which, in general, has a property such that points close in number are close on the globe.',
                type: 'string',
                pattern: '^[0-9bcdefghjkmnpqrstuvwxyz]+$',
              },
              source: {
                type: 'string',
                examples: ['oada.vocab.geohash'],
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
    'crop-index': {
      description:
        "crop-index is an object that sits inside other objects and gives links to documents based on the name of a particular crop. It's known keys are also not considered part of the OADA vocabulary and therefore do not appear as vocabulary terms even though they will be in OADA URLs.  This is standard for indexes.",
      properties: {
        corn: {
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
        soybeans: {
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
        wheat: {
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
      type: 'object',
    },
    'geohash-length-index': {
      $ref: '../../indexes/geohash-length-index.schema.json',
    },
    'geohash-index': {
      description:
        'geohash-index is a key that holds under it a set of geohash keys of a particular length.  It is necessary because some geohashes may be legitimate words and therefore we need to place all the geohashes specifically under one key. This key usually sits at the top-level of a document reached via a geohash-length-index. It is intended to hold links to resources containing data that is grouped under a particular geohash.',
      patternProperties: {
        '^[0-9bcdefghjkmnpqrstuvwxyz]+$': {
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
  examples: [
    {
      '_id': 'resources/k2fjo23lf3',
      '_rev': 9,
      '_type': 'application/vnd.oada.tiled-maps.moisture-map.1+json',
      'indexing': [
        {
          index: 'year-index',
          source: 'oada.vocab.year-index',
          value: '2019',
        },
        {
          index: 'crop-index',
          source: 'oada.vocab.year-index',
          value: 'corn',
        },
        {
          index: 'geohash-length-index',
          source: 'oada.vocab.geohash-length-index',
          value: 'geohash-7',
        },
        {
          index: 'geohash-index',
          source: 'oada.vocab.geohash-index',
          value: 'dpq78df',
        },
      ],
      'stats': {
        moisture: {
          'units': '%H2O',
          'sum': 123_123.4124,
          'sum-of-squares': 1_412_413.234_234,
          'count': 1243,
        },
        area: {
          'units': 'acres',
          'sum': 1_451_341.342_33,
          'sum-of-squares': 134_134_124.341_341_2,
          'count': 1243,
        },
      },
      'templates': {
        '123': {
          area: {
            units: 'ac',
          },
          moisture: {
            units: '%H2O',
          },
        },
      },
      'datum': 'WGS84',
      'geohash-data': {
        '023jf2d': {
          template: '123',
          geohash: '023jf2d',
          moisture: {
            'sum': 123_123.4124,
            'sum-of-squares': 1_412_413.234_234,
            'count': 1243,
          },
          area: {
            'sum': 1_451_341.342_33,
            'sum-of-squares': 134_134_124.341_341_2,
            'count': 1243,
          },
        },
        '023jf2e': {
          template: '123',
          geohash: '023jf2e',
          moisture: {
            'sum': 123_123.4124,
            'sum-of-squares': 1_412_413.234_234,
            'count': 1243,
          },
          area: {
            'sum': 1_451_341.342_33,
            'sum-of-squares': 134_134_124.341_341_2,
            'count': 1243,
          },
        },
      },
    },
  ],
};
export = schema;
