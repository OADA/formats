/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Type for the `is` functions of @oada/types types
 */
export type TypeCheck<T> = (value: unknown) => value is T;
/**
 * Type for the `assert` functions of @oada/types types
 */
export type TypeAssert<T> = (value: unknown) => asserts value is T;
