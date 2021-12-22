import { URL } from 'url';

import { JSONSchema8 as Schema, JSONSchema8ObjectSchema } from 'jsonschema8';

import { Options } from 'json-schema-to-typescript';
import omit from 'lodash.omit';
import merge from 'json-schema-merge-allof';

// Set of normalization rules
type Rules = Options['normalizerRules'];
export const rules: Rules = new Map();

/*
// Normalize id
rules.set('$id to id', schema => {
  if (schema.$id) {
    schema.id = schema.$id
  }
})
*/

// Add jsdoc of default to description
rules.set('default to jsdoc', (schema) => {
  if (typeof schema.default !== 'undefined') {
    const jsdoc = `@default ${JSON.stringify(schema.default, null, 2)}`;
    if (schema.description) {
      schema.description += '\n' + jsdoc;
    } else {
      schema.description = jsdoc;
    }
  }
});

// Not expressible is TS, just causes issues
rules.set('ingore patternProperties', (schema) => {
  if (schema.patternProperties) {
    delete schema.patternProperties;
  }
});

rules.set('$ref to absolute path', (schema, { $id }) => {
  if (schema.$ref) {
    schema.$ref = new URL(schema.$ref, $id).toString();
  }
});

// Normalize keywords adjacent to boolean operators
rules.set('Merge base schema into boolean operator subschemas', (schema) => {
  function isObj(schema: Schema): schema is JSONSchema8ObjectSchema {
    return !!(schema as JSONSchema8ObjectSchema).properties;
  }
  const booleans = <const>['allOf', 'anyOf', 'oneOf'];

  if (isObj(schema)) {
    const adjacent = omit(
      schema,
      (booleans as readonly string[]).concat(['$id', 'id', '$schema'])
    );
    for (const operator of booleans) {
      if (schema[operator]) {
        schema[operator] = (schema[operator] ?? []).map((subschema) =>
          merge({ allOf: [subschema, adjacent] })
        );
      }
    }
  }
});
