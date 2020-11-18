import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/rules.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Endpoint for rules engine stuff',
  allOf: [{ $ref: 'resource.schema.json' }],
  properties: {
    actions: { $ref: '' },
    conditions: {},
    configured: {},
    compiled: {},
  },
};

export default schema;
