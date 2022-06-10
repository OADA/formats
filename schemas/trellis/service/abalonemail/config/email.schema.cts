/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/service/abalonemail/config/email.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Abalonemail email config format for @oada/job job',
  type: 'object',
  definitions: {
    email: {
      $comment: "TODO: Allow emails like: 'John Doe <john@example.org>'",
      description: "Object for email and associated person's name",
      oneOf: [
        {
          type: 'string',
          format: 'email',
        },
        {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            name: {
              type: 'string',
            },
          },
          required: ['email'],
        },
      ],
    },
  },
  properties: {
    multiple: {
      description:
        'If separate emails to each `to` (true) or if one email to all of `to` (false)',
      type: 'boolean',
    },
    from: {
      $ref: '#/definitions/email',
    },
    to: {
      oneOf: [
        {
          $ref: '#/definitions/email',
        },
        {
          type: 'array',
          items: {
            $ref: '#/definitions/email',
          },
        },
      ],
    },
    replyTo: {
      $ref: '#/definitions/email',
    },
    subject: {
      type: 'string',
      minLength: 1,
    },
    text: {
      type: 'string',
      minLength: 1,
    },
    html: {
      type: 'string',
      minLength: 1,
    },
    templateData: {
      type: 'object',
      description: 'Data to use when filling out email template',
    },
    attachments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          content: {
            oneOf: [
              {
                description: 'Base 64 encoded attachment content',
                type: 'string',
                minLength: 1,
              },
              {
                description: 'Link to OADA resource to use as content',
                $ref: '../../../../oada.schema.json#/definitions/link',
              },
            ],
          },
          filename: {
            type: 'string',
            minLength: 1,
          },
          type: {
            type: 'string',
            minLength: 1,
          },
          disposition: {
            enum: ['inline', 'attachment'],
            default: 'attachment',
          },
          content_id: {
            type: 'string',
          },
        },
        required: ['content', 'filename'],
        if: {
          type: 'object',
          properties: {
            disposition: {
              const: 'inline',
            },
          },
          required: ['disposition'],
        },
        // eslint-disable-next-line unicorn/no-thenable
        then: {
          type: 'object',
          required: ['content_id'],
        },
      },
    },
  },
  required: ['from', 'to'],
  examples: [
    {
      multiple: false,
      from: 'john@example.com',
      to: {
        name: 'Mary Lou',
        email: 'donuts@example.org',
      },
      subject: 'Test mail',
      text: 'Test!',
      html: '<h1>Test!</h1>',
      attachments: [
        {
          content: 'RXhhbXBsZSBkYXRh',
          filename: 'test.dat',
          type: 'plain/text',
        },
        {
          content: {
            _id: 'resources/abc123',
          },
          filename: 'file.pdf',
          type: 'application/pdf',
        },
      ],
    },
  ],
};

export = schema;
