declare module 'chai-json-schema-ajv' {
  import { Ajv } from 'ajv'

  interface Options {
    ajv?: Ajv
  }
  export function create (options: any): Chai.ChaiPlugin
}

// TODO: How to express that this is only added when using the plugin?
declare namespace Chai {
  interface Assertion {
    validJsonSchema: Assertion
    // TODO: Specify schema param needs to be a schema
    jsonSchema(schema: any): Assertion
  }
}

declare module 'json-schema-traverse' {
  type Callback<Schema> = (
    schema: Schema,
    jsonPtr: string,
    rootSchema: Schema,
    parentJsonPtr: string,
    parentKeyword: string,
    parentSchema: Schema,
    keyIndex: number
  ) => void
  type Options<Schema> = {
    cb: Callback<Schema> | { pre: Callback<Schema>; post: Callback<Schema> }
    /**
     * @default false
     */
    allKeys?: boolean
  }

  type Keywords = {
    [key: string]: boolean
  }

  interface Traverse {
    <Schema>(schema: Schema, opts: Options<Schema>): void
    keywords: Keywords
    arrayKeywords: Keywords
    propsKeywords: Keywords
    skipKeywords: Keywords
  }

  const traverse: Traverse

  export = traverse
}
