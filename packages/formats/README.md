# @OADA/formats

This package is a library for using OADA/formats with JavaScript/TypeScript.
It is mainly an [Ajv][] instance pre-packaged with the OADA schemas.

## Installation

```shell
yarn add @oada/formats
```

## Usage

This TypeScript/JavaScript library exports an async function
that resolves to an [Ajv][] instance
which is loaded with all the the schemas from this project.

```ts
import loadAllFormats from '@oada/formats';

const obj = {
  /* Properties and stuff here */
};

const formats = await loadAllFormats();

// Check that obj matches the format for and OADA bookmarks document
formats.validate('https://formats.openag.io/oada/bookmarks.schema', obj);
```

In addition to being loaded with all the OADA formats,
the returned [Ajv][] instance is also augmented to be able
to resolve content types to the relevant schema.

```ts
// Returns the schema for an OADA Bookmarks document
const { schema } = formats.getSchema('applications/vnd.oada.bookmarks.1+json');
```

[ajv]: https://github.com/epoberezkin/ajv#api
