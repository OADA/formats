"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const mkdirp = require("mkdirp");
const _1 = require("./");
// Where to output compiled schemas
const schemasDir = path_1.resolve('lib', 'schemas');
// Compile the schema files to JSON and to TypeScript types
async function doCompile() {
    // "Compile" schemas to JSON
    for (const { key, schema } of _1.default()) {
        const outfile = path_1.join(schemasDir, key.replace(/\.ts$/, '.json'));
        console.debug(`Writing ${key} schema as JSON`);
        await mkdirp(path_1.dirname(outfile));
        await fs_1.promises.writeFile(outfile, JSON.stringify(schema, null, 2));
    }
}
doCompile();
//# sourceMappingURL=compile.js.map