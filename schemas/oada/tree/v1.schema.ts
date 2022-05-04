/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
import { JSONSchema8 as Schema } from 'jsonschema8';

const tsType = `
{
/**
 * _type identifies the content-type of a resource in the OADA API and is required for all OADA-defined formats.
 * It usually looks like application/vnd.oada.something.1+json.
 */
_type?: string
/**
 * _rev is the revision for a resource in the OADA API
 */
_rev?: number
} & { [k: string]: Tree }`;

const schema: Schema = {
  $id: 'https://formats.openag.io/oada/tree/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'An object representation of an OADA "tree".',
  definitions: {
    tree: {
      // FIXME: Override TypeScript type for Tree
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      ...({ tsType } as Record<string, unknown>),
      type: 'object',
      properties: {
        _type: {
          $ref: '../../oada.schema.json#/definitions/_type',
        },
        _rev: {
          $ref: '../../oada.schema.json#/definitions/_rev',
        },
      },
      additionalProperties: {
        $ref: '#/definitions/tree',
      },
    },
  },
  type: 'object',
  additionalProperties: { $ref: '#/definitions/tree' },
};

export default schema;
