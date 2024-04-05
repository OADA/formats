/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

import { ianaAssignments, properties } from '@oada/schemas/utils';

const uris = await ianaAssignments('oauth-parameters', 'uri');
const metadata = await ianaAssignments('oauth-parameters', 'client-metadata');

const registeredUris = await uris.map(({ value, description, reference }) => ({
  title: value,
  description: `${description}\n@see {@link ${reference}}` as const,
  const: value,
}));

/**
 * Dynamically generated sub schema with registered client metadata definitions
 */
const registered = {
  $id: '#/definitions/registered',
  title: 'Registered client metadata',
  description: `IANA registered values for client metadata\n@see {@link ${metadata.uri}}`,
  $comment: `Definitions retrieved dynamically from ${
    metadata.uri
  } on ${new Date()}`,
  definitions: Object.fromEntries(
    await metadata.map(
      ({ value, description, reference }) =>
        [
          value,
          {
            // Title: value,
            description: `${description}\n@see {@link ${reference}}`,
          },
        ] as const,
    ),
  ),
} as const satisfies Schema;

export default {
  $id: 'https://formats.openag.io/oauth-dyn-reg/metadata.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'application/vnd.oada.oauth-dny-reg.register-response.1+json',
  description:
    '@see {@link https://datatracker.ietf.org/doc/html/rfc7591#section-2 Client Metadata}',
  definitions: {
    extension_grant_uri: {
      $comment: `Enum retrieved dynamically from ${uris.uri} on ${new Date()}`,
      description: 'Grant type extension URIs',
      oneOf: registeredUris.filter(({ const: v }) =>
        v.includes(':grant-type:'),
      ),
    },
    extension_client_assertion_uri: {
      $comment: `Enum retrieved dynamically from ${uris.uri} on ${new Date()}`,
      description: 'Grant type URI extension strings',
      oneOf: registeredUris.filter(({ const: v }) =>
        v.includes(':client-assertion-type:'),
      ),
    },
    jws_alg: {
      $comment: 'TODO: need to update this to use the new jws schema',
      $ref: 'https://formats.openag.io/jose/jwa.schema.json#/definitions/alg',
    },
    jwe_alg: {
      $comment: 'TODO: need to update this to use the new jwe schema',
      $ref: 'https://formats.openag.io/jose/jwa.schema.json#/definitions/alg',
    },
    jwe_enc: {
      $comment: 'TODO: need to update this to use the new jwe schema',
      type: 'string',
    },
  },
  ...properties(registered.definitions, {
    redirect_uris: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
        format: 'uri',
      },
    },
    token_endpoint_auth_method: {
      type: 'string',
      oneOf: [
        {
          const: 'none',
          description:
            'The client is a public client as defined in OAuth 2.0, Section 2.1, and does not have a client secret',
        },
        {
          const: 'client_secret_post',
          description:
            'The client uses the HTTP POST parameters as defined in OAuth 2.0, Section 2.3.1',
        },
        {
          const: 'client_secret_basic',
          description:
            'The client uses HTTP Basic as defined in OAuth 2.0, Section 2.3.1',
        },
        { $ref: '#/definitions/extension_client_assertion_uri' },
      ],
    },
    grant_types: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
        oneOf: [
          {
            const: 'authorization_code',
            description:
              'The authorization code grant type defined in OAuth 2.0, Section 4.1',
          },
          {
            const: 'implicit',
            description:
              'The implicit grant type defined in OAuth 2.0, Section 4.2',
          },
          {
            const: 'password',
            description:
              'The resource owner password credentials grant type defined in OAuth 2.0, Section 4.3',
          },
          {
            const: 'client_credentials',
            description:
              'The client credentials grant type in OAuth 2.0, Section 4.4',
          },
          {
            const: 'refresh_token',
            description:
              'The resource owner password credentials grant type defined in OAuth 2.0, Section 6',
          },
          { $ref: '#/definitions/extension_grant_uri' },
        ],
      },
    },
    response_types: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
      },
      default: ['code'],
    },
    client_name: {
      type: 'string',
    },
    client_uri: {
      type: 'string',
      format: 'uri',
    },
    logo_uri: {
      type: 'string',
      format: 'uri',
    },
    scope: {
      type: 'string',
    },
    contacts: {
      type: 'array',
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
    jwks_uri: {
      type: 'string',
      format: 'uri',
    },
    jwks: {
      $ref: 'https://formats.openag.io/jose/jwk.schema.json#/definitions/jwks',
    },
    software_id: {
      type: 'string',
    },
    software_version: {
      type: 'string',
    },
    software_statement: {
      type: 'string',
      description:
        'Signed JWT asserting client metadata values\n@see {@link https://datatracker.ietf.org/doc/html/rfc7591#section-2.3 Software Statement}',
    },
    client_id: {
      type: 'string',
    },
    client_secret: {
      type: 'string',
    },
    client_id_issued_at: {
      type: 'number',
    },
    client_secret_expires_at: {
      type: 'number',
    },
    application_type: {
      type: 'string',
      enum: ['web', 'native'],
      default: 'web',
    },
    sector_identifier_uri: {
      type: 'string',
      format: 'uri',
      pattern: /^https:/.source,
    },
    subject_type: {
      enum: ['public', 'pairwise'],
    },
    id_token_signed_response_alg: {
      $ref: '#/definitions/jws_alg',
    },
    id_token_encrypted_response_alg: {
      $ref: '#/definitions/jwe_alg',
    },
    id_token_encrypted_response_enc: {
      $ref: '#/definitions/jwe_enc',
    },
    userinfo_signed_response_alg: {
      $ref: '#/definitions/jws_alg',
    },
    userinfo_encrypted_response_alg: {
      $ref: '#/definitions/jwe_alg',
    },
    userinfo_encrypted_response_enc: {
      $ref: '#/definitions/jwe_enc',
    },
    request_object_signing_alg: {
      $ref: '#/definitions/jws_alg',
    },
    request_object_encryption_alg: {
      $ref: '#/definitions/jwe_alg',
    },
    request_object_encryption_enc: {
      $ref: '#/definitions/jwe_enc',
    },
    token_endpoint_auth_signing_alg: {
      $ref: '#/definitions/jws_alg',
    },
    default_max_age: {
      type: 'number',
    },
    require_auth_time: {
      type: 'boolean',
    },
    default_acr_values: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
    initiate_login_uri: {
      type: 'string',
      format: 'uri',
      pattern: /^https:/.source,
    },
    request_uris: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
        format: 'uri',
      },
    },
    claims_redirect_uris: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
        format: 'uri',
      },
    },
    nfv_token_signed_response_alg: {
      $ref: '#/definitions/jws_alg',
    },
    nfv_token_encrypted_response_alg: {
      $ref: '#/definitions/jwe_alg',
    },
    nfv_token_encrypted_response_enc: {
      $ref: '#/definitions/jwe_enc',
    },
    tls_client_certificate_bound_access_tokens: {
      type: 'boolean',
      default: false,
    },
    tls_client_auth_subject_dn: {
      type: 'string',
    },
    tls_client_auth_san_dns: {
      type: 'string',
    },
    tls_client_auth_san_uri: {
      type: 'string',
      format: 'uri',
    },
    tls_client_auth_san_ip: {
      type: 'string',
      oneOf: [{ format: 'ipv4' }, { format: 'ipv6' }],
    },
    tls_client_auth_san_email: {
      type: 'string',
      format: 'email',
    },
    require_signed_request_object: {
      type: 'boolean',
      default: false,
    },
    require_pushed_authorization_requests: {
      type: 'boolean',
      default: false,
    },
    introspection_signed_response_alg: {
      $ref: '#/definitions/jws_alg',
    },
    introspection_encrypted_response_alg: {
      $ref: '#/definitions/jwe_alg',
    },
    introspection_encrypted_response_enc: {
      $ref: '#/definitions/jwe_enc',
    },
    frontchannel_logout_uri: {
      type: 'string',
      format: 'uri',
    },
    frontchannel_logout_session_required: {
      type: 'boolean',
      default: false,
    },
    backchannel_logout_uri: {
      type: 'string',
      format: 'uri',
    },
    backchannel_logout_session_required: {
      type: 'boolean',
      default: false,
    },
    post_logout_redirect_uris: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
        format: 'uri',
      },
    },
    authorization_details_types: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
    dpop_bound_access_tokens: {
      type: 'boolean',
      default: false,
    },
  }),
  type: 'object',
  examples: [
    {
      client_id: '3klaxu838akahf38acucaix73',
      client_id_issued_at: 1_418_423_102,
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
} as const satisfies Schema;
