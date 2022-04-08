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
  $id: 'https://formats.openag.io/oada/as-harvested/yield-moisture-dataset/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'The "yield-moisture" document contains as-harvested yield-moisture data. This is where a typical "yield map" from an existing FMIS software would go.  We encourage geospatial indexing here (rather than field-based).',
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
            template: {
              description:
                'template sits inside a data point and gives the name of a template (key in the templates object) which serves as prototype for a given data point.  The full data point is the merge of that template object with the data point, with the data point taking precedence in key collisions. This is a string because its value is the key in templates, not the template itself.',
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
            weight: {
              description:
                'weight is a data type which holds a reading of weight, as in bushels, lbs, or kg.',
              properties: {
                units: {
                  type: 'string',
                  examples: ['bu', 'bushels', 'lbs', 'kg'],
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
            location: {
              description:
                'location represents a point in space, usually a GPS coordinate or geohash',
              properties: {
                datum: {
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
                latitude: {
                  description: 'latitude is a string in the format of a number',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                longitude: {
                  description:
                    'longitude is a string in the format of a number',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                altitude: {
                  description: 'altitude is a string in the format of a number',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                lat: {
                  description: 'lat is shorthand for latitude',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                lon: {
                  description: 'lon is shorthand for longitude',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                alt: {
                  description: 'alt is shorthand for altitude',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                geohash: {
                  description:
                    'A geohash is a base 32 encoded string which represents the combination of latitude and longitude into a single number which, in general, has a property such that points close in number are close on the globe.',
                  type: 'string',
                  pattern: '^[0-9bcdefghjkmnpqrstuvwxyz]+$',
                },
              },
              type: 'object',
            },
            width: {
              description:
                'width is a data type which holds readings of swath width, or other widths of things.',
              properties: {
                units: {
                  type: 'string',
                  examples: ['ft', 'feet', 'm', 'meters'],
                },
              },
              type: 'object',
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
            template: {
              description:
                'template sits inside a data point and gives the name of a template (key in the templates object) which serves as prototype for a given data point.  The full data point is the merge of that template object with the data point, with the data point taking precedence in key collisions. This is a string because its value is the key in templates, not the template itself.',
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
            weight: {
              description:
                'weight is a data type which holds a reading of weight, as in bushels, lbs, or kg.',
              properties: {
                units: {
                  type: 'string',
                  examples: ['bu', 'bushels', 'lbs', 'kg'],
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
            location: {
              description:
                'location represents a point in space, usually a GPS coordinate or geohash',
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
                latitude: {
                  description: 'latitude is a string in the format of a number',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                longitude: {
                  description:
                    'longitude is a string in the format of a number',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                altitude: {
                  description: 'altitude is a string in the format of a number',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                lat: {
                  description: 'lat is shorthand for latitude',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                lon: {
                  description: 'lon is shorthand for longitude',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                alt: {
                  description: 'alt is shorthand for altitude',
                  type: 'string',
                  pattern: '^-?([0-9]*[.])[0-9]+',
                },
                geohash: {
                  description:
                    'A geohash is a base 32 encoded string which represents the combination of latitude and longitude into a single number which, in general, has a property such that points close in number are close on the globe.',
                  type: 'string',
                  pattern: '^[0-9bcdefghjkmnpqrstuvwxyz]+$',
                },
              },
              type: 'object',
            },
            width: {
              description:
                'width is a data type which holds readings of swath width, or other widths of things.',
              properties: {
                units: {
                  type: 'string',
                  examples: ['ft', 'feet', 'm', 'meters'],
                },
              },
              type: 'object',
            },
          },
          required: ['area', 'weight', 'moisture', 'location'],
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
      enum: ['application/vnd.oada.as-harvested.yield-moisture-dataset.1+json'],
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
      _id: 'ifjo2ifkl23',
      _rev: 2,
      _type: 'application/vnd.oada.as-harvested.yield-moisture-dataset.1+json',
      indexing: [
        {
          index: 'year-index',
          value: '2018',
          source: 'oada.vocab.year-index',
        },
        {
          index: 'crop-index',
          value: 'corn',
          source: 'oada.vocab.crop-type',
        },
        {
          index: 'geohash-length-index',
          source: 'oada.vocab.geohash-length-index',
          value: 'geohash-7',
        },
        {
          index: 'geohash-index',
          value: '9j9j12f',
          source: 'oada.vocab.geohash-index',
        },
      ],
      templates: {
        k20ifkj: {
          time: {
            units: 'unix-timestamp',
          },
          area: {
            units: 'acres',
          },
          weight: {
            units: 'bushels',
          },
          moisture: {
            units: '%H2O',
          },
          location: {
            datum: 'WGS84',
          },
        },
      },
      data: {
        'kdjf02ijk3f': {
          id: '902jfl3jo2kf2l3f',
          template: 'k20ifkj',
          time: {
            value: 192_847_322.145_21,
          },
          area: {
            value: 1.1,
          },
          weight: {
            value: 2.5,
          },
          moisture: {
            value: 28.79,
          },
          location: {
            latitude: '-41.9384932',
            longitude: '80.9284923',
            altitude: '200.49583',
          },
        },
        '0f2jflk2j3l': {
          id: 'llll23jf02i2o3ffdsf',
          template: 'k20ifkj',
          time: {
            value: 192_847_323.783_21,
          },
          area: {
            value: '0.9',
          },
          weight: {
            value: '2.3',
          },
          moisture: {
            value: 23.81,
          },
          location: {
            latitude: '-41.9384931',
            longitude: '80.9284921',
            altitude: '200.49581',
          },
        },
      },
    },
  ],
};
export default schema;
