/// <reference types='./types' />

import { join } from 'path';

import type { JSONSchema8 as Schema } from 'jsonschema8';

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addFormats2019 from 'ajv-formats-draft2019';
import { dereference } from '@apidevtools/json-schema-ref-parser';
import axios from 'axios';

import { getSchema as contentTypeToKey } from '@oada/media-types';

import schemas from './schemas';

export const ajv: OADAFormats = addFormats2019(
  addFormats(
    new Ajv({
      strict: false,
      loadSchema,
    })
  )
) as OADAFormats;

export interface OADAFormats extends Ajv {
  //validate(ref: string | Schema, data: any): boolean;
}

// Load all the schemas into ajv
export async function loadAllFormats() {
  const meta = await dereference(
    'https://json-schema.org/draft/2019-09/schema'
  );
  // TODO: Why does compileAsync not work for meta schema?
  ajv.addMetaSchema(meta);

  for (const { key, schema } of schemas()) {
    try {
      if (!ajv.getSchema(key)) {
        await ajv.compileAsync(await schema);
      }
    } catch (err) {
      console.error(err);
      throw new Error(`Error loading schema ${key}`);
    }
  }

  return ajv;
}

/**
 * Resolves a content-type to possible schema IDs
 */
export { contentTypeToKey };

// Support getting schema by content type?
const _getSchema = ajv.getSchema.bind(ajv);
ajv.getSchema = ((ref) => {
  const schema = _getSchema(ref);
  if (schema) {
    return schema;
  }

  const key = contentTypeToKey(ref);
  return key && _getSchema('https://formats.openag.io/' + key);
}) as typeof _getSchema;

export async function loadSchema(uri: string) {
  const r = /^https:\/\/formats\.openag\.io/i;

  if (uri.match(r)) {
    // Use local verison of openag schemas
    const file = uri
      .replace(r, join(__dirname, 'schemas'))
      .replace(/\.json$/, '');
    const { default: schema } = await import(file);
    return schema;
  } else {
    // Try to fetch schema online
    const { data: schema } = await axios.get<Schema>(uri);
    return schema;
  }
}
