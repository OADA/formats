/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import traverse from 'json-schema-traverse';

// Define missing keywords
Object.assign(traverse.propsKeywords, {
  $defs: true,
  dependentSchemas: true,
  dependentRequired: true,
});
Object.assign(traverse.skipKeywords, {
  $id: true,
  $schema: true,
  examples: true,
  $comment: true,
  description: true,
  title: true,
});

export { default } from 'json-schema-traverse';
