import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id:
    'https://formats.openag.io/oada/oauth-dyn-reg/register-response/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'application/vnd.oada.oauth-dny-reg.register-response.1+json',
  required: [
    'client_id',
    'client_id_issued_at',
    'scopes',
    'redirect_uris',
    'token_endpoint_auth_method',
    'grant_types',
    'response_types',
    'tos_uri',
    'policy_uri',
    'software_id',
  ],
  additionalProperties: true,
  properties: {
    client_id: {
      type: 'string',
    },
    client_id_issued_at: {
      type: 'number',
    },
    scopes: {
      type: 'string',
    },
    redirect_uris: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
        pattern: '^https://.*',
      },
    },
    token_endpoint_auth_method: {
      type: 'string',
    },
    grant_types: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
    response_types: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
    tos_uri: {
      type: 'string',
      format: 'uri',
    },
    policy_uri: {
      type: 'string',
      format: 'uri',
    },
    software_id: {
      type: 'string',
    },
  },
  type: 'object',
  examples: [
    {
      client_id: '3klaxu838akahf38acucaix73',
      client_id_issued_at: 1418423102,
      software_version: '1.0-ga',
      scopes: 'read:planting.prescriptions write:fields',
      redirect_uris: [
        'https://client.example.com/callback',
        'https://client.example.com/cb',
      ],
      token_endpoint_auth_method:
        'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      grant_types: ['implicit', 'authorization_code', 'refresh_token'],
      response_types: ['token', 'code'],
      client_name: 'Example OADA Client',
      client_uri: 'http://example.com',
      logo_uri: 'http://example.com/logo.png',
      contacts: ['Clint Client <cclient@example.com>'],
      tos_uri: 'http://example.com/tos.html',
      policy_uri: 'http://example.com/policy.html',
      software_id: 'djxkjau3n937xz7jakl3',
      registration_provider: 'registration.example.com',
    },
  ],
};
export default schema;
