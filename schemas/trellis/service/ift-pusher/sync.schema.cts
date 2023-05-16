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
  $id: 'https://formats.openag.io/trellis/service/ift-pusher/sync.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  /* TODO: Put your JSON Schema here */
  description: 'Extension of @oada/job format for ift-pusher',
  type: 'object',
  allOf: [{ $ref: '../../../oada/service/job.schema.json' }],
  properties: {
    service: {
      description: 'Service Name',
      const: 'ift-pusher',
    },
    type: {
      description: 'IFT Synchronization Job',
      const: 'sync',
    },
    config: {
      description: 'Job specific configuration object',
      type: 'object',
      required: ['resourceId'],
      properties: {
        resourceId: {
          description: 'id for virtualized pdf',
          type: 'string',
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
      service: 'ift-pusher',
      type: 'sync',
      config: {
        resourceId: 'resources/oivnoseklnvaoeij329814ng',
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
