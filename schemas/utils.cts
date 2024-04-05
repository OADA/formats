/**
 * @license
 * Copyright 2023 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { pipeline } from 'node:stream/promises';

import {
  type ArrayValues,
  type Get,
  type IfNever,
  type MergeDeep,
  type Paths,
  type Replace,
  type TupleToUnion,
} from 'type-fest';
import { type ColumnOption, parse } from 'csv-parse';
import type { JSONSchema8 as Schema } from 'jsonschema8';
import freeze from 'deep-freeze-node';

import _get from 'lodash.get';
import _merge from 'lodash.merge';

/**
 * Generate a link to the given RFC (with optional section)
 */
export function rfc<
  N extends number,
  S extends string | number | never = never,
>(rfcNumber: N, section?: S) {
  const fragment = section ? (`section-${section}` as const) : '';
  const uri = `https://datatracker.ietf.org/doc/html/rfc${rfcNumber}` as const;
  type R = IfNever<S, typeof uri, `${typeof uri}#section-${S}`>;
  return (fragment ? (`${uri}#${fragment}` as const) : uri) as R;
}

export function iana<P extends string, A extends string>(
  protocol: P,
  assignment: A,
) {
  const baseUri = `https://www.iana.org/assignments/${protocol}` as const;
  return {
    csv: `${baseUri}/${assignment}.csv` as const,
    uri: `${baseUri}/${protocol}.xhtml#${assignment}` as const,
  };
}

export async function importSchema(file: string) {
  const schema: Schema | { default: Schema } = await import(file);
  if ('$id' in schema) {
    return freeze(schema);
  }

  return freeze(schema.default as Schema);
}

const columnDefaults = ['value', 'description'] as const;
export const columns = {
  jose: {
    'web-key-parameters': [...columnDefaults, 'kty'],
  },
} as const satisfies Record<string, Record<string, readonly string[]>>;

type Columns = typeof columns;
type Column<P extends string, A extends string> = P extends keyof Columns
  ? A extends keyof Columns[P]
    ? Columns[P][A]
    : typeof columnDefaults
  : typeof columnDefaults;

export type Row<P extends string, A extends string> = Record<
  TupleToUnion<Column<P, A>> | 'reference',
  string
>;

/**
 * Fetch current list of assignments from IANA
 */
export async function ianaAssignments<P extends string, A extends string>(
  protocol: P,
  assignment: A,
) {
  const { csv, uri } = iana(protocol, assignment);
  const cols = // @ts-expect-error nonsense
    (columns[protocol]?.[assignment] ?? columnDefaults) as Column<P, A>;
  const parser = parse({
    skip_empty_lines: true,
    raw: true,
    columns(header: readonly string[]): ColumnOption[] {
      const rest = header.slice(cols.length);
      return [...cols, ...rest.map((n) => n.toLowerCase())];
    },
    cast(value, context) {
      if (context.column === 'reference') {
        try {
          const r = /\[(?<reference>[^,]+)(?:, (?<section>[^,]*))?]/;
          const { groups: { reference, section } = {} } = r.exec(value)!;

          if (/^rfc/i.test(reference!)) {
            return rfc(
              Number.parseInt(reference!.slice(3), 10),
              section?.replace(/section ?/i, ''),
            );
          }

          return section ? `${reference}, ${section}` : reference;
        } catch {}
      }

      return value;
    },
  });

  const { body } = await fetch(csv);
  void pipeline(body!, parser, { end: true });

  const records = parser as AsyncIterable<{
    record: Row<P, A>;
    info: Record<string, unknown>;
  }>;

  return Object.assign(records, {
    async map<R>(f: (record: Row<P, A>) => R) {
      const rows: R[] = [];
      for await (const { record } of records) {
        rows.push(f(record));
      }

      return rows;
    },
    uri,
  });
}

/**
 * Key used by JSON Schema to TypeScript library for overriding types
 */
const tsKey = 'tsType';

/**
 * Override the resulting TypeScript types of a JSON Schema
 *
 * @example {type: 'string', ...typescript`FooType & string`}
 */
export function typescript(
  strings: TemplateStringsArray,
  ...values: ReadonlyArray<
    string | { [tsKey]: string } | { enum: readonly unknown[] }
  >
) {
  const tsTypes = values.map((s) =>
    typeof s === 'string'
      ? s
      : tsKey in s
        ? s[tsKey]
        : s.enum.map((v) => JSON.stringify(v)).join('|'),
  );
  return {
    tsType: String.raw({ raw: strings }, ...tsTypes),
  };
}

export type JSONPointers<T> =
  Paths<T> extends string
    ? `/${Replace<Paths<T>, '.', '/', { all: true }>}`
    : never;

export type ToPath<T extends `/${string}`> = Replace<
  Replace<T, '/', ''>,
  '/',
  '.',
  { all: true }
>;

function toPath<P extends `/${string}`>(p: P) {
  const [, ...path] = p.split('/');
  return path.join('.') as ToPath<P>;
}

function get<O, P extends JSONPointers<O> = never>(
  o: O,
  p?: P,
): IfNever<P, O, Get<O, ToPath<P>>>;
function get<O, P extends JSONPointers<O> = never>(o: O, p?: P) {
  if (!p) {
    return o;
  }

  const path = toPath(p);
  return _get(o, path) as Get<O, ToPath<P>>;
}

/**
 * @internal
 */
class $Ref<
  S extends { pattern?: string; $id?: string },
  P extends JSONPointers<S> = never,
> {
  readonly $ref;
  readonly #string;

  constructor(schema: S, p?: P) {
    const d = get<S, P>(schema, p);
    for (const [key, value] of Object.entries(
      (d ?? {}) as Record<string, unknown>,
    )) {
      Object.defineProperty(this, key, { value });
    }

    type V = Get<IfNever<P, S, Get<S, ToPath<P>>>, 'pattern'>;
    // @ts-expect-error fix types for d later;
    this.#string = d?.pattern as V;

    const url = new URL(schema.$id ?? '', 'none:/');
    url.hash += p;
    this.$ref = url.toString().replace(/^none:\//, '');
  }

  toString() {
    return this.#string;
  }
}

/**
 * Automagical version of JSON Pointer `$ref`s
 */

export function $ref<
  S extends { $id?: string; pattern?: string },
  P extends JSONPointers<S> = never,
>(
  /** JSON Schema */
  schema: S,
  /** JSONPointer */
  p?: P,
) {
  type D = IfNever<P, S, Get<S, ToPath<P>, { strict: false }>>;
  return new $Ref<S, P>(schema, p) as $Ref<S, P> & D;
}

export function each<
  A extends readonly [...unknown[]],
  E extends ArrayValues<A>,
  R,
>(a: A, fun: <C extends E>(element: C) => R) {
  return Object.assign({}, ...a.map(fun as any));
}

export function merge<A, B>(a: A, b: B) {
  return _merge(a, b) as unknown as MergeDeep<A, B>;
}

export function properties<A, B>(a: A, b: B) {
  return {
    properties: _merge(a, b) as unknown as MergeDeep<A, B>,
  };
}
