import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id:
    'https://formats.openag.io/oada/well-known/oada-configuration/v1.schema.json',
  description: 'application/vnd.oada.well-known.oada-configuration.1+json',
  required: [
    'oada_base_uri',
    'authorization_endpoint',
    'token_endpoint',
    'registration_endpoint',
    'token_endpoint_auth_signing_alg_values_supported'
  ],
  additionalProperties: true,
  properties: {
    oada_base_uri: {
      type: 'string',
      pattern: '^https://.*'
    },
    authorization_endpoint: {
      type: 'string',
      pattern: '^https://.*'
    },
    token_endpoint: {
      type: 'string',
      pattern: '^https://.*'
    },
    registration_endpoint: {
      type: 'string',
      pattern: '^https://.*'
    },
    token_endpoint_auth_signing_alg_values_supported: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string'
      }
    }
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
          name: 'oada.all.1',
          'read+write': true
        }
      ]
    }
  ]
}

export default schema
