import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada.schema.json',
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  definitions: {
    link: {
      $anchor: 'link',
      definitions: {
        versioned: {
          $anchor: 'versioned',
          type: 'object',
          required: ['_rev'],
          properties: {
            _rev: {
              $ref: '#/definitions/_rev'
            },
            _id: {
              $ref: '#/definitions/_id'
            },
            _type: {
              $ref: '#/definitions/_type'
            }
          },
          additionalProperties: false
        },
        unversioned: {
          $anchor: 'unversioned',
          type: 'object',
          required: ['_id'],
          properties: {
            _id: {
              $ref: '#/definitions/_id'
            },
            _type: {
              $ref: '#/definitions/_type'
            }
          },
          additionalProperties: false
        }
      },
      anyOf: [
        {
          $ref: '#/definitions/link/definitions/versioned'
        },
        {
          $ref: '#/definitions/link/definitions/unversioned'
        }
      ]
    },
    _meta: {
      $comment: '_meta is a versioned link',
      description: '_meta is a link to the meta document for a resources.',
      $ref: '#/definitions/link/definitions/versioned'
    },
    _id: {
      description: '_id identifies a resource in the OADA API.',
      type: 'string',
      pattern: '^resources/.*$'
    },
    _type: {
      description:
        '_type identifies the content-type of a resource in the OADA API and             is required for all OADA-defined formats.  It usually looks like            application/vnd.oada.something.1+json.',
      type: 'string'
    },
    _rev: {
      description: '_rev is the revision for a resource in the OADA API.',
      type: 'integer'
    },
    method: {
      description: 'The request methods (a la HTTP) supported by OADA',
      enum: ['head', 'get', 'put', 'post', 'delete']
    },
    path: {
      description: 'The represenation of a path within an OADA server',
      type: 'string',
      format: 'uri-reference'
    }
  }
}

export default schema
