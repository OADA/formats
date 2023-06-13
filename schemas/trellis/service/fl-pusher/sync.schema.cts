/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema = {
  $id: 'https://formats.openag.io/trellis/service/fl-pusher/sync.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Extension of @oada/job format for fl-pusher',
  type: 'object',
  allOf: [{ $ref: '../../../oada/service/job.schema.json' }],
  properties: {
    service: {
      description: 'Service Name',
      const: 'fl-pusher',
    },
    type: {
      description: 'Foodlogiq Synchronization Job',
      const: 'sync',
    },
    config: {
      description: 'Job specific configuration object',
      // TODO
      type: 'object',
      required: ['resourceId', 'businessId'],
      properties: {
        resourceId: {
          description: 'id for virtualized pdf',
          type: 'string',
        },
        businessId: {
          description: 'The foodlogiq business ID where the document is stored',
          type: 'string',
        },
        communityIds: {
          description:
            'The foodlogiq community IDs the document is to be shared with',
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
    result: {
      description: 'Final result of job',
    },
  },

  examples: [
    {
      _id: 'resources/123',
      _type: 'application/vnd.trellis.service.job.1+json',
      _meta: {
        _id: 'resources/123/_meta',
        _rev: 3,
      },
      _rev: 3,
      service: 'fl-pusher',
      type: 'sync',
      config: {
        resourceId: 'resources/oivnoseklnvaoeij329814ng',
        businessId: '123456789012345678901234',
        communityIds: [
          '223456789012345678901234',
          '323456789012345678901234',
          '423456789012345678901234',
        ],
      },
      status: 'pending',
      updates: {
        aoihngklsdmfjoavin2398havj: {
          status: 'started',
          time: '2019-10-20T20:07:21+00:00',
          information: 'started',
        },
      },
    },
  ],
} as const satisfies Schema;

export = schema;
