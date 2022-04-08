/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/service/master-data-sync/tradingpartners.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Trading Partners config format for master-data-sync',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    sapid: {
      type: 'string',
    },
    masterid: {
      type: 'string',
    },
    internalid: {
      type: 'string',
    },
    companycode: {
      type: 'string',
    },
    vendorid: {
      type: 'string',
    },
    partnerid: {
      type: 'string',
    },
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
    type: {
      type: 'string',
    },
    source: {
      type: 'string',
    },
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
  required: [
    'sapid',
    'masterid',
    'internalid',
    'name',
    'address',
    'city',
    'state',
    'type',
    'source',
    'email',
    'phone',
  ],
  examples: [
    {
      id: '1234567890',
      sapid: '1234567890',
      masterid: '1234567890',
      internalid: '1234567890',
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

export default schema;
