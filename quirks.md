## Quirks due to json-schema-to-typescript

1. `const` is not supported (but can use singleton `enum`)

2. `$defs` does not produce TS types (but `definitions` does)

3. Nesting schemas within each other is not supported.

4. Schemas with just a number as id do not compile properly (e.g., use v1 not
   just 1)
