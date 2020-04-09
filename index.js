"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const glob_1 = require("glob");
// Use every .schema.ts file we have
exports.glob = glob_1.sync('/**/*.schema.{ts,js}', {
    cwd: __dirname,
    root: __dirname,
    nomount: true
}).map(key => key.replace(/\/+/, '/').replace(/\.(ts|js)$/, '.json'));
// Find all the schemas
function* default_1() {
    for (const key of exports.glob) {
        const infile = key.replace(/^\//, './').replace(/\.json$/, '');
        const { default: schema } = require(infile);
        const path = path_1.join(__dirname, key);
        yield { schema, key, path };
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map