/**
 * @license
 * Copyright 2023 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

declare module 'deep-freeze-node' {
  import type { ReadonlyDeep } from 'type-fest';
  function freeze<T>(object: T): ReadonlyDeep<T>;
  export = freeze;
}

interface ObjectConstructor {
  fromEntries<V, P extends PropertyKey>(
    entries: Iterable<readonly [P, V]>,
  ): Record<P, V>;
}
