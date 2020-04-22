import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/bookmarks/v1.schema.json',
  description: 'bookmarks is the top-level document returned by the OADA API',
  properties: {
    trellisfw: {
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
      required: ['_id', '_rev'],
      type: 'object'
    },
    planting: {
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
      required: ['_id', '_rev'],
      type: 'object'
    },
    harvest: {
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
      required: ['_id', '_rev'],
      type: 'object'
    },
    machines: {
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
      required: ['_id', '_rev'],
      type: 'object'
    },
    irrigation: {
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
      required: ['_id', '_rev'],
      type: 'object'
    },
    sensors: {
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
      required: ['_id', '_rev'],
      type: 'object'
    },
    fields: {
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
      required: ['_id', '_rev'],
      type: 'object'
    },
    clients: {
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
      required: ['_id', '_rev'],
      type: 'object'
    },
    'sensor-hubs': {
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
      required: ['_id', '_rev'],
      type: 'object'
    },
    isoblue: {
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
      enum: ['application/vnd.oada.bookmarks.1+json']
    }
  },
  additionalProperties: true,
  required: ['_type'],
  type: 'object',
  examples: [
    {
      _type: 'application/vnd.oada.bookmarks.1_json',
      context: {},
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
      },
      'sensor-hubs': {
        _id: 'xks84x8s',
        _rev: '1-Rjsuf73fs8d'
      }
    }
  ]
}
export default schema
