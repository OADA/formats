import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/service/abalonemail/job.schema.json',
  description: "Extension of @oada/job's job schema for Abalonemail",
  type: 'object',
  allOf: [{ $ref: '../../../oada/service/jobs/job.schema.json' }],
  definitions: {
    email: {
      $comment: "TODO: Allow emails like: 'John Doe <john@example.org>'",
      description: "Object for email and assoicated person's name",
      oneOf: [
        {
          type: 'string',
          format: 'email'
        },
        {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            name: {
              type: 'string'
            }
          },
          required: ['email']
        }
      ]
    }
  },
  properties: {
    service: {
      enum: ['abalonemail']
    },
    type: {
      enum: ['email']
    },
    // Note: Can support a config per type using JsonSchema "allOf" and "if"
    config: {
      type: 'object',
      properties: {
        from: {
          $ref: '#/definitions/email'
        },
        to: {
          oneOf: [
            {
              $ref: '#/definitions/email'
            },
            {
              type: 'array',
              items: {
                $ref: '#/definitions/email'
              }
            }
          ]
        },
        replyTo: {
          $ref: '#/definitions/email'
        },
        subject: {
          type: 'string',
          minLength: 1
        },
        text: {
          type: 'string',
          minLength: 1
        },
        html: {
          type: 'string',
          minLength: 1
        },
        attachments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              content: {
                description: 'Base 64 encoded attachment content',
                type: 'string',
                minLength: 1
              },
              filename: {
                type: 'string',
                minLength: 1
              },
              type: {
                type: 'string',
                minLength: 1
              },
              disposition: {
                enum: ['inline', 'attachment']
              },
              contentId: {
                type: 'string'
              }
            },
            required: ['content', 'filename']
          }
        }
      },
      required: ['from', 'to']
    }
  },
  examples: [
    {
      service: 'abalonemail',
      type: 'email',
      config: {
        from: 'john@example.com',
        to: {
          name: 'Mary Lou',
          email: 'donuts@example.org'
        },
        subject: 'Test mail',
        text: 'Test!',
        html: '<h1>Test!</h1>',
        attachments: [
          {
            content: 'RXhhbXBsZSBkYXRh',
            filename: 'test.dat',
            type: 'plain/text'
          }
        ]
      },
      status: 'pending',
      updates: {
        '1bXJiWbMDqEQTtKsUNxgpfc0yPF': {
          status: 'pending',
          time: '2018-11-13T20:20:39+00:00',
          information: 'Queued by @trellisfw/sharing'
        }
      }
    }
  ]
}

export default schema
