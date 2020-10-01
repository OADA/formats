/**
 * Type for the `is` functions of @oada/types types
 */
export type TypeCheck<T> = (val: any) => val is T;
/**
 * Type for the `assert` functions of @oada/types types
 */
export type TypeAssert<T> = (val: any) => asserts val is T;
