import * as traverse from 'json-schema-traverse'

// Define missing keywords
Object.assign(traverse.propsKeywords, {
  $defs: true,
  dependentSchemas: true,
  dependentRequired: true
})
Object.assign(traverse.skipKeywords, {
  $id: true,
  $schema: true,
  examples: true,
  $comment: true,
  description: true,
  title: true
})

export default traverse
