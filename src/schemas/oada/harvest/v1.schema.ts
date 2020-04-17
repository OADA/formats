import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/harvest/v1.schema.json',
  description:
    'A harvest document holds links to information related to harvest activites or data.',
  properties: {
    'as-harvested': {
      description:
        'A versioned link in OADA has _id an _rev in the link in order allow changes to bubble up from child to parents.',
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
    'tiled-maps': {
      description:
        'A versioned link in OADA has _id an _rev in the link in order allow changes to bubble up from child to parents.',
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
      enum: ['application/vnd.oada.harvest.1+json']
    }
  },
  additionalProperties: true,
  required: ['_type'],
  examples: [
    {
      _id: '290fijklf3',
      _rev: '7-9ijkljf0j2ifkl3f',
      _type: 'application/vnd.oada.harvest.1+json',
      context: {},
      'as-harvested': {
        _id: 'kfj20ikejldss',
        _rev: '9-kfjo2i3jfelkfas',
        _type: 'application/vnd.oada.as-harvested.1+json'
      },
      'tiled-maps': {
        _id: '92jfkjfe0fdi',
        _rev: '8-92fjkflkj492',
        _type: 'application/vnd.oada.tiled-maps.1+json'
      }
    }
  ]
}
export default schema
