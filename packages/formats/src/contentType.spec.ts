import { expect } from 'chai'

import { formats } from './'

describe('Content-Type Resolution', () => {
  const testSchema = { enum: ['foo1'] }
  before('Load test schema', () => {
    formats.addSchema(
      testSchema,
      'https://formats.openag.io/test/foo/bar.schema.json'
    )
  })

  it('should resolve to schemas', () => {
    const validate = formats.getSchema('application/vnd.test.foo.bar+json')
    expect(validate?.schema).to.equal(testSchema)
  })

  describe('Versioned Types', () => {
    const rootSchema = { enum: ['foo2'] }
    before('Load version root schema', () => {
      formats.addSchema(
        rootSchema,
        'https://formats.openag.io/test/foo/v1.schema.json'
      )
    })
    it('should resolve to version root schemas', () => {
      const validate = formats.getSchema('application/vnd.test.foo.1+json')
      expect(validate?.schema).to.equal(rootSchema)
    })

    const defsSchema = { enum: ['foo3'] }
    before('Load version $defs schema', () => {
      const schema = { $defs: { v1: defsSchema } }
      formats.addSchema(
        schema,
        'https://formats.openag.io/test/bar.schema.json'
      )
    })
    it('should resolve to version $defs schemas', () => {
      const validate = formats.getSchema('application/vnd.test.bar.1+json')
      expect(validate?.schema).to.equal(defsSchema)
    })

    const definitionsSchema = { enum: ['foo4'] }
    before('Load version definitions schema', () => {
      const schema = { definitions: { v1: definitionsSchema } }
      formats.addSchema(
        schema,
        'https://formats.openag.io/test/baz.schema.json'
      )
    })
    it('should resolve to version definitions schemas', () => {
      const validate = formats.getSchema('application/vnd.test.baz.1+json')
      expect(validate?.schema).to.equal(definitionsSchema)
    })
  })
})
