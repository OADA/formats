import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/tiled-maps/v1.schema.json',
  description:
    'tiled-maps is used for visualization and statistical calculations, and just generally for making arbitrary geospatial queries. A tiled map is generated from the as-harvested source data which is  turned into a set of data tiles at various zoom levels.  A mobile device or other map-based viewer can request documents with data combined to whatever zoom level it needs.  In addition, each tile in the map contains statistical computations for all the underlying data represented at that zoom level.  This means that if you want to take an average of an area that completely contains a particular tile, you only need to  get the stats for that tile, rather than iterating over the underlying data. In reality, the value for a given "pixel" in a tile is just the stats object of the much smaller geohash that sits on that pixel.',
  properties: {
    'dry-yield-map': {
      description:
        'A link in OADA has at least an _id key and links one resource to another.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string'
        }
      },
      required: ['_id'],
      type: 'object'
    },
    'moisture-map': {
      description:
        'A link in OADA has at least an _id key and links one resource to another.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string'
        }
      },
      required: ['_id'],
      type: 'object'
    },
    _id: {
      description: '_id identifies a resource in the OADA API.',
      type: 'string'
    },
    _rev: {
      description:
        '_rev is the revision string for a resource in the OADA API.',
      type: 'integer'
    },
    _meta: {
      description: '_meta is a link to the meta document for a resources.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string'
        },
        _rev: {
          description:
            '_rev is the revision string for a resource in the OADA API.',
          type: 'integer'
        }
      },
      required: ['_id', '_rev'],
      type: 'object'
    },
    _type: {
      enum: ['application/vnd.oada.as-harvested.tiled-maps.1+json']
    }
  },
  additionalProperties: true,
  required: ['_type'],
  type: 'object',
  examples: [
    {
      _id: 'resources/029jfilwkjfo2i3ledkf',
      _rev: 5,
      _type: 'application/vnd.oada.tiled-maps.1+json',
      'dry-yield-map': {
        _id: 'resources/k2fjo23lf3'
      },
      'moisture-map': {
        _id: 'resources/k2fjo23lf3'
      }
    }
  ]
}
export default schema
