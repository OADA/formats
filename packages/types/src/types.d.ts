declare module 'ajv-pack' {
  import { Ajv, ValidateFunction } from 'ajv';

  const pack: (ajv: Ajv, validate: ValidateFunction) => string;

  export = pack;
}

// Declare packed validation functions modules
declare module '*-validate.js' {
  import { ValidateFunction } from 'ajv';

  const validate: ValidateFunction;

  export = validate;
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
  ) => void;
  type Options<Schema> = {
    cb: Callback<Schema> | { pre: Callback<Schema>; post: Callback<Schema> };
    /**
     * @default false
     */
    allKeys?: boolean;
  };

  type Keywords = {
    [key: string]: boolean;
  };

  interface Traverse {
    <Schema>(schema: Schema, opts: Options<Schema>): void;
    keywords: Keywords;
    arrayKeywords: Keywords;
    propsKeywords: Keywords;
    skipKeywords: Keywords;
  }

  const traverse: Traverse;

  export = traverse;
}
