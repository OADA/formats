export { formats, Schema } from '@oada/formats'

export default formats

export type TypeCheck<T> = (val: any) => val is T
export type TypeAssert<T> = (val: any) => asserts val is T
