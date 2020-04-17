import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/isoblue/v1.schema.json',
  description:
    'The ISOBlue document holds links to data related to (often collected by) the ISOBlue device',
  properties: {
    can: {
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
    heartbeat: {
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
    location: {
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
      enum: ['application/vnd.oada.isoblue.1+json']
    }
  },
  additionalProperties: true,
  required: ['_type'],
  examples: [
    {
      _type: 'application/vnd.oada.isoblue.1+json',
      can: {
        _id: 'kfj20ikejldss'
      },
      heartbeat: {
        _id: '92jfkjfe0fdi'
      },
      location: {
        _id: '92jfkjfe0fdi'
      }
    }
  ]
}
export default schema
