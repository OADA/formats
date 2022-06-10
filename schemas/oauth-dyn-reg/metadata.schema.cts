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
  $id: 'https://formats.openag.io/oauth-dyn-reg/metadata.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'application/vnd.oada.oauth-dny-reg.register-response.1+json',
  description:
    '@see {@link https://datatracker.ietf.org/doc/html/rfc7591#section-2 Client Metadata}',
  properties: {
    client_id: {
      type: 'string',
    },
    client_id_issued_at: {
      type: 'number',
    },
    redirect_uris: {
      type: 'array',
      description:
        'Array of redirection URI strings for use in redirect-based flows such as the authorization code and implicit flows. As required by Section 2 of OAuth 2.0 [RFC6749], clients using flows with redirection MUST register their redirection URI values. Authorization servers that support dynamic registration for redirect-based flows MUST implement support for this metadata value.',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
        format: 'uri',
      },
    },
    token_endpoint_auth_method: {
      type: 'string',
      description:
        'String indicator of the requested authentication method for the token endpoint',
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
        {
          const: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          description: 'The client uses a JWT bearer',
        },
      ],
    },
    grant_types: {
      type: 'array',
      description:
        'Array of OAuth 2.0 grant type strings that the client can use at the token endpoint',
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
          {
            const: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            description:
              'The JWT Bearer Token Grant Type defined in OAuth JWT Bearer Token Profiles [RFC7523]',
          },
          {
            const: 'urn:ietf:params:oauth:grant-type:saml2-bearer',
            description:
              'The SAML2 Bearer Token Grant Type defined in OAuth SAML 2 Bearer Token Profiles [RFC7522]',
          },
        ],
      },
    },
    response_types: {
      type: 'array',
      description:
        'Array of the OAuth 2.0 response type strings that the client can use at the authorization endpoint',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
    client_name: {
      type: 'string',
      description:
        'Human-readable string name of the client to be presented to the end-user during authorization',
    },
    client_url: {
      type: 'string',
      description:
        'URL string of a web page providing information about the client',
      format: 'uri',
    },
    logo_uri: {
      type: 'string',
      description: 'URL string that references a logo for the client',
      format: 'uri',
    },
    scope: {
      type: 'string',
      description: 'URL string that references a logo for the client',
    },
    contacts: {
      type: 'array',
      description:
        'Array of strings representing ways to contact people responsible for this client, typically email addresses',
      items: {
        type: 'string',
      },
    },
    tos_uri: {
      type: 'string',
      description:
        'URL string that points to a human-readable terms of service document for the client that describes a contractual relationship between the end-user and the client that the end-user accepts when authorizing the client',
      format: 'uri',
    },
    policy_uri: {
      type: 'string',
      description:
        'URL string that points to a human-readable privacy policy document that describes how the deployment organization collects, uses, retains, and discloses personal data',
      format: 'uri',
    },
    jwks_uri: {
      type: 'string',
      description:
        "URL string referencing the client's JSON Web Key (JWK) Set [RFC7517] document, which contains the client's public keys",
      format: 'uri',
    },
    jwks: {
      type: 'object',
      description:
        "Client's JSON Web Key Set [RFC7517] document value, which contains the client's public keys",
      properties: {
        keys: {
          type: 'array',
          items: {
            $comment: 'FIXME: Add JWK schema?',
            type: 'object',
          },
        },
      },
      required: ['keys'],
    },
    software_id: {
      type: 'string',
      description:
        'A unique identifier string (e.g., a Universally Unique Identifier (UUID)) assigned by the client developer or software publisher used by registration endpoints to identify the client software to be dynamically registered',
    },
    software_version: {
      type: 'string',
      description:
        'A version identifier string for the client software identified by "software_id"',
    },
    software_statement: {
      type: 'string',
      description:
        '@see {@link https://datatracker.ietf.org/doc/html/rfc7591#section-2.3 Software Statement}',
    },
  },
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
};
export = schema;
