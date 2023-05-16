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
  $id: 'https://formats.openag.io/oada/well-known/oada-configuration/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'application/vnd.oada.well-known.oada-configuration.1+json',
  required: [
    'oada_base_uri',
    'authorization_endpoint',
    'token_endpoint',
    'registration_endpoint',
    'token_endpoint_auth_signing_alg_values_supported',
  ],
  additionalProperties: true,
  properties: {
    oada_base_uri: {
      type: 'string',
      pattern: '^https://.*',
    },
    authorization_endpoint: {
      type: 'string',
      pattern: '^https://.*',
    },
    token_endpoint: {
      type: 'string',
      pattern: '^https://.*',
    },
    registration_endpoint: {
      type: 'string',
      pattern: '^https://.*',
    },
    token_endpoint_auth_signing_alg_values_supported: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
  },
  examples: [
    {
      well_known_version: '1.0.0',
      oada_base_uri: 'https://oada.example.com',
      authorization_endpoint: 'https://oada.example.com/auth',
      token_endpoint: 'https://oada.example.com/token',
      registration_endpoint: 'https://oada.example.com/register',
      token_endpoint_auth_signing_alg_values_supported: ['RS256'],
      scopes_supported: [
        {
          'name': 'oada.all.1',
          'read+write': true,
        },
      ],
    },
  ],
} as const satisfies Schema;

export = schema;
