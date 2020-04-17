import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/as-harvested/v1.schema.json',
  description:
    'The "as-harvested" key holds the original data logged during harvest.  This can be collections of time-series harvest data or data that is already geospatially referenced.  A typical "yield map" exported from an FMIS system would go here.  Think of this like the "raw" data that is used to generate tiled maps.',
  properties: {
    'yield-moisture-dataset': {
      description:
        'A link in OADA has at least an _id key and links one resource to another.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string'
        }
      },
      required: ['_id']
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
      required: ['_id', '_rev']
    },
    _type: {
      enum: ['application/vnd.oada.as-harvested.1+json']
    }
  },
  additionalProperties: true,
  required: ['_type'],
  examples: [
    {
      _id: 'resources/kfj20ikejldss',
      _rev: 9,
      _type: 'application/vnd.oada.as-harvested.1+json',
      'yield-moisture-dataset': {
        _id: 'resources/02ijfkl3k20ij3fsf'
      }
    }
  ]
}
export default schema
