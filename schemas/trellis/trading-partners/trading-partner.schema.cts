/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/trading-partner.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Trading Partners config format within Trellis',
  type: 'object',
  properties: {
    // External ID in a master data system
    sapid: {
      type: 'string',
    },
    // Internal ID in Trellis; Should be a resource id e.g. 'resources/123'
    masterid: {
      type: 'string',
    },
    // Some other master data system attributes
    companycode: {
      type: 'string',
    },
    vendorid: {
      type: 'string',
    },
    partnerid: {
      type: 'string',
    },
    // Details of the trading-partner
    name: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    // The though here was to specify 'customer'/'supplier' for type
    type: {
      type: 'string',
    },
    // Source that first created this master data entry in trellis
    source: {
      type: 'string',
    },
    // Some contact info
    coi_emails: {
      type: 'string',
    },
    fsqa_emails: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
  },
  required: ['sapid', 'masterid', 'name'],
  examples: [
    {
      sapid: '1234567890',
      masterid: '1234567890',
      companycode: '1234567890',
      vendorid: '1234567890',
      partnerid: '1234567890',
      name: 'Tyson Foods',
      address: '2550 Yeager Road',
      city: 'West Lafayette',
      state: 'Indiana',
      type: 'customer',
      source: 'business',
      coi_emails: 'example@example.com',
      fsqa_emails: 'example@example.com',
      email: 'example@example.com',
      phone: '111-222-3333',
    },
  ],
};

export = schema;
