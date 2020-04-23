import { expect } from 'chai'

import types from './'

describe('Content-Type Resolution', () => {
  const testSchema = { enum: ['foo1'] }
  before('Load test schema', () => {
    types.addSchema(testSchema, '/test/foo/bar.schema.json')
  })

  it('should resolve to schemas', () => {
    const validate = types.getSchema('application/vnd.test.foo.bar+json')
    expect(validate?.schema).to.equal(testSchema)
  })

  describe('Versioned Types', () => {
    const rootSchema = { enum: ['foo2'] }
    before('Load version root schema', () => {
      types.addSchema(rootSchema, '/test/foo/v1.schema.json')
    })
    it('should resolve to version root schemas', () => {
      const validate = types.getSchema('application/vnd.test.foo.1+json')
      expect(validate?.schema).to.equal(rootSchema)
    })

    const defsSchema = { enum: ['foo3'] }
    before('Load version $defs schema', () => {
      const schema = { $defs: { v1: defsSchema } }
      types.addSchema(schema, '/test/bar.schema.json')
    })
    it('should resolve to version $defs schemas', () => {
      const validate = types.getSchema('application/vnd.test.bar.1+json')
      expect(validate?.schema).to.equal(defsSchema)
    })

    const definitionsSchema = { enum: ['foo4'] }
    before('Load version definitions schema', () => {
      const schema = { definitions: { v1: definitionsSchema } }
      types.addSchema(schema, '/test/baz.schema.json')
    })
    it('should resolve to version definitions schemas', () => {
      const validate = types.getSchema('application/vnd.test.baz.1+json')
      expect(validate?.schema).to.equal(definitionsSchema)
    })
  })
})
