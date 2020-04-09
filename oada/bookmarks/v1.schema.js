"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: 'https://formats.openag.io/oada/bookmarks/v1.schema.json',
    description: 'application/vnd.oada.bookmarks.1+json',
    additionalProperties: true,
    properties: {
        planting: {
            $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned'
        },
        harvest: {
            $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned'
        },
        machines: {
            $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned'
        },
        irrigation: {
            $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned'
        },
        sensors: {
            $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned'
        },
        fields: {
            $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned'
        },
        sales: {
            $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned'
        },
        clients: {
            $ref: 'https://formats.openag.io/oada/link/v1.schema.json#/definitions/versioned'
        }
    },
    examples: [
        {
            planting: {
                _id: '09ijfofj',
                _rev: '2-djfh92843hj'
            },
            harvest: {
                _id: '908uf2jh',
                _rev: '33-kdfj092jle'
            },
            machines: {
                _id: '0kdfj20j',
                _rev: '8-kdjs90fj2oi'
            },
            irrigation: {
                _id: '0jk2iopw',
                _rev: '4-d98ohf29efk'
            },
            sales: {
                _id: '0kdfj20j',
                _rev: '99-kdjf92lsdf'
            },
            sensors: {
                _id: 'kd02ufjk',
                _rev: '3-kdsfjoiwefj'
            },
            fields: {
                _id: '0kdfj2jl',
                _rev: '7-kk0all2oald'
            },
            clients: {
                _id: '9sdkf2lk',
                _rev: '4-lfdu029kjds'
            }
        }
    ]
};
//# sourceMappingURL=v1.schema.js.map