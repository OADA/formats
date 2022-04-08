# @OADA/media-types

This package is a library for resolving media types
to their corresponding OADA schema(s).

## Installation

```shell
yarn add @oada/media-types
```

## Usage

The library takes a `string`, `Request`, or `Response`
and returns an array of schema `$id`s.
If it cannot determine a corresponding schema, the array will be empty.

```ts
import mediaType2schema from '@oada/media-types';

// ['https://formats.openag.io/oada/bookmarks/v1.schema.json']
const schema = mediaType2schema('application/vnd.oada.bookmarks.1+json');

// Or when dealing with http requests (e.g., in express)
app.use((req) => {
  const schema = mediaType2schema(req);
});
```
