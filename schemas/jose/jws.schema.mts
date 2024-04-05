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

const parameters = await ianaAssignments(
  'jose',
  'web-signature-encryption-header-parameters',
);

export default {
  $id: 'https://formats.openag.io/jose/jws.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'JWS',
  description: `@see {@link ${rfc(7515)} JSON Web Signature (JWS)}`,
  definitions: {
    parameters: {
      title: 'JOSE Header parameters',
      description: `@see {@link ${rfc(7515, 4)} JOSE Header}`,
      definitions: {
        registered: {
          title: 'Registered Header Parameter Names',
          description: `IANA Registered Header Parameter Names\n@see {@link ${rfc(
            7515,
            4.1,
          )} Registered Header Parameter Names}\n@see {@link ${
            parameters.uri
          }}`,
          $comment: `Enum retrieved dynamically from ${
            parameters.uri
          } on ${new Date()}`,
          oneOf: await parameters.map((parameter) => ({
            title: parameter.value,
            description: `${parameter.description}\n@see {@link ${parameter.reference}}`,
            const: parameter.value,
          })),
        },
      },
      oneOf: [
        { $ref: '#/definitions/parameters/definitions/registered' },
        { $ref: '../utils.schema.json#/definitions/anyOtherString' },
      ],
    },
  },
} as const satisfies Schema;
