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
  $id: 'https://formats.openag.io/modus/slim/v1/0.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  $comment: 'A Flatter version of modus v1',
  description: `
    This schema is expected to handle both the original "submission" and "result" schemas
    in Modus.  In this schema, a "submission" is simply a "result" with some things not
    filled out (like the results, obviously).

    The general structure of this schema is one of a global "default" which can be overridden 
    in particular samples with the same schema, just specifying the keys that differ from 
    the default.  i.e. the "lab" key at the top level can specify things about the lab that
    are common across all samples, but then the "lab" key under any given sample would specify 
    things that the lab needs to record that are specific to the sample.
  `,


  //---------------------------------------------------------------
  // Re-used definitions:
  //---------------------------------------------------------------


  $defs: {

    id: { 
      type: 'string', 
      description: 'A sufficiently unique string to identify things, in any form.' 
    },

    aliasid: {
      type: 'string',
      description: 'A reference to an id that can be found physically on a sample such as a bar code or QR code',
    },

    sourcedId: {
      type: 'object',
      properties: {
        source: { 
          enum: [ 'local' ],
          description: `
            A string representing the place that assigned this id.  If the id does not come 
            from any official list, use "local".  The value of this id should be considered
            unique within the source list.  If "local" is used, in order to ensure global
            uniqueness, a random (or at least sufficiently unique) string should be generated.  
            For example, the id "ABCLabs_RoanokeVA" is sufficiently unique to represent an ID
            for that particular lab, and preferred to simply a UUID.  A given "local" should 
            use the same unique string to represent the same thing in subsequent documents.
          `
        },
        value: { 
          type: 'string', 
          description: 'The actual sufficiently-unique string that is the id from this souce.',
    } } },

    person: {
      type: 'object',
      description: 'Used for contacts at the lab and the source',
      properties: {
        name: { type: 'string' },
        phone: { type: 'string' }, 
        address: { type: 'string' },
        email: { type: 'string', format: 'email' },
      },
    },

    client: {
      type: 'object',
      description: 'A description of the client of either the lab or the source.',
      properties: {
        accountNumber: { type: 'string' },
        name: { type: 'string', },
        address: { type: 'string' },
        contact: { 
          $ref: '#/$defs/person',
          description: `Who to contact at the client about this report.`
        },
      },
    },

    report: {
      type: 'object',
      description: `
        This represents information about this document as seen by either the lab or th source, 
        depending on which key this report is under (lab or source).
        i.e. this Modus document is a "report".  This is different than how Modus v1.0 used the word 
        report, which was to represent PDF files separate from the Modus file.  This schema places 
        those things under the files key.`,
      properties: {
        id: { 
          $ref: '#/$defs/id',
          description: `
            The id of this document at the lab or source, depending on which key it is under,
            (lab or source).  If the lab creates this document first,
            then it should use this id also as the top-level id on the document, unless
            it is not sufficiently random to avoid conflict with other labs' documents.
            In that case, the lab should assign a UUID to the top level and use its own 
            internal id here.
          `,
        },
        date: {
          type: 'string',
          format: 'date', // YYYY-MM-DD
          description: 'Date the results were added to this report by the lab.',
        },
      }
    },

    files: {
      description: `
        Some labs include either a URI or a base64-encoded PDF in their Modus v1 files.
        This files object is simply an unordered set of files, keyed by random string
        identifiers.  If the file is to be referened in the samples, the file must have an
        id and the id must be the same as the key in this files object.  There can be multiple 
        associdate files (PDF, XLSX, CSV, etc.).  The file type should be inferrable from the 
        name on each file object.
      `,
      additionalProperties: {
        type: 'object',
        description: `
          If you want to include the actual file, base64 encode it and put it in the base64 key.
          Otheriwse, it can be at a URI.  The file type should be inferred from the extension on 
          the name (i.e. something.pdf).
        `,
        properties: {
          id: { 
            type: 'string', 
            description: `
              An ID for the file.  If you want to refer to the file in the any given samples,
              you need this id in order to refer to it with fileid.
            `,
          },
          name: { type: 'string', description: 'The filename of the file.' },
          description: { type: 'string' },
          uri: { type: 'string', format: 'uri' },
          base64: { type: 'string', description: 'The base64-encoded bytes of the file.' },
        },
      },
    },

    depth: {
      type: 'object',
      properties: {
        name: { 
          type: 'string', 
          description: `
            A human-readable version of this depth.  Entirely optional and here primarily for 
            backwards compatibility.  If an older file or spreadsheet uses a string for the depth
            that is not easily parsable, it can be put as the name for posterity.  If you know the
            starting/ending depths, just put those in their resepective places instead.
          `,
        },
        top: {
          type: 'number',
          description: 'The top of the depth range being sampled.  Should be less than the bottom.'
        },
        bottom: {
          type: 'number',
          description: 'The bottom of the depth range being sampled.  Should be greater than top.'
        },
        units: {
          type: 'string',
          description: 'Any valid UCUM string representing a length, such as "in" or "cm".'
        },
      },
    },

    geolocation: {
      type: 'object',
      description: `
        Represents where a sample was taken.  This can be global for all samples (i.e. a field boundary),
        or, more ideally, a lat/lon for each point.  If you just have a lat/lon point in the WGS84 datum, 
        just put the lat/lon in this object.  For all other geometries, use geojson.  If both lat/lon and
        geojson are present for a geolocation, lat/lon takes precedence.
      `,
      properties: {
        lat: { type: 'number', description: 'Latitude in the WGS84 datum' },
        lon: { type: 'number', description: 'Longitude in the WGS84 datum' },
        geojson: { type: 'object', description: 'GeoJSON representation of this location.' },
      },
    },


    lab: {
      type: 'object',
      description: `
        This represents information about and for the lab that is producing the results.
        It exists at the top-level of the document for any items that apply to all samples
        and results in the document, and then it can also exist within samples or results
        to specify things specific to that sample or result.  Each sample or result's lab
        object should be considered a "deep merge" of the top-level lab object and the
        more specific lab object within the sample.  Any keys present in both the top-level
        lab object AND the sample-level object should be considered to be overridden in the
        sample-level object (i.e. they replace the top-level key in the merge).
      `,
      properties: {
        id: { $ref: '#/$defs/sourcedId' },
        name: { type: 'string' },
        contact: {
          type: 'object',
          description: 'Information about how to contact the lab',
          properties: {
            name: { type: 'string' },
            phone: { type: 'string' }, 
            address: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
        client: {
          $ref: '#/$defs/client',
          description: `Info on the lab's client, as seen by the lab.`,
        },
        dateReceived: {
          type: 'string',
          format: 'date-time', // YYYY-MM-DDTHH:mm:ss+HH:mm (ISO8601)
          description: 'Day and time the lab received the samples.  Could be overriden per-sample if needed.',
        },
        dateProcessed: {
          type: 'string',
          format: 'date-time',
          description: 'Day and time the lab processed the samples.  Could be overriden per-sample if needed.',
        },

        report: {
          $ref: '#/$defs/report',
          description: `
            Information about this Modus document (id, date, etc.) as seen from the lab's
            perspective.  Refer to the $def for more informaiton.
          `,
        },
        files: {
          $ref: '#/$defs/files',
          description: `
            Information representing other files associated with this Modus document at the lab.  
            Refer to the $defs for more information.
          `,
        },


        // Sample-specific things:
        sampleid: {
          type: 'string',
          description: `
            ID of the sample assigned by the lab.  This is not likely to be meaningful at the top-level,
            and should therefore only appear in the sample's version of the lab key.
          `,
        },
        aliasid: {
          $ref: '#/$defs/aliasid',
          description: `
            An id for a sample that can be found physically on it such as a bar code or QR code, as seen by the lab.
          `,
        },
        fileids: {
          type: 'array',
          description: `
            An array of fileid's in the list of files which are associated with this sample.  Like sampleid,
            this is not likely meaningful at the top level and should only really appear in the sample-specific
            lab keys.
          `,
          items: {
            type: 'string',
            description: 'Refers to a file in the list of files which is associated with this sample.',
          },
        },

      },
    }, // end of lab

    source: {
      type: 'object',
      description: `
        This object represents information about the "source" of the samples.  It is generally
        about whomever sent the samples to the lab, and may original at the source, or be added
        by the lab if known.  It's purpose is primarily to identify this document and relate it
        to other data at the source, such as a field where the samples were taken.  The lab should
        passthru anything found here when adding results if the source originated the document.
      `,
      properties: {
        id: { 
          $ref: '#/$defs/sourcedId',
          description: `
            An identifier for the source.  If self-assigned, use the "local" source.  Please
            refer to the id for the lab above: this follows the same rules and conventions.
          `,
        },
        
        date: {
          type: 'string',
          format: 'date', // YYYY-MM-DD
          description: `
            Date samples were collected at the source.  If known, this should be the date used
            as the top-level date for the document.  This can be overridden per-sample under the
            source key in each sample, so different samples can have different dates representing 
            different dates of collection.
          `,
        },

        contact: { 
          $ref: '#/$defs/person',
          description: `Who to contact at the source for this document.`,
        },

        client: {
          $ref: '#/$defs/person',
          description: `If the source is submitting on behalf of their own client, put that info here.`,
        },

        report: {
          $ref: '#/$defs/report',
          description: `
            Information about this Modus document (id, date, etc.) as seen from the source's
            perspective.  Refer to the $def for more informaiton.
          `,
        },
        files: {
          $ref: '#/$defs/files',
          description: `
            Information representing other files associated with this Modus document at the source.  
            Refer to the $defs for more information.
          `,
        },


        // Metadata-style things, like those from an FMIS:
        grower: {
          type: 'object',
          properties: {
            id: { $ref: '#/$defs/id' },
            name: { type: 'string' },
          },
        },
        farm: {
          type: 'object',
          properties: {
            id: { $ref: '#/$defs/id' },
            name: { type: 'string' },
          },
        },
        field: {
          type: 'object',
          properties: {
            id: { $ref: '#/$defs/id' },
            name: { type: 'string' },
          },
        },
        subfield: {
          type: 'object',
          properties: {
            id: { $ref: '#/$defs/id' },
            name: { type: 'string' },
          },
        },

        // Sample-specific things
        sampleid: { 
          type: 'string',
          description: `
            ID of the sample assigned by the source.  This is not likely to be meaningful 
            at the top-level and therefore should only be used within the source key in
            each sample.
          `,
        },

        aliasid: {
          $ref: '#/$defs/aliasid',
          description: `
            An id for a sample that can be found physically on it such as a bar code or QR code, as seen by the source.
          `,
        },

        fileids: {
          type: 'array',
          description: `
            An array of fileid's in the list of files which are associated with this sample.  Like sampleid,
            this is not likely meaningful at the top level and should only really appear in the sample-specific
            lab keys.
          `,
          items: {
            type: 'string',
            description: 'Refers to a file in the list of files which is associated with this sample.',
          },
        },


      },
    }, // end source


  }, // end of all defs



  //---------------------------------------------------------------
  // Main Schema
  //---------------------------------------------------------------


  type: 'object',
  properties: {
    _type: { 
      const: 'application/vnd.modus.slim.v1.0+json',
      description: `Content type for API responses.  Must also be present on the document.`,
    },

    //--------------------------------------------------------
    // Properties of this document as a whole:
    //--------------------------------------------------------

    id: { 
      $ref: '#/$defs/id',
      description: `
        The "id" on the overall document is set by the original creator and should not be modified.
        Both the lab and source have the option to set their own internal ID's in their respective
        areas.  It is expected (but not required) that if the lab originally creates the document,
        the id on the document will be the same as the id under the lab key, and similar for the
        source.  Any two documents with the same top-level id should be considered the same.
      `,
    },

    date: { 
      type: 'string',
      format: 'date', // YYYY-MM-DD
      description: `
        This is intended as the most significant, known date at the time of document creation.
        It will be used as the primary "date" that systems can use to index this document.
        Ideally, it is the date that the samples were collected in the field.  However, in the
        event that date is not known, for example if the lab is the first creator of the document
        and the lab does not know the date the samples were collected, then the lab should assign
        the date as the earliest date of significance, i.e. the date the lab received the samples.
        Should a better date be determined later (i.e. the source receives the document from the
        lab and can put in the actual sample collection date), the date should be changed to the
        more significant date.
      `,
    },

    name: { 
      type: 'string',
      description: `
        An optional short string that the source may use as a human-readable means of identifying
        the group of samples in this document.
      `,
    },

    description: {
      type: 'string',
      description: `
        If the name is not long enough, more information can be put here about this group of 
        samples.
      `,
    },

    type: {
      enum: [ 'soil', 'plant-tissue', 'nematode', 'water', 'residue' ],
      description: `
        This represents the type of samples and results to be found in this document.  Mixing-and-matching
        samples and types is not allowed: create multiple documents if you need to do that.  "type" here
        is top-level: i.e. it applies to all samples and results in this document.
      `,
    },


    //---------------------------------------------------------
    // Everything below this can be overridden at sample level
    //---------------------------------------------------------


    depth: {
      $ref: '#/$defs/depth',
      description: `
        If all or most of the samples in this document were taken at the same depth, you can place the depth 
        here globally and then override any sample-specific depths within the individual samples.
      `,
    },

    geolocation: {
      $ref: '#/$defs/geolocation',
      description: `
        Any geolocation information that relates to all samples globally should go here.  For example,
        a boundary containing all the points that were sampled.  If you have point-specific location
        information, it should go in the sample-specific geolocation key under each sample.
      `,
    },

    crop: {
    },

    //---------------------------------------------------------------
    // Any lab or source internals can be overridden at sample level
    //---------------------------------------------------------------

    lab: { 
      $ref: '#/$defs/lab',
      description: `
        See description in the $defs.  This represents global information about and for the lab
        which applies docuent-wide (i.e. all samples and all results).
      `
    },

    source: {
      $ref: '#/$defs/source',
      description: `
        See description in the $defs.  This represents global information about and for the source
        which applies document-wide (i.e. all samples and all results).
      `,
    },


    samples: {
      description: `
        The list of samples, keyed by their respective id's.
      `,
      additionalProperties: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/$defs/id',
            description: `
              An ID for this sample, assigned by whomever first creates this document containing this sample.  It must
              be the same as the key in the samples object (i.e. where this sample resides in the list).  It must
              be unique at least within this document.  If you want a globally unique sampleid, prefix this id with the
              id at the top-level of this document.  

              If the lab creates this document first, this should be the same as the lab.sampleid.  If the source
              creates this sample first, it should be the same as the source.sampleid.  However, it can also just
              be assigned as something other than both, so this is just a recommendation.
            `,
          },

          lab: {
            $ref: '#/$defs/lab',
            description: `
              Sample-specific overrides for anything in the top-level lab key.
            `,
          },

          source: {
            $ref: '#/$defs/source',
            description: `
              Sample-specific overrides for anything in the top-level source key.
            `,

          },

          depth: { 
            $ref: '#/$defs/depth',
            description: 'The depth that this sample was taken.  Overrides the top-level depth for this sample.',
          },

          geolocation: {
            $ref: '#/$defs/geolocation',
            description: `
              Geolocation where this sample was taken.  Can be lat/lon (preferred) or geojson.
              Refer to the $ref for more information.
            `,
          },

          results: {
            type: 'object',
            description: `
              A list of all the lab results associated with this sample, keyed by a sufficiently-unique string.
              Note that since some analytes could be present multiple times, this should just be a random string.
            `,
            additionalProperties: {
              type: 'object',
              properties: {
                analyte: {
                  type: 'string',
                  description: `
                    This should be the part of the Modus 2.0 test ID that is between the third and 
                    fourth underscores: L_MODV2_SOIL_B_016 -> analyte: B.  Refer to the Modus 2.0 spreadsheet
                    for the complete list of known analytes.
                  `,
                },
                value: {
                  description: `
                    The value of this lab result for this analyte.  If it is numeric in nature, the type
                    should be number.  If it cannot be reprented as a number, then it should be a string.
                  `,
                  oneOf: [
                    { type: 'number' },
                    { type: 'string' },
                  ]
                },
                units: {
                  type: 'string',
                  description: 'The units for this value.  Any UCUM-compliant string should be valid.'
                },
                modusTestID: {
                  type: 'string',
                  description: `
                    The Modus v2.0 (preferred) ID for the test that produced this result, or the Modus v1.0
                    test ID.  If neither is known, do not include this key.  It is recommended to always
                    include the Modus v2.0 test ID if it is known.
                  `,
                },
              },
            },
          }, // end of results
        }, // end of sample
      },
    }, // end of samples


  },
  required: [ 'id', 'date', 'type' ],


  //-----------------------------------------------------------------
  // EXAMPLES:
  //-----------------------------------------------------------------


  // More examples can be found at https://github.com/oats-center/modus/examples
  examples: [
    {
      _type: 'application/vnd.modus.slim.v1.0+json',

      id: 'ece3a2a8-4340-48b1-ae1f-d48d1f1e1692',
      date: '2021-09-24',
      name: "Samples taken last sunday",

      type: 'soil',

      lab: {
        id: { source: 'local', value: '1' },
        name: 'A & L Great Lakes Laboratories',
        contact: {
          name: 'A & L Great Lakes Laboratories',
          phone: '260.483.4759',
          address: '3505 Conestoga Dr.\nFort Wayne, IN 46808',
        },
        dateReceived: '2021-09-24T00:00:00.000',
        dateProcessed: '2021-09-28T00:00:00.000',
        clientAccount: {
          accountNumber: '30039',
          company: 'THE ANDERSONS FARM CTR - GPS',
          city: 'N MANCHESTER',
          state: 'IN',
        },
        report: {
          id: 'F21271-0035',
          date: '2021-09-25',
        },

      },

      source: {
        report: {
          id: "02iojfkeldjsldfssdf",
        },
        grower: { id: 'dfj20foekdlf', name: 'CARL AULT' },
        farm: { id: 'kdjf02ijfoeklew', name: 'ENYART' },
        field: { id: 'idkjf20fijoed', name: 'EAST50' },
        // Can also have subfield
      },

      samples: {
        "0djfi2iekldsfj02i": { // this key is only required to be "sufficiently random within this document
          lab: { sampleid: '28_051' },
          source: { sampleid: 'ABC-1' },

          /*
          depth: {
            id: '02ijflkj2ef',
            name: 'Hmmm...', // here only for backwards compatibility
            top: 0,
            bottom: 8,
            units: 'in'
          }
          */


          /*
          geolocation: {
            id: 'kd02jkfldf',
            lat: 12.342342, 
            lon: -93.4889343,
            geojson: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [ 12.342342, -93.4889343 ] } },
          }*/

          results: {
            // The "analyte" should be the part of the Modus 2.0 test ID that is between 
            // the third and fourth underscores: L_MODV2_SOIL_B_016 -> analyte: 'B'
            'kfj290ji': { analyte: 'PH', value: 7, units: 'none', modusTestID: 'S-PH-1:1.02.07', },
            '2fj290ji': { analyte: 'OM', value: 2.4, units: '%', modusTestID: 'S-SOM-LOI.15', },
            '3fj290ji': { analyte: 'P', value: 34, units: 'ppm', modusTestID: 'S-P-B1-1:10.01.03', },
            '4fj290ji': { analyte: 'K', value: 161, units: 'ppm', modusTestID: 'S-K-NH4AC.05', },
            '5fj290ji': { analyte: 'CA', value: 1150, units: 'ppm', modusTestID: 'S-CA-NH4AC.05', },
            '6fj290ji': { analyte: 'Mg', value: 240, units: 'ppm', modusTestID: 'S-MG-NH4AC.05', },
            '7fj290ji': { analyte: 'CEC', value: 8.2, units: 'meq/100g', modusTestID: 'S-CEC.19', },
            '8fj290ji': { analyte: 'CABS', value: 70.4, units: '%', modusTestID: 'S-BS-CA.19', },
            '9fj290ji': { analyte: 'MGBS', value: 24.5, units: '%', modusTestID: 'S-BS-MG.19', },
            '0fj290ji': { analyte: 'KBS', value: 5.1, units: '%', modusTestID: 'S-BS-K.19', },
            '11j290ji': { analyte: 'SO4S', value: 7, units: 'ppm', modusTestID: 'S-S-NH4AC.05', },
            '12j290ji': { analyte: 'ZN', value: 3.3, units: 'ppm', modusTestID: 'S-ZN-HCL.05', },
            '13j290ji': { analyte: 'MN', value: 46, units: 'ppm', modusTestID: 'S-MN-HCL.05', },
            '14j290ji': { analyte: 'B', value: 0.7, units: 'ppm', modusTestID: 'S-B-M3.04', },
          },
        },
      },
    }, // end of first example
  ], // end of examples
};


//----------------------------------------------------------------
// Todo's/Open Questions:
//----------------------------------------------------------------
//
// - TestPackages: was an array of strings under the SampleMetaData
// - Crop: need an actual list of crop types, growth stages, sub-growth stages.  
//     The old Crop had ClientID in the growth stages?
// - Recommendations: haven't started this yet.  Includes an expiration date.
// - Plants had an official "Comments" place for comments, is this necessary?
// - Nematode Pest: need a list of actual pests
// - Nematode had a "ValueType" of "measured", "percent", "calculated", and "index"?
// - "ValueDesc" for VL,L,...,H,VH.  How to represent here?
// - Nematode had "LifeStageValue" of "Egg, Juvenile, ... etc."
// - ResidueResults had something named "CASRN"
// - TextureResult has soil classification, percent clay/sand/silt and density
// - SensorResult?
// - "SubSamples"?  Original said "SubSamples is where the location of cores within a sample can be recorded"
//      Is this just a set of geolocations (and ID's) per "sample"?
// - "Warnings"
// - FMISAllowedLabEquations

export = schema;
