import formats from '@oada/formats'

export { formats }

export type TypeCheck<T> = (val: any) => val is T
export type TypeAssert<T> = (val: any) => asserts val is T
