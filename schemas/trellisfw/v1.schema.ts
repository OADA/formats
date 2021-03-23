import { JSONSchema8 as Schema } from 'jsonschema8';


const schema: Schema = {
  $id: 'https://formats.openag.io/trellisfw/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Top-level /bookmarks/trellisfw type',
  additionalProperties: true,
  properties: {
    asns: { $ref: '../oada/link/v1.schema.json#/definitions/nonversioned' },
  },
  examples: [
    {
      asns: { _id: "resources/9023fj2lkfew" },
    },
  ],
      

};

export default schema;
