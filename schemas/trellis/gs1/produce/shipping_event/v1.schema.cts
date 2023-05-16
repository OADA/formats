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
  $id: 'https://formats.openag.io/trellis/gs1/produce/shipping_event/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'GS1 receiving event has certain required fields and and array element',
  properties: {
    originator: {
      description: 'gln of the data originator and the data owner',
      type: 'string',
    },
    trading_partner: {
      description: 'gln of the trading partner',
      type: 'string',
    },
    activity_type: {
      description: 'defines the business process that taking place',
      type: 'string',
      examples: ['purchase_order', 'production_work_order', 'bill_of_landing'],
    },
    originator_type: {
      description: 'trading_partner_type of the originating trading partner',
      type: 'string',
      examples: [
        'grower',
        'supplier',
        'manufacturer',
        'processor',
        'distributor',
        'retailor',
      ],
    },
    receiver_type: {
      description: 'trading_partner_type of the receiving trading partner',
      type: 'string',
      examples: [
        'grower',
        'supplier',
        'manufacturer',
        'processor',
        'distributor',
        'retailor',
      ],
    },
    timestamp: {
      description: 'defines the timestamp of the data capture',
      type: 'string',
    },
    activity_no: {
      description:
        'defines a unique identifer to implicate the transaction id of the business event - purchase order id etc',
      type: 'string',
    },
    contents_of_shipment: {
      description: 'all shipping trading items',
      type: 'array',
      items: {
        description: 'item is sold/shipped by one trading partner to the other',
      },
    },
    _id: {
      description: '_id identifies a resource in the OADA API.',
      type: 'string',
    },
    _rev: {
      description:
        '_rev is the revision string for a resource in the OADA API.',
      type: 'integer',
    },
    _meta: {
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
    _type: {
      enum: ['application/trellis.vnd.gs1.produce.shipping_event.1+json'],
    },
  },
  additionalProperties: true,
  required: ['_type'],
  type: 'object',
  examples: [],
} as const satisfies Schema;
export = schema;
