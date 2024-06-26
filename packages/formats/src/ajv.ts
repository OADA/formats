/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { resolve } from 'node:path';

import type { JSONSchema8 as Schema } from 'jsonschema8';

import $ref from '@apidevtools/json-schema-ref-parser';

import _Ajv from 'ajv';

import _addFormats from 'ajv-formats';
import addFormats2019 from 'ajv-formats-draft2019';
import { default as axios } from 'axios';

import { getSchema as contentTypeToKey } from '@oada/media-types';

import loadSchemas, { schemasDirectory } from '@oada/schemas';
import { importSchema } from '@oada/schemas/utils';

type Ajv = _Ajv.default;
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
const Ajv = _Ajv as unknown as typeof _Ajv.default;
const addFormats = _addFormats as unknown as typeof _addFormats.default;

export const ajv: OADAFormats = addFormats2019(
  addFormats(
    new Ajv({
      strict: false,
      loadSchema,
    }),
  ),
) as OADAFormats;

export interface OADAFormats extends Ajv {
  // Validate(ref: string | Schema, data: any): boolean;
}

// Load all the schemas into ajv
export async function loadAllFormats() {
  const meta = await $ref.dereference(
    'https://json-schema.org/draft/2019-09/schema',
  );
  // TODO: Why does compileAsync not work for meta schema?
  ajv.addMetaSchema(meta);

  for await (const { schema } of loadSchemas()) {
    const { $id } = schema;
    if (!($id && ajv.getSchema($id))) {
      await ajv.compileAsync(schema);
    }
  }

  return ajv;
}

/**
 * Resolves a content-type to possible schema IDs
 */

// Support getting schema by content type?
const _getSchema = ajv.getSchema.bind(ajv);
ajv.getSchema = ((reference) => {
  const schema = _getSchema(reference);
  if (schema) {
    return schema;
  }

  const key = contentTypeToKey(reference);
  return key && _getSchema(`https://formats.openag.io/${key}`);
}) as typeof _getSchema;

export const schemaExtensions = ['cjs', 'mjs', 'js', 'json'] as const;

export async function loadSchema(uri: string) {
  const r = /^https:\/\/formats\.openag\.io/i;
  // Use local version of openag schemas
  const file = uri.replace(r, './').replace(/\.json$/, '');
  const schemaFile = resolve(schemasDirectory, file);
  for await (const extension of schemaExtensions) {
    try {
      return await importSchema(`${schemaFile}.${extension}`);
    } catch {}
  }

  // Try to fetch schema online
  const { data: schema } = await axios.get<Schema>(uri);
  return schema;
}

export { getSchema as contentTypeToKey } from '@oada/media-types';
