import { sync as _glob } from 'glob'

// Use every .schema.ts file we have
export const glob = _glob('/**/*.schema.ts', {
  cwd: __dirname,
  root: __dirname,
  nomount: true
}).map(key => key.replace(/\/+/, '/').replace(/\.ts$/, '.json'))

// Find all the schemas
export default function * () {
  for (const key of glob) {
    const infile = key.replace(/^\//, './').replace(/\.json$/, '')
    const { default: schema } = require(infile)

    yield { schema, key }
  }
}
