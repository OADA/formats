"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: 'https://formats.openag.io/oada/websockets/request.schema.json',
    description: 'This is the format of an OADA websocket request (client to server)',
    type: 'object',
    required: ['requestId', 'path', 'method', 'headers'],
    properties: {
        requestId: { type: 'string' },
        path: { type: 'string' },
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
        }
    }
};
//# sourceMappingURL=request.js.map