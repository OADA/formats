# OADA Formats

[![License](https://img.shields.io/github/license/OADA/formats)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6a3ad756-6ef7-4b04-b603-74deef3642c9/deploy-status)](https://app.netlify.com/sites/formats/deploys)

[![Deploys by Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://www.netlify.com)

This is a mono-repo for all things relating to OADA formats. It uses yarn
workspaces. The purpose of this repo is to act as an inventory of known OADA API
and ag data formats. These formats are represented as [JSON Schema][].

## Schemas

The [JSON Schema][] files are publicly available from
`https://formats.openag.io/`. The `$id` of our schemas is also the URL at which
it is available for download (i.e., if you configure your JSON Schema tool to
resolve `$ref`s via HTTP, you can reference our schemas with no further
effort.). This makes the schemas/formats useful to any of the many environments
which have
[JSON Schema implementations](https://json-schema.org/implementations.html)
available.

### A caveat about schema files

To have TypeScript sanity check the formats of our schemas for us, we wrap our
JSON Schemas in TypeScript modules.

```ts
// Somewhat opinionated TypeScript type definitions for JSON Schema
import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  /* The actual JSON Schema */
};

/**
 * Simply exports an object of the schema,
 * but now TS understands what it is and how it should look.
 */
export = schema;
```

The original intention was to simply have JSON files of the [JSON Schema][], but
the convenience of having TypeScript check our schemas for us motivated this
compromise. The published versions of the schemas have this wrapping removed and
are pure [JSON Schema][].

### Adding formats

All that is needed to add a format is to create a new `.schema.ts` file within
[schemas](schemas) which exports valid JSON Schema. You can easily add the file
for your new format with `hygen`:

```shell
hygen format new your/format/name
```

#### Testing formats

Our test suite will automatically sanity-check all formats (including your new
ones). Schemas are (among other checks) checked against the meta-schema, and
expected to match any examples they have.

You are _strongly encouraged_ to add [`examples`][] to your new formats.
Additionally, if you create a `.schema.spec.cts` file for your format, any mocha
tests in it will run with the test suite.

## JavaScript/TypeScript libraries

This project is chiefly a collection of pure [JSON Schema][] schemata, but there
are also node libraries for utilizing the schemas in TypeScript/JavaScript under
[packages](packages).

[json schema]: https://json-schema.org
[`examples`]: https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.9.5