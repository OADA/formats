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
  $id: 'https://formats.openag.io/oada/service/job/update.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'A list of updates as job progresses. Keys shall be sorted in time order.',
  type: 'object',
  properties: {
    status: {
      description: 'Status of job at the time of update',
      type: 'string',
    },
    time: {
      description: 'ISO8601 UTC date-time of update time',
      type: 'string',
    },
    meta: {
      description: 'Additional meta data about the status update',
    },
  },
  required: ['status', 'time'],
  examples: [
    {
      status: 'started',
      time: '2018-11-14T20:20:39+00:00',
      meta: {
        example: 'data',
      },
    },
  ],
} as const satisfies Schema;

export = schema;
