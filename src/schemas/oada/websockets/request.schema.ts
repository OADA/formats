import { JSONSchema8 as Schema } from 'jsonschema8'

export default {
  $id: 'https://formats.openag.io/oada/websockets/request.schema.json',
  description:
    'This is the format of an OADA websocket request (client to server)',
  definitions: {
    id: {
      type: 'string'
    }
  },
  type: 'object',
  required: ['requestId', 'path', 'method', 'headers'],
  properties: {
    requestId: { $ref: '#/definitions/id' },
    path: { $ref: '../../oada.schema.json#/definitions/path' },
    method: {
      anyOf: [
        { $ref: '../../oada.schema.json#/definitions/method' },
        { enum: ['watch', 'unwatch'] }
      ]
    },
    headers: {
      type: 'object',
      required: ['authorization'],
      properties: { authorization: { type: 'string' } }
    },
    data: {
      description: 'The optional data payload of the request'
    }
  }
} as Schema
