import {JSONSchema8 as Schema} from 'jsonschema8';

const schema: Schema = {
	$id: 'https://formats.openag.io/oada/tree/v1.schema.json',
	$schema: 'http://json-schema.org/draft-07/schema#',
	description: 'An object representation of an OADA "tree".',
	type: 'object',
	properties: {
		_type: {
			$ref: '../../oada.schema.json#/definitions/_type',
		},
		_rev: {
			$ref: '../../oada.schema.json#/definitions/_rev',
		}
	},
	additionalProperties: {
		$ref: '#'
	}
}

export default schema
