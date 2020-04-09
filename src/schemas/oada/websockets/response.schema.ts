import { JSONSchema8 as Schema } from 'jsonschema8'

export default {
  $id: 'https://formats.openag.io/oada/websockets/response.schema.json',
  description:
    'This is the format of an OADA websocket response (server to client)',
  definitions: {
    id: {
      $ref: 'request.schema.json#/properties/requestId'
    }
  },
  type: 'object',
  required: ['requestId', 'status'],
  properties: {
    requestId: {
      description:
        'Array of request IDs to which this response pertains. A single string is supported only for legacy purposes.',
      anyOf: [
        {
          type: 'array',
          minItems: 1,
          items: {
            $ref: '#/definitions/id'
          }
        },
        { $ref: '#/definitions/id' }
      ]
    },
    status: {
      $comment: 'Not sure why sometimes this is a string...',
      anyOf: [{ enum: ['success'] }, { type: 'integer' }]
    },
    statusText: { type: 'string' },
    headers: {
      type: 'object'
    },
    resourceId: {
      $ref: '../../oada.schema.json#/definitions/_id'
    },
    resource: {
      $comment: 'Not sure if this is always actually a resource...'
    },
    data: {
      description: 'The optional data payload of the request'
    }
  }
} as Schema
