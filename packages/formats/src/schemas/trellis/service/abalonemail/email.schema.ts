import { JSONSchema8 as Schema } from 'jsonschema8'

const schema: Schema = {
  $id:
    'https://formats.openag.io/trellis/service/abalonemail/email.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Extension @oada/jobs job queue format for Abalonemail',
  type: 'object',
  allOf: [{ $ref: '../../../oada/service/job.schema.json' }],
  properties: {
    service: {
      description: 'Service name',
      const: 'abalonemail'
    },
    type: {
      description: 'Email job type',
      const: 'email'
    },
    config: {
      description: 'Job spceific configuration object',
      $ref: 'config/email.schema.json'
    },
    result: {
      description: 'Final result of job'
    }
  },
  required: ['config'],
  examples: [
    {
      service: 'abalonemail',
      type: 'email',
      config: {
        multiple: false,
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
          },
          {
            content: {
              _id: 'resources/abc123'
            },
            filename: 'file.pdf',
            type: 'application/pdf'
          }
        ]
      },
      status: 'pending',
      updates: {
        '1bF4ELuQwqU3CjDOsn2NF0d7Deu': {
          status: 'started',
          time: '2018-11-14T20:20:39+00:00',
          information: 'started'
        },
        '1bF4GjXWJvj6FJEXCiAj8DatQTD': {
          status: 'sending',
          time: '2018-11-13T20:20:39+00:00',
          information: 'sending email'
        }
      }
    }
  ]
}

export default schema
