/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema: Schema = {
  $id: 'https://formats.openag.io/modus/v1/global.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#/',
  description: 'Definitions for the Modus v1 standard for lab sample results.',
  $defs: {

    //--------------------------------------------------------
    // Defs added that are not native to json-schema:
    datetime: {
      type: 'string',
      // 2022-07-04T16:53:10
      // or 2022-07-04T16:53:10.435
      // or 2022-07-04T16:53:10.435Z+0500
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(.[0-9]+)?(Z([+]|-)[0-9]+)?$',
    },
    date: {
      type: 'string',
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
    },

    //-----------------------------------------------------------
    // From the Modus standard itself:
    FMISMetadata: {
      description: 'Element that contains data needed for FMIS "Field Management Information Systems"',
      type: 'object',
      properties: {
        FMISEventID: { 
          description: 'Unique code for the sample event. Often an internal UUID from an FMIS',
          type: 'string',
        },
        FMISProfile: { 
          description: 'Grower/Farm/Field Name and ID\'s for FMIS',
          $ref: '#/$defs/FMISProfile',
        },
        FMISAllowedLabEquations: {
          description: 'Lab defined equations that are allowed by the lab to be used in the FMIS',
          type: 'array',
          items: { $ref: '#/$defs/Equation' },
        },
      }
    },

    LabMetaData: {
      description: 'Metadata related to the testing lab',
      type: 'object',
      properties: {
        LabName: {
          description: 'The name of the lab that ran the results',
          type: 'string',
        },
        LabID: {
          description: 'ID for the lab that ran the results',
          type: 'string',
        },
        LabEventID: {
          description: 'Internal Lab ID for the event',
          type: 'string',
        },
        Contact: {
          description: 'Contact information at the lab',
          type: 'object',
          properties: {
            Name: { type: 'string' },
            PhoneNumber: { type: 'string' },
            Address: { type: 'string' },
          }
        },
        TestPackageRefs: { $ref: '#/$defs/TestPackageRefs' },
        ReceivedDate: {
          description: 'The date/time the sample where received at the lab',
          $ref: '#/$defs/datetime',
        },
        ProcessedDate: {
          description: 'The date/time the sample was processed by the lab',
          $ref: '#/$defs/datetime',
        },
        Reports: {
          // Key-ing by the report ID will enforce the "unique" constraint from the XSD
          description: 'List of lab reports, keyed by ReportID from the XML',
          type: 'object',
          patternProperties: {
            '.*': {
              type: 'object',
              properties: {
                ReportID: {
                  description: 'Unique ID for this report',
                  type: 'string',
                },
                LabReportID: {
                  description: 'ID the lab has assigned to the report',
                  type: 'string',
                },
                FileDescription: {
                  description: 'Description of the report file',
                  type: 'string',
                },
                File: {
                  description: 'The file data for the report. The lab has the choice to pass a URL or embed the file data.',
                  oneOf: [
                    {
                      type: 'object',
                      properties: {
                        URL: {
                          description: 'The url path to the report file',
                          type: 'object',
                          properties: {
                            FileName: { 
                              description: 'The name for the file',
                              type: 'string',
                            },
                            Path: {
                              description: 'The path to the file',
                              type: 'string',
                            }
                          },
                          required: [ 'Path' ],
                        },
                      }
                    }, {
                      type: 'object',
                      properties: {
                        FileData: {
                          description: 'The file data',
                          type: 'object',
                          properties: {
                            FileName: {
                              description: 'The name for the file',
                              type: 'string',
                            },
                            FileData: {
                              description: 'File data base64 encoded',
                              type: 'string',
                            },
                          },
                          required: [ 'FileData' ],
                        }
                      },
                    }
                  ],
                },
              },
              required: [ 'ReportID' ],
            },
          }, // end patternProperties from Reports
        }, // end Reports
        ClientAccount: {
          description: 'End user lab account information',
          type: 'object',
          properties: {
            AccountNumber: { type: 'string' },
            Name: { type: 'string' },
            Company: { type: 'string' },
            City: { type: 'string' },
            State: { type: 'string' },
          }, // end ClientAccount
        },
      },
    }, // end LabMetaData
    
    uuid: {
      type: 'string',
      pattern: '^.{36}$', // 36 characters long according to Modus standard
    },

    TestPackageRefs: {
      type: 'object',
      patternProperties: { // keyed by TestPackageID, must be unique
        // for some reason the standared requires TestPackageID to be an int, 
        // we'll call it an int-formatted string
        '[0-9]+': {
          type: 'object',
          properties: {
            TestPackageID: { 
              type: 'string', 
              pattern: '^[0-9]+$',
            },
            Name: { type: 'string' },
            LabBillingCode: { type: 'string' },
          },
          required: [ 'TestPackageID' ],
        }
      }
    }, // end TestPackageRefs

    Warnings: {
      type: 'object',
      patternProperties: { // keyed by warning_number
        '[0-9]+': {
          type: 'object',
          properties: {
            warning_number: { type: 'string', pattern: '^[0-9]+$' },
            message: { type: 'string' },
          },
        },
      },
    }, // end Warnings

    NutrientResults: {
      description: 'Nutrient results of a sample',
      type: 'array',
      items: {
        description: 'Result for a single element',
        type: 'object',
        properties: {
          Element: {
            description: 'Nutrient Element. See "Element List for Modus.xlsx" for supported elements',
            type: 'string',
          },
          Value: {
            description: 'The value of the element',
            type: 'number',
          },
          ValueUnit: {
            description: 'Unit of measure for the value',
            type: 'string'
          },
          ModusTestID: {
            description: 'Analysis Name from "Soil Analysis Nomenclature Modus.xlsx" or "Botanical Analysis Nomenclature Modus.xlsx"',
            type: 'string',
          },
          ValueType: {
            description: 'Type definition of the value',
            type: 'string',
            enum: [ 'Measured', 'Percent', 'Calculated', 'Index' ],
          },
          ValueDesc: {
            description: 'Value discription assigned by the lab.',
            type: 'string',
            enum: [ "Very Low", "Low", "Medium", "Optimum", "Very High", "VL", "L", "M", "O", "VH", "High", "H", ],
          },
        },
      },
    }, // end NutrientResults

    NutrientRecommendations: {
      type: 'array',
      items: {
        type: 'object', // A "NutrientRecommendation" is an object keyed by the underlying RecID for each recommendation
        patternProperties: {
          '[0-9]+': { // This represents one Recommendation, keyed by the RecID
            type: 'object',
            properties: {
              RecID: {
                type: 'string',
                pattern: '^[0-9]+$',
              },
              Element: {
                description: 'Name of the recommendation element',
                type: 'string',
              },
              Value: {
                description: 'Value of the recommendation',
                type: 'number',
              },
              ValueUnit: {
                description: 'Unit of the recommendation',
                type: 'string',
              },
            },
            required: [ 'RecID' ],
          },
        },
      },
    }, // end NutrientRecommendations

    NematodeResults: {
      type: 'array',
      items: {
        type: 'object', // This represents a 'NematodeResult' object
        properties: {
          Pest: {
            description: 'Name of the pest being reported',
            type: 'string',
          },
          ModusTestID: {
            description: 'ModusTestID found in "Nematode Analysis Nomenclature.xlsx" ',
            type: 'string',
          },
          Value: {
            description: 'Value/count of the pest',
            type: 'number',
          },
          ValueUnit: {
            description: 'Unit of the pest value/count',
            type: 'string',
          },
          ValueType: {
            description: 'Measured, Percent, Calculated, Index',
            type: 'string',
            enum: [ 'Measured', 'Percent', 'Calculated', 'Index' ],
          },
          ValueDesc: {
            type: 'string',
            enum: [ "Very Low",  "Low",  "Medium",  "Optimum",  "Very High",  "VL",  "L",  "M",  "O",  "VH", ],
          },
          LifeStageValues: {
            description: 'Place to report the counts of the different life stages',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                LifeStage: {
                  description: 'Life stage',
                  type: 'string',
                  enum: [ 'Egg', 'Juvenile', 'Adult', 'Dead', '' ],
                },
                Value: {
                  description: 'Value/Count of the pest lifestage',
                  type: 'string', // the standard did not define this as a number, oddly enough
                },
                ValueUnit: {
                  description: 'Unit of the value/count',
                  type: 'string',
                },
                ValueType: {
                  description: 'Measured, Percent, Calculated, Index',
                  type: 'string',
                  enum: [ 'Measured', 'Percent', 'Calculated', 'Index' ],
                },
                ValueDesc: {
                  type: 'string',
                  enum: [ "Very Low",  "Low",  "Medium",  "Optimum",  "Very High",  "VL",  "L",  "M",  "O",  "VH", ],
                },
              },
            },
          },
        },
      },
    }, // end NematodeResults
          
    ResidueResults: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          CASRN: {
            type: 'string',
            pattern: '^.{1,50}$', // string of length 1 to 50
          },
          Value: { type: 'number' },
          ValueUnit: { type: 'string' },
          ValueType: { type: 'string' },
          ValueDesc: { type: 'string' },
        },
      },
    }, // end ResidueResults

    Comments: {
      type: 'string',
    }, // end Comment

    TextureResults: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          SoilClassification: { type: 'string' },
          PercentClay: { type: 'string' },
          PercentSilt: { type: 'string' },
          PercentSand: { type: 'string' },
          Density: { 
            type: 'object',
            properties: {
              Value: { type: 'number' },
              Unit: { type: 'string' },
            },
          },
        },
      },
    }, // end TextureResults
   
    SensorResults: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ValueDesc: { type: 'string' },
          ValueUnit: { type: 'string' },
          Value: { type: 'number' },
        },
      },
    }, // end SensorResults

    // This one is tough to translate.  It was something like <EventType><Soil></EventType>,
    // except for the Plant type which contained sub-elements of PlantPart and Crop.  I'll make
    // this an object therefore, and the simple things like Soil will just be a key with boolean 'true'
    // for the value
    EventType: {
      type: 'object',
      properties: {
        Soil: { const: true }, // if it exists, it is the value true
        Plant: {
          type: 'object',
          properties: {
            PlantPart: { type: 'string' },
            Crop: { $ref: '#/$defs/Crop' },
          },
        },
        Nematode: { const: true },
        Water: { const: true },
        Residue: { const: true },
      },
    }, // end EventType

    SampleMetaData: {
      description: 'Metadata for a sample in the sample event',
      type: 'object',
      properties: {
        SampleNumber: { 
          description: 'Sample Number give the sample by during sample collection',
          type: 'string',
        },
        FMISSampleID: {
          description: 'Unique ID asigned by an FMIS for the sample',
          type: 'string',
        },
        SampleContainerID: {
          description: 'Unique ID for the sample bag or container. i.e. Bar code',
          type: 'string',
        },
        SampleGroupID: {
          description: 'ID number to reference different samples as one group',
          type: 'integer',
        },
        ReportID: {
          description: 'ID number to relate which lab report contains the sample',
          type: 'integer',
        },
        OverwriteResult: {
          description: 'Flag to indicate if this result is to overwrite any previous results. e.g. for correcting a mistake.',
          type: 'boolean',
        },
        Geometry: {
          description: 'WKT Geometry Source: http://en.wikipedia.org/wiki/Well-known_text Limit types to Point, Polygon and MultiPolygon',
          type: 'object',
          properties: {
            epsg: {
              description: 'Projection ID of the Geometry Source: http://spatialreference.org/ref/?page=1 Default is WGS84 - Lat,Lon    epsg: 4326',
              type: 'integer',
              default: 4326
            },
          },
        },
        SubSamples: {
          description: 'Sub Samples is where the location of the cores within a sample can be recored',
          type: 'array',
          items: {
            description: 'One sub sample / core',
            type: 'object',
            properties: {
              SubSampleNumber: {
                description: 'ID number assigned during collection.',
                type: 'integer',
                minimum: 0,
              },
              SubSampleID: {
                description: 'Unique ID for the sub-sample asigned by an FMIS',
                type: 'string',
              },
              Geometry: {
                description: 'WKT Geometry Source: http://en.wikipedia.org/wiki/Well-known_text Limit types to Point, Polygon and MultiPolygon',
                type: 'object',
                properties: {
                  epsg: {
                    description: 'Projection ID of the Geometry Source: http://spatialreference.org/ref/?page=1 Default is WGS84 - Lat,Lon    epsg: 4326',
                    type: 'integer',
                    default: 4326
                  },
                },
              },
            },
          },
        }, // end SampleMetaData.SubSamples
        TestPackages: {
          description: 'The lab test packages used for the sample.',
          type: 'array',
          items: { 
            type: 'string', // array of strings that are the TestPackageID's, they should all be unique
          },
        }, // end SampleMetaData.TestPackages

      },
    }, // end SampleMetaData

    DepthRefs: { // object keyed by DepthID
      description: 'Place to define a reference list for the depths used in the sample event',
      type: 'object',
      patternProperties: {
        '[0-9]+': { // keyed by DepthID
          description: 'A single depth',
          type: 'object',
          properties: {
            Name: {
              description: 'Name given to the depth to be used for display by FMIS systems. ex Depth 1, 6"',
              type: 'string',
            },
            StartingDepth: {
              description: 'Depth at the sart of the column depth in the DepthUnit',
              type: 'integer',
              minimum: 0,
            },
            EndingDepth: {
              description: 'Depth at the end of the column depth in the DepthUnit',
              type: 'integer', 
              minimum: 0,
            },
            ColumnDepth: {
              description: 'Total column depth (End - Start) in the DepthUnit',
              type: 'integer',
              minimum: 0,
            },
            DepthUnit: {
              description: 'Unit the depth is reported in.',
              type: 'string',
            },
            DepthID: {
              description: 'Unique Sequential ID',
              type: 'integer',
              minimum: 1,
            },
          },
        },
      },
      required: [ 'DepthID' ],
    }, // end DepthRefs

    RecommendationRefs: { // keyed by RecID
      description: 'Reference documentation to a lab recommendation',
      type: 'object',
      patternProperties: {
        '[0-9]+': {
          $ref: '#/$defs/Recommendation'
        },
      },
    }, // end RecommendationRefs

    RecommendationRequests: { // keyed by RecID
      description: 'Reference documntation to a lab recommendation',
      type: 'object', 
      patternProperties: {
        '[0-9]+': {
          $ref: '#/$defs/Recommendation'
        }
      },
    }, // end RecommendationRequests

    Crop: {
      type: 'object',
      properties: {
        Name: { type: 'string' },
        ClientID: { type: 'string' },
        GrowthStage: {
          type: 'object',
          properties: {
            Name: { type: 'string', },
            ClientID: { type: 'string' }, // why is this here?
          },
        },
        SubGrowthStage: {
          type: 'object',
          properties: {
            Name: { type: 'string', },
            ClientID: { type: 'string' }, // why is this here?
          },
        },
      },
    }, // end Crop

    SiteAttributes: {
      type: 'object',
      properties: {
        Tillage: { type: 'string' },
        Irrigated: { type: 'boolean' },
        Tilled: { type: 'boolean' },
        PrevCrop: { type: 'string' },
        Variables: { // keyed by Name
          description: 'Used to store additional variables to be passed through',
          type: 'object',
          patternProperties: {
            '.*': { // keyed by Name
              type: 'object',
              properties: {
                Name: { type: 'string' },
                Value: { type: 'string' },
                Unit: { type: 'string' },
              },
              required: [ 'Name' ],
            },
          },
        },
      },
    }, // end SiteAttributes

    EventMetaData: {
      type: 'object',
      properties: {
        EventCode: {
          description: 'Unique human readable code for the sample event. Often referred to a Layer ID',
          type: 'string',
        },
        EventDate: {
          description: 'Date the sample event was collected in the field',
          $ref: '#/$defs/date',
        },
        EventType: { 
          $ref: '#/$defs/EventType' 
        },
        EventExpirationDate: {
          description: 'The date the data in the even is to expire for use in a recommendation',
          $ref: '#/$defs/date',
        },
      },
    }, // end EventMetaData

    Equation: {
      description: 'Lab equation that is perminited to be used on this data set',
      type: 'object',
      properties: {
        Name: {
          description: 'Name of the equation',
          type: 'string',
        },
        Version: {
          description: 'Verison of the lab equation',
          type: 'string',
        },
        Default: {
          description: 'Set if an equation is to be the default equation',
          type: 'boolean',
        },
        ID: {
          description: 'ID of the equation given by the lab',
          type: 'string',
        },
      },
    }, // end Equation

    // These are all tough to translate because they are a string, but the tag has an ID field.
    // We'll call the string 'name', and then we can include the ID as well in the object
    FMISProfile: {
      type: 'object',
      properties: {
        Grower: {
          type: 'object',
          properties: {
            name: { type: 'string' }, // the string between the tags in the XML
            ID: { type: 'string' }, // the attribute on the tag itself
          },
        },
        Farm: {
          type: 'object',
          properties: {
            name: { type: 'string' }, // the string between the tags in the XML
            ID: { type: 'string' }, // the attribute on the tag itself
          },
        },
        Field: {
          type: 'object',
          properties: {
            name: { type: 'string' }, // the string between the tags in the XML
            ID: { type: 'string' }, // the attribute on the tag itself
          },
        },
        'Sub-Field': {
          type: 'object',
          properties: {
            name: { type: 'string' }, // the string between the tags in the XML
            ID: { type: 'string' }, // the attribute on the tag itself
          },
        }, 
      },
    }, // end FMISProfile

    SubmissionAttributes: {
      description: 'Attributes that needed to be passed through for reference and recomdation.',
      type: 'object',
      properties: {
        SubmittedBy: {
          description: 'Person submiting the sample',
          type: 'string',
        },
        SubmittedFor: {
          description: 'Person or company the sample is being submited for.',
          type: 'string',
        },
        SiteAttributes: {
          description: 'Attributes that are collected for the site the sample are collected from.',
          $ref: '#/$defs/SiteAttributes',
        },
        RecommendationRequests: {
          description: 'Reference documntation for a lab recommendation',
          $ref: '#/$defs/RecommendationRequests',
        },
      },
    }, // end SubmissionAttributes

    Recommendation: {
      type: 'object',
      properties: {
        Name: {
          description: 'Name for the recommendation',
          type: 'string',
        },
        Variables: {
          description: 'List of the variables used in the recommendation',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              Name: {
                description: 'Name of variable used in the recommendation',
                type: 'string',
              },
              Value: {
                description: 'Value of the variable used in the recommendation',
                type: 'string', // elsewhere this sort of thing is a number
              },
              Unit: {
                description: 'Unit of the variable',
                type: 'string',
              },
            },
          },
        },
        Equation: {
          $ref: '#/$defs/Equation',
        },
        DisplayOrder: {
          description: 'Order the FMIS should display the rec in.',
          type: 'integer',
          minimum: 1,
        },
        ExpirationDate: {
          description: 'The date the rec expires and should nolonger be used.',
          $ref: '#/$defs/date',
        },
        RecID: {
          description: 'Id to be referenced in the sample',
          type: 'integer',
          minimum: 1,
        },
      },
      required: [ 'RecID' ], // things are keyed by this above, so it is required
    }, // end Recommendation

  },
};

export = schema;
