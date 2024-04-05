# @OADA/formats-server

This package is a library for handling OADA formats in HTTP servers (currently
supports `express` and `fastify`).

## Installation

```shell
yarn add @oada/formats-server
```

## Usage

It will set relevant HTTP headers for known OADA formats. If it encounters an
unknown format, it leaves the headers alone.

### Express

```ts
// Import the middleware version
import { middleware: formats } from '@oada/formats-server';

// Must be `use`d _after_ the `Content-Type` is set to work properly
app.use(formats())
```

### Fastify

```ts
// Import the fastify plugin
import { plugin: formats } from '@oada/formats-server';

fastify.register(formats)
```
