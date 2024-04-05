/**
 * @license
 * Copyright 2023 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
import type { JSONSchema8 as Schema } from 'jsonschema8';

import { ianaAssignments, rfc } from '@oada/schemas/utils';

const ktys = await ianaAssignments('jose', 'web-key-types');
const algs = await ianaAssignments(
  'jose',
  'web-signature-encryption-algorithms',
);
const zips = await ianaAssignments(
  'jose',
  'web-encryption-compression-algorithms',
);
const crvs = await ianaAssignments('jose', 'web-key-elliptic-curve');

export default {
  $id: 'https://formats.openag.io/jose/jwa.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'JWA',
  description: `@see {@link ${rfc(7518)} JSON Web Algorithms (JWA)}`,
  definitions: {
    alg: {
      title: 'alg (Algorithm) parameter',
      description: 'JSON Web Signature and Encryption Algorithms',
      definitions: {
        registered: {
          title: 'Registered alg',
          description: `IANA registered values for JSON Web Signature and Encryption Algorithms\n@see {@link ${algs.uri}}`,
          $comment: `Enum retrieved dynamically from ${
            algs.uri
          } on ${new Date()}`,
          oneOf: await algs.map(({ value: name, description, reference }) => ({
            title: name,
            description: `${description}\n@see {@link ${reference}}`,
            const: name,
          })),
        },
      },
      oneOf: [
        { $ref: '#/definitions/alg/definitions/registered' },
        { $ref: '../utils.schema.json#/definitions/anyOtherString' },
      ],
    },
    kty: {
      title: 'kty (Key Type) parameter',
      description:
        'Identifies the cryptographic algorithm family used with the key',
      definitions: {
        registered: {
          title: 'Registered kty',
          description: `IANA registered values for JSON Web Key Types\n@see {@link ${ktys.uri}}`,
          $comment: `Enum retrieved dynamically from ${
            ktys.uri
          } on ${new Date()}`,
          oneOf: await ktys.map(({ value: name, description, reference }) => ({
            title: name,
            description: `${description}\n@see {@link ${reference}}`,
            const: name,
          })),
        },
      },
      oneOf: [
        { $ref: '#/definitions/kty/definitions/registered' },
        { $ref: '../utils.schema.json#/definitions/anyOtherString' },
      ],
    },
    zip: {
      title: 'zip (Compression Algorithm) parameter',
      description: 'JSON Web Encryption Compression Algorithms',
      definitions: {
        registered: {
          title: 'Registered zip',
          description: `IANA registered values for JSON Web Encryption Compression Algorithms\n@see {@link ${zips.uri}}`,
          $comment: `Enum retrieved dynamically from ${
            zips.uri
          } on ${new Date()}`,
          oneOf: await zips.map(({ value: name, description, reference }) => ({
            title: name,
            description: `${description}\n@see {@link ${reference}}`,
            const: name,
          })),
        },
      },
      oneOf: [
        { $ref: '#/definitions/zip/definitions/registered' },
        { $ref: '../utils.schema.json#/definitions/anyOtherString' },
      ],
    },
    crv: {
      title: 'crv (Curve) parameter',
      description: 'JSON Web Key Elliptic Curve',
      definitions: {
        registered: {
          title: 'Registered crv',
          description: `IANA registered values for JSON Web Key Elliptic Curve\n@see {@link ${crvs.uri}}`,
          $comment: `Enum retrieved dynamically from ${
            crvs.uri
          } on ${new Date()}`,
          oneOf: await crvs.map(({ value: name, description, reference }) => ({
            title: name,
            description: `${description}\n@see {@link ${reference}}`,
            const: name,
          })),
        },
      },
      oneOf: [
        { $ref: '#/definitions/crv/definitions/registered' },
        { $ref: '../utils.schema.json#/definitions/anyOtherString' },
      ],
    },
  },
} as const satisfies Schema;
