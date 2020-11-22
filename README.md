[![Deploys by Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://www.netlify.com)

# @OADA/formats

The purpose of this repo is to act as an inventory of
known OADA API and ag data formats.
These formats are represented as [JSON Schema][].

## Schemas

The [JSON Schema][] files are publicly available
from `https://formats.openag.io/`.
The `$id` of our schemas is also the URL at which it is available for download
(i.e., if you configure your JSON Schema tool to resolve `$ref`s via HTTP,
you can reference our schemas with no further effort.).
This makes the schemas/formats useful to any of the many environments which have
[JSON Schema implementations](https://json-schema.org/implementations.html)
available.

### Caveat about schema files

In order to have TypeScript sanity check the formats of our schemas for us,
we wrap our JSON Schemas in TypeScript modules.

```ts
// Somewhat opinionated TypeScript type definitions for JSON Schema
import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  /* The actual JSON Schema */
};

/**
 * Simply exports an object of the schema,
 * but now TS understands what it is and how it should look.
 */
export default schema;
```

The original intention was to simply have json files of the [JSON Schema][],
but the convenience of having TypeScript check our schemas for us
motivated this compromise.
The published versions of the schemas have this wrapping removed and
are pure [JSON Schema][].

### Adding formats

All that is needed to add a format is to create a new `.schema.ts` file
within [src/schemas](src/schemas) which exports valid JSON Schema.
You can easily add the file for your new format with `hygen`:

```
$ hygen format new your/format/name
```

#### Testing formats

Our test suite will automatically sanity check all formats
(including your new ones).
Schemas are (among other checks) checked against the metaschema,
and expected to match any examples they have.

You are _strongly encouraged_ to add [`examples`][] to your new formats.
Aditionally if you create a `.schema.spec.ts` file for your format,
any mocha tests in it will run with our the test suite.

## Node library

This project is chiefly a collection of pure [JSON Schema][] schemas,
but there is also a small node library for utilizing the schemas
in TypeScript/JavaScript.

### Node installation

```shell
yarn add @oada/formats
```

### Library Usage

The TypeScript/JavaScript library exports an async function
that resolves to an [Ajv][] instance
which is loaded with all the the schemas from this project.

```ts
import loadAllFormats from '@oada/formats';

const obj = {
  /* Properties and stuff here */
};

let formats = await loadAllFormats();

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

[json schema]: https://json-schema.org
[`examples`]: https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.9.5
[ajv]: https://github.com/epoberezkin/ajv#api
