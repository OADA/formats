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
  $id: 'https://formats.openag.io/oada/harvest/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'A harvest document holds links to information related to harvest activites or data.',
  properties: {
    'as-harvested': {
      description:
        'A versioned link in OADA has _id an _rev in the link in order allow changes to bubble up from child to parents.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string',
        },
        _rev: {
          description:
            '_rev is the revision string for a resource in the OADA API.',
          type: 'integer',
        },
      },
      required: ['_id', '_rev'],
      type: 'object',
    },
    'tiled-maps': {
      description:
        'A versioned link in OADA has _id an _rev in the link in order allow changes to bubble up from child to parents.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string',
        },
        _rev: {
          description:
            '_rev is the revision string for a resource in the OADA API.',
          type: 'integer',
        },
      },
      required: ['_id', '_rev'],
      type: 'object',
    },
    '_id': {
      description: '_id identifies a resource in the OADA API.',
      type: 'string',
    },
    '_rev': {
      description:
        '_rev is the revision string for a resource in the OADA API.',
      type: 'integer',
    },
    '_meta': {
      description: '_meta is a link to the meta document for a resources.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string',
        },
        _rev: {
          description:
            '_rev is the revision string for a resource in the OADA API.',
          type: 'integer',
        },
      },
      required: ['_id', '_rev'],
      type: 'object',
    },
    '_type': {
      enum: ['application/vnd.oada.harvest.1+json'],
    },
  },
  additionalProperties: true,
  required: ['_type'],
  type: 'object',
  examples: [
    {
      '_id': 'resources/90fijklf3',
      '_rev': 7,
      '_type': 'application/vnd.oada.harvest.1+json',
      'context': {},
      'as-harvested': {
        _id: 'resources/resources/kfj20ikejldss',
        _rev: 9,
      },
      'tiled-maps': {
        _id: 'resources/92jfkjfe0fdi',
        _rev: 8,
      },
    },
  ],
} as const satisfies Schema;
export = schema;
