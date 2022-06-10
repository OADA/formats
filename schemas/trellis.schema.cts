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
  $id: 'https://formats.openag.io/trellis.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    location: {
      description:
        'location describes the postal address used to identify where         something is.',
      properties: {
        street_address: {
          $ref: '#/definitions/street_address',
        },
        postal_code: {
          $ref: '#/definitions/postal_code',
        },
        city: {
          $ref: '#/definitions/city',
        },
        state: {
          $ref: '#/definitions/state',
        },
        country: {
          $ref: '#/definitions/country',
        },
      },
    },
    street_address: {
      description: 'The street name and mailbox number of a postal address.',
      type: 'string',
    },
    postal_code: {
      description: 'postal_code is the postal code used in a postal address',
      type: 'string',
    },
    city: {
      description: 'The name of the city, usually in a postal address.',
      type: 'string',
    },
    state: {
      description:
        'The name of the state or major region, usually in a postal address.',
      type: 'string',
    },
    country: {
      description: 'The name of the country, usually in a postal address.',
      type: 'string',
    },
    phone: {
      description:
        'phone describes the phone number with country code and area         code.',
      type: 'string',
    },
  },
};

export = schema;
