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
  $id: 'https://formats.openag.io/oada/ainz/rule.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'The format for ainz orchestation rules',
  type: 'object',
  properties: {
    type: {
      description: 'A field for discriminating the different types of rules',
    },
    list: {
      description: 'A path to an OADA list to watch for changes',
      $ref: '../../oada.schema.json#/definitions/path',
    },
    schema: {
      description: 'A JSON Schema to which to compare new items in list',
      $ref: 'https://json-schema.org/draft/2019-09/schema',
    },
  },
  oneOf: [
    {
      description: 'A rule which "moves" (re-indexes) a resource',
      type: 'object',
      properties: {
        type: { enum: ['reindex'] },
        destination: {
          description: 'A path to an OADA list to which to add maching items',
          type: 'string',
          // $ref: '../../oada.schema.json#/definitions/path',
        },
        tree: {
          description: 'A tree to use for "tree PUTs"',
          type: 'object',
          $comment: 'Recursive schema breaks schema to TS compiler',
          // $ref: '../tree/v1.schema.json',
        },
        itemsPath: {
          description: 'A JSONPath for resolving the items of an indexed list',
          type: 'string',
          examples: ['$.day-index.*.*'],
          default: '$.*',
        },
        meta: {
          description: "An object to PUT on matching items's _meta",
          type: 'object',
        },
      },
    },
    {
      description: 'A rule which creates an OADA job when a resource matches',
      type: 'object',
      properties: {
        type: { enum: ['job'] },
        pointer: {
          description:
            'A JSON pointer of where in the job config to create a link to the resource',
          type: 'string',
          format: 'json-pointer',
        },
        job: {
          description:
            'The job to create. A link to the matching resource will be added to the job.',
          $ref: '../service/job.schema.json#',
        },
      },
    },
  ],
  required: ['type', 'list', 'schema'],
  examples: [
    {
      type: 'reindex',
      list: '/bookmarks/stuff',
      schema: {
        const: { foo: 'bar' },
      },
      destination: '/bookmarks/foo',
    },
    {
      type: 'job',
      list: '/bookmarks/stuff',
      schema: {
        const: { foo: 'bar' },
      },
      pointer: '/resource',
      job: {
        service: 'coolservice',
        type: 'cool',
        config: {
          foo: 'bar',
        },
      },
    },
  ],
};

export default schema;
