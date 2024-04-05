/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

// Declare packed validation functions modules
declare module '*-validate.cjs' {
  import type { ValidateFunction } from 'ajv';

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
    keyIndex: number,
  ) => void;
  interface Options<Schema> {
    cb: Callback<Schema> | { pre: Callback<Schema>; post: Callback<Schema> };
    /**
     * @default false
     */
    allKeys?: boolean;
  }

  type Keywords = Record<string, boolean>;

  interface Traverse {
    <Schema>(schema: Schema, options: Options<Schema>): void;
    keywords: Keywords;
    arrayKeywords: Keywords;
    propsKeywords: Keywords;
    skipKeywords: Keywords;
  }

  const traverse: Traverse;

  export = traverse;
}

declare module 'ajv/dist/standalone.js' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  import type Ajv, { ValidateFunction } from 'ajv';
  function pack(ajv: Ajv, validate: ValidateFunction): string;
  export default pack;
}

declare module 'ajv-formats-draft2019' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  import type Ajv from 'ajv';

  function apply(ajv: Ajv): Ajv;

  export = apply;
}
