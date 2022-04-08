/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/certifications/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'This is document with a list of links to certifications.  The keys are random strings.  It is also possible to have a dynamic index that represents a set of smaller groups of certifications.  In that case, an id-index key or other grouping would be found here.',
  patternProperties: {
    '^(?!(indexing|.*-index|_.*)).*$': {
      description:
        'A versioned link in OADA has _id an _rev in the link in order allow changes to bubble up from child to parents.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string',
        },
        _rev: {
          description:
            '_rev is the revision string for a resource in the OADA API.',
          type: 'integer',
        },
      },
      required: ['_id', '_rev'],
      type: 'object',
    },
  },
  properties: {
    _id: {
      description: '_id identifies a resource in the OADA API.',
      type: 'string',
    },
    _rev: {
      description:
        '_rev is the revision string for a resource in the OADA API.',
      type: 'integer',
    },
    _meta: {
      description: '_meta is a link to the meta document for a resources.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string',
        },
        _rev: {
          description:
            '_rev is the revision string for a resource in the OADA API.',
          type: 'integer',
        },
      },
      required: ['_id', '_rev'],
      type: 'object',
    },
    _type: {
      enum: ['application/vnd.trellis.certifications.1+json'],
    },
  },
  additionalProperties: true,
  required: ['_type'],
  type: 'object',
  examples: [
    {
      _id: 'resources/902j3kfljwf0932',
      _rev: 1,
      _meta: {
        _id: 'resources/f2h0829i322/_meta',
        _rev: 1,
      },
      _type: 'application/vnd.trellis.certifications.1+json',
      idjofkwjfsdD: {
        _id: '8f2ofj2308f2i',
        _rev: 1,
      },
    },
  ],
};
export default schema;
