/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
import { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/trellis/service/master-data-sync/product.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Product JSON format for master-data-sync',
  type: 'object',
  properties: {
    'sapid': {
      type: 'string',
    },
    'SupplierId': {
      type: 'string',
    },
    'ProductId': {
      type: 'string',
    },
    'LastUpdated': {
      type: 'string',
    },
    'ProductName': {
      type: 'string',
    },
    'DisplayName': {
      type: 'string',
    },
    'GTIN14': {
      type: 'string',
    },
    'GPCFamily': {
      type: 'string',
    },
    'GPCClass': {
      type: 'string',
    },
    'Brand': {
      type: 'string',
    },
    'CountryOfOrigin': {
      type: 'string',
    },
    'Description': {
      type: 'string',
    },
    'NetContent': {
      type: 'string',
    },
    'GradeCode': {
      type: 'string',
    },
    'IsPackaged': {
      type: 'boolean',
    },
    'PluCode': {
      type: 'string',
    },
    'SaleUnitUPC': {
      type: 'string',
    },
    'ProductType': {
      type: 'string',
    },
    'Supplier': {
      type: 'string',
    },
    'Active': {
      type: 'boolean',
    },
    'ForHumanConsumption': {
      type: 'boolean',
    },
    'SupplierProductCode': {
      type: 'string',
    },
    'WarehouseOrDirectDelivery': {
      type: 'string',
    },
    'Status': {
      type: 'string',
    },
    'MaterialId': {
      type: 'string',
    },
    'MaterialDescription': {
      type: 'string',
    },
    'MaterialGroup': {
      type: 'string',
    },
    'ProductHierarchy': {
      type: 'string',
    },
    'PH-L1': {
      type: 'string',
    },
    'PH-L2': {
      type: 'string',
    },
    'PH-L3': {
      type: 'string',
    },
    'PH-L4': {
      type: 'string',
    },
    'PH-L5': {
      type: 'string',
    },
    'PrimaryProducer': {
      type: 'string',
    },
    'Div': {
      type: 'string',
    },
  },
  required: [
    'sapid',
    'ProductName',
    'ProductType',
    'SupplierId',
    'Status',
    'MaterialId',
    'MaterialDescription',
    'MaterialGroup',
    'ProductHierarchy',
    'PH-L1',
  ],
  examples: [
    {
      'sapid': '12345',
      'SupplierId': '56789',
      'ProductId': '12345',
      'LastUpdated': '2022-02-03',
      'ProductName': 'Organic Apple',
      'DisplayName': 'Organic Apple',
      'GTIN14': 'GTIN14',
      'GPCFamily': 'GTINFamily',
      'GPCClass': 'GPCClass',
      'Brand': 'Brand',
      'CountryOfOrigin': 'Canada',
      'Description': 'Organic Apples',
      'NetContent': '',
      'GradeCode': 'Grade Code',
      'IsPackaged': true,
      'PluCode': 'PluCode',
      'SaleUnitUPC': 'Sale Unit',
      'ProductType': 'Fruit',
      'Supplier': 'Apple Corp LLC',
      'Active': true,
      'ForHumanConsumption': true,
      'SupplierProductCode': 'SupplierCode',
      'WarehouseOrDirectDelivery': 'Warehouse',
      'Status': 'Active',
      'MaterialId': '5555555',
      'MaterialDescription': 'Material',
      'MaterialGroup': 'Group',
      'ProductHierarchy': 'Hierarchy',
      'PH-L1': 'PH-L1',
      'PH-L2': 'PH-L2',
      'PH-L3': 'PH-L3',
      'PH-L4': 'PH-L4',
      'PH-L5': 'PH-L5',
      'PrimaryProducer': 'Apple Corp LLC',
      'Div': 'packaged',
    },
  ],
};

export default schema;
