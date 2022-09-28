/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { ErrorObject } from 'ajv';

/**
 * Type for the `is` functions of @oada/types types
 */
export type TypeCheck<T> = (value: unknown) => value is T;
/**
 * Type for the `assert` functions of @oada/types types
 */
export type TypeAssert<T> = (value: unknown) => asserts value is T;

export class AssertError<T = unknown> extends TypeError {
  constructor(readonly input: T, readonly errors: readonly ErrorObject[]) {
    // Just use first error for message for now
    const [first] = errors;
    const message = first
      ? `@oada/types assert failed at path "${first.instancePath}": ${first.message}`
      : '@oada/types assert failed';
    super(message);
    this.input = input;
    this.errors = errors;
  }
}
