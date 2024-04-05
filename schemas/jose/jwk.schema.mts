/**
 * @license
 * Copyright 2023 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * RFC 7517
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7517}
 */

import type { LiteralUnion } from 'type-fest';

import type {
  JSONSchema8ObjectSchema as ObjectSchema,
  JSONSchema8 as Schema,
} from 'jsonschema8';

import { ianaAssignments, properties, rfc } from '@oada/schemas/utils';

const parameters = await ianaAssignments('jose', 'web-key-parameters');
const keyUses = await ianaAssignments('jose', 'web-key-use');
const keyOps = await ianaAssignments('jose', 'web-key-operations');

/**
 * JWK parameters defined in the JWK RFC
 */
type JWKProperties =
  | 'kty'
  | 'use'
  | 'key_ops'
  | 'alg'
  | 'kid'
  | 'x5u'
  | 'x5c'
  | 'x5t'
  | 'x5t#S256';

const jwkType = new Map<string, ObjectSchema>();
for await (const {
  record: { value, description, reference, kty },
} of await ianaAssignments('jose', 'web-key-parameters')) {
  const { properties = {}, ...rest } = jwkType.get(kty) ?? {};
  jwkType.set(kty, {
    ...rest,
    type: 'object',
    properties: {
      [value]: {
        title: value,
        description: `${description}\n@see {@link ${reference}}` as const,
      },
      ...properties,
    },
  });
}

/**
 * Dynamically generated sub schema with registered JWK paramater definitions
 */
const registered = {
  $id: '#/definitions/parameters/definitions/registered',
  title: 'Registered parameters',
  description: `IANA registered values for JSON Web Key Parameters\n@see {@link ${parameters.uri}}`,
  $comment: `Definitions retrieved dynamically from ${
    parameters.uri
  } on ${new Date()}`,
  definitions: Object.fromEntries(
    await parameters.map(
      ({ value, description, reference }) =>
        [
          value as LiteralUnion<JWKProperties, string>,
          {
            title: value,
            description: `${description}\n@see {@link ${reference}}`,
          },
        ] as const,
    ),
  ),
} as const satisfies Schema;

export default {
  $id: 'https://formats.openag.io/jose/jwk.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'JWK',
  description: `@see {@link ${rfc(7517)} JSON Web Key (JWK)}`,
  definitions: {
    jwk: {
      description: `@see {@link ${rfc(7517, 4)} JSON Web Key (JWK) Format}`,
      type: 'object',
      required: ['kty'],
      ...properties(registered.definitions, {
        'kty': {
          allOf: [{ $ref: './jwa.schema.json#/definitions/kty' }],
        },
        'use': {
          allOf: [{ $ref: '#/definitions/use' }],
        },
        'key_ops': {
          description:
            '@see {@link https://www.w3.org/TR/WebCryptoAPI/#dfn-KeyUsage Web Crypto API}',
          type: 'array',
          uniqueItems: true,
          items: {
            $ref: '#/definitions/key_op',
          },
        },
        'alg': {
          allOf: [{ $ref: './jwa.schema.json#/definitions/alg' }],
        },
        'kid': {
          type: 'string',
        },
        'x5u': {
          type: 'string',
          format: 'uri',
        },
        'x5c': {
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
            contentEncoding: 'base64',
            contentMediaType: 'application/pkix-pkipath',
          },
        },
        'x5t': {
          type: 'string',
          contentEncoding: 'base64url',
        },
        'x5t#S256': {
          type: 'string',
          contentEncoding: 'base64url',
        },
      }),
    },
    jwks: {
      type: 'object',
      required: ['keys'],
      properties: {
        keys: { type: 'array', items: { $ref: '#/definitions/jwk' } },
      },
    },
    use: {
      oneOf: [
        { $ref: '#/definitions/use/definitions/registered' },
        { $ref: '../utils.schema.json#/definitions/anyOtherString' },
      ],
      definitions: {
        registered: {
          $comment: `Enum retrieved dynamically from ${
            keyUses.uri
          } on ${new Date()}`,
          oneOf: await keyUses.map(({ value, description, reference }) => ({
            title: value,
            description: `${description}\n@see {@link ${reference}}` as const,
            const: value,
          })),
        },
      },
    },
    key_op: {
      oneOf: [
        { $ref: '#/definitions/key_op/definitions/registered' },
        { $ref: '../utils.schema.json#/definitions/anyOtherString' },
      ],
      definitions: {
        registered: {
          $comment: `Enum retrieved dynamically from ${
            keyOps.uri
          } on ${new Date()}`,
          oneOf: await keyOps.map(({ value, description, reference }) => ({
            title: value,
            description: `${description}\n@see {@link ${reference}}` as const,
            const: value,
          })),
        },
      },
    },
  },
  oneOf: [{ $ref: '#/definitions/jwk' }],
  examples: [
    {
      kty: 'EC',
      crv: 'P-256',
      x: 'f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU',
      y: 'x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0',
      kid: 'Public key used in JWS spec Appendix A.3 example',
    },
  ],
} as const satisfies Schema;
