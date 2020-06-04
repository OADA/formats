# @OADA/types

This package is TypeScript type definitions for known OADA formats.
These type are based on [@OADA/formats](https://github.com/OADA/formats).

## Installation

```sh
yarn add @oada/types
```

## Usage

The type definiton for a given format can be imported based on its `$id`.
For example, the OADA Bookmarks v1 format can be imported like so:

```ts
/**
 * Import the type definition for
 * {@link https://formats.openag.io/oada/bookmarks/v1.schema.json}
 */
import Bookmarks from '@oada/types/oada/bookmarks/v1'
```

### Runtime Validation

Since the formats are backed by schemas,
it is possible to check data against a format at runtime.
All the types in this package export methods for doing so
which are typed properly for TypeScript to understand their type implications.

```ts
/**
 * Every type also exports both @method is and @method assert
 */
import Bookmarks, {is, assert} from '@oada/types/oada/bookmarks/v1'

const data1: any = /* Some data */

// True if data matches type Bookmarks, false if not
if (is(data1)) {
  // TS understands data is a bookmarks here
  const bookmarks: Bookmarks = data1
}

const data2: any = /* Some data */

// Throws if data is not of type Bookmarks
assert(data2)
// TS understands data is a bookmarks here
const bookmarks: Bookmarks = data2
```
