///<reference types='./types'/>

import { expect } from 'chai'

import { schemas } from '@oada/formats'

import { TypeAssert, TypeCheck } from './'

type TypeModule<T = unknown> = {
  is: TypeCheck<T>
  assert: TypeAssert<T>
}
describe('OADA Types', () => {
  for (const { key, schema } of schemas()) {
    const type = key
      .replace(/^https:\/\/formats\.openag\.io/, '')
      .replace(/^\//, './')
      .replace(/\.schema\.json$/, '')

    describe(key, () => {
      let typeModule: TypeModule
      before('Load type module', async () => {
        typeModule = await import(type)
      })

      describe('Examples', () => {
        for (const i in schema.examples ?? []) {
          const example = schema.examples?.[i]

          it(`should check true for example ${i}`, () => {
            expect(typeModule.is(example)).to.be.ok
          })

          it(`should assert example ${i}`, async () => {
            try {
              typeModule.assert(example)
            } catch (err) {
              expect(err).to.not.be
            }
          })
        }
      })
    })
  }
})
