/**
 * @license
 * Copyright 2022 Open Ag Data Alliance
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import type { JSONSchema8 as Schema } from 'jsonschema8';

const schema = {
  $id: 'https://formats.openag.io/trellis/audit/globalgap/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'A GlobalGAP audit is like a generic audit, but more restrictive.  Certain keys are marked as "required" here that should always exist if you have a GlobalGAP audit.',
  properties: {
    scheme: {
      description:
        'the set of descriptors for identifying the current audit scheme for this document.',
      properties: {
        name: {
          description:
            'name is a string, typically the name of the object the key appears in.',
          pattern: '^(?!(indexing|.*-index|_.*)).*$',
          enum: ['GLOBALGAP'],
          examples: ['PrimusGFS', 'GlobalGAP', 'CanadaGAP', 'SQFI'],
        },
        version: {
          description:
            'version is a string which describes the version of the schema used for the current audit.',
          type: 'string',
        },
        option: {
          description:
            'option is used as an indicator of type of audit for a given audit version.  Introduced for GlobalGAP audit, also present in CanadaGAP audit.',
          type: 'string',
        },
        options: {
          description:
            'If an audit covers multiple scheme options, you can make an array of them.',
          type: 'string',
        },
      },
      required: ['name', 'version', 'option', 'modules'],
      type: 'object',
    },
    certifying_body: {
      description:
        'specifies the credentials of the organization is performing the audit along with the specific individual performing the audit.',
      properties: {
        name: {
          description:
            'name is a string, typically the name of the object the key appears in.',
          type: 'string',
          pattern: '^(?!(indexing|.*-index|_.*)).*$',
          examples: ['Primus Auditing Operations'],
        },
        auditor: {
          description:
            '"auditor" is the person performing the audit for the certifying body',
          properties: {
            conflict_of_interest: {
              description:
                'conflict_of_interest indicates if a particular person (auditor) has a known conflict of interest for creating a certification for an organization',
              type: 'boolean',
            },
            number_prior_audits_this_organization: {
              description:
                "Introduced for CanadaGAP, this is the auditor's attestation of how many times they have audited this operation before.",
              type: 'string',
              pattern: '^[0-9]+$',
            },
            number_prior_consecutive_audits_this_organization: {
              description:
                "Introduced for CanadaGAP, this is the auditor's attestation of how many consecutive times they have audited this operation, excluding the current audit.",
              type: 'string',
              pattern: '^[0-9]+$',
            },
          },
          type: 'object',
        },
        reviewer: {
          description:
            'Introduced for CanadaGAP audit.  Represents the person who reviewed the audit within the certifiation body.',
          properties: {
            name: {
              description:
                'name is a string, typically the name of the object the key appears in.',
              type: 'string',
              pattern: '^(?!(indexing|.*-index|_.*)).*$',
            },
            email: {
              description: 'email address for an organization or contact',
              type: 'string',
            },
            location: {
              description:
                'location describes the postal address used to identify where something is.',
              properties: {
                postal_code: {
                  description:
                    'postal_code is the postal code used in a postal address',
                  type: 'string',
                },
                street_address: {
                  description:
                    'The street name and mailbox number of a postal address.',
                  type: 'string',
                },
                city: {
                  description:
                    'The name of the city, usually in a postal address.',
                  type: 'string',
                },
                state: {
                  description:
                    'The name of the state or major region, usually in a postal address.',
                  type: 'string',
                },
                country: {
                  description:
                    'The name of the country, usually in a postal address.',
                  type: 'string',
                },
                name: {
                  description:
                    'name is a string, typically the name of the object the key appears in.',
                  type: 'string',
                  pattern: '^(?!(indexing|.*-index|_.*)).*$',
                },
              },
              type: 'object',
            },
            phone: {
              description:
                'phone describes the phone number with country code and area code.',
              type: 'string',
            },
            fax: {
              description: 'fax number for a person or organization',
              type: 'string',
            },
          },
          type: 'object',
        },
        review_date: {
          description:
            'Introduced for CanadaGAP.  Indicates when the review of the audit was performed.',
          type: 'string',
        },
      },
      required: ['name', 'auditor'],
      type: 'object',
    },
    organization: {
      description:
        'organization contains information about the organization under audit.',
      properties: {
        organizationid: {
          description:
            'organizationid identifies the organization which is the subject of the audit/certification.',
          properties: {
            id: {
              description:
                'An id is a string which should be reasonably unique to represent the  object it belongs to.',
              type: 'string',
              pattern: '^(?!(indexing|.*-index|_.*)).*$',
            },
            id_source: {
              description:
                'An id_source is a representation of who assigned the id: i.e. who do you go ask to figure out what a particular ID goes to.',
              type: 'string',
              examples: ['scheme', 'certifying_body'],
            },
          },
          type: 'object',
        },
        GLN: {
          description:
            'A Global Location Number, assigned by GS1.  Usually exists in "organization".',
          type: 'string',
          pattern: '^[0-9]{13}$',
        },
        name: {
          description:
            'name is a string, typically the name of the object the key appears in.',
          type: 'string',
          pattern: '^(?!(indexing|.*-index|_.*)).*$',
        },
        contacts: {
          description:
            'contacts is a list of contact people for an organization.',
          type: 'array',
          items: {
            description:
              'contact describes an individuals who may be contacted in reference to this audit.',
            properties: {
              name: {
                description:
                  'name is a string, typically the name of the object the key appears in.',
                type: 'string',
                pattern: '^(?!(indexing|.*-index|_.*)).*$',
              },
              email: {
                description: 'email address for an organization or contact',
                type: 'string',
              },
              location: {
                description:
                  'location describes the postal address used to identify where something is.',
                properties: {
                  postal_code: {
                    description:
                      'postal_code is the postal code used in a postal address',
                    type: 'string',
                  },
                  street_address: {
                    description:
                      'The street name and mailbox number of a postal address.',
                    type: 'string',
                  },
                  city: {
                    description:
                      'The name of the city, usually in a postal address.',
                    type: 'string',
                  },
                  state: {
                    description:
                      'The name of the state or major region, usually in a postal address.',
                    type: 'string',
                  },
                  country: {
                    description:
                      'The name of the country, usually in a postal address.',
                    type: 'string',
                  },
                  name: {
                    description:
                      'name is a string, typically the name of the object the key appears in.',
                    type: 'string',
                    pattern: '^(?!(indexing|.*-index|_.*)).*$',
                  },
                },
                type: 'object',
              },
              phone: {
                description:
                  'phone describes the phone number with country code and area code.',
                type: 'string',
              },
              fax: {
                description: 'fax number for a person or organization',
                type: 'string',
              },
              contact_type: {
                description:
                  'Indicates if this particular contact person has some special role in the organization such as "Food Safety Program Coordinator" or "Recall Coordinator."  Introduced for CanadaGAP Audit',
                type: 'string',
                examples: [
                  'Food Safety Program Coordinator',
                  'Recall Coordinator',
                  'Responsible For Operation',
                ],
              },
              contact_types: {
                description:
                  'Allows one person to be multiple contact types.  Introduced for CanadaGAP audits.',
                type: 'array',
                items: {
                  description:
                    'Indicates if this particular contact person has some special role in the organization such as "Food Safety Program Coordinator" or "Recall Coordinator."  Introduced for CanadaGAP Audit',
                  type: 'string',
                  examples: [
                    'Food Safety Program Coordinator',
                    'Recall Coordinator',
                    'Responsible For Operation',
                  ],
                },
              },
            },
            type: 'object',
          },
        },
        location: {
          description:
            'location describes the postal address used to identify where something is.',
          properties: {
            postal_code: {
              description:
                'postal_code is the postal code used in a postal address',
              type: 'string',
            },
            street_address: {
              description:
                'The street name and mailbox number of a postal address.',
              type: 'string',
            },
            city: {
              description: 'The name of the city, usually in a postal address.',
              type: 'string',
            },
            state: {
              description:
                'The name of the state or major region, usually in a postal address.',
              type: 'string',
            },
            country: {
              description:
                'The name of the country, usually in a postal address.',
              type: 'string',
            },
            name: {
              description:
                'name is a string, typically the name of the object the key appears in.',
              type: 'string',
              pattern: '^(?!(indexing|.*-index|_.*)).*$',
            },
          },
          type: 'object',
        },
        phone: {
          description:
            'phone describes the phone number with country code and area code.',
          type: 'string',
        },
        fax: {
          description: 'fax number for a person or organization',
          type: 'string',
        },
        orgchart: {
          description:
            'orgchart is a tricky one.  It is intended to represent the reporting structure within an organization.  Introduced for the CanadaGAP audit. It is a flat object with keys that represent the "id" of a person.  Each value in this outer object is a single person, and may have name, job_title, and job_description.  If this person reports to someone else, the reports_to key should be included in their object as well (an array of all the people they report to), thus creating a directed graph of relationships.',
          patternProperties: {
            '.*': {
              description:
                'An orgchart_person has all the possible properties of a person, but also can have job_title, job_description, and reports_to.',
              properties: {
                job_title: {
                  description:
                    'The title of this person within their organization.',
                  type: 'string',
                },
                job_description: {
                  description:
                    'A description of what this person does or is responsible for within an organization.',
                  type: 'string',
                },
                reports_to: {
                  description:
                    'An array of all the ID strings of the people to whom this person reports',
                  type: 'array',
                  items: {
                    description:
                      'An id is a string which should be reasonably unique to represent the  object it belongs to.',
                    type: 'string',
                    pattern: '^(?!(indexing|.*-index|_.*)).*$',
                  },
                },
              },
              type: 'object',
            },
          },
        },
      },
      required: ['organizationid', 'name'],
      type: 'object',
    },
    scope: {
      description:
        'scope describes the breadth of the audit in terms of operations, personnel, products, etc.',
      properties: {
        description: {
          description:
            'a string description of an object, usually longer than "name"',
          type: 'string',
        },
        notification: {
          description:
            'notification describes whether the target of the audit was notified in advance that this audit would take place.  "announced" or "unannounced".',
          type: 'string',
          examples: ['announced', 'unannounced'],
        },
        operation: {
          description:
            'an object describing the operation that is under audit. For GlobalGAP, this is just an object with a name.  For PrimusGFS, this is holds description',
          properties: {
            operation_type: {
              description: 'type of a given operation',
              type: 'string',
              examples: [
                'harvest',
                'packinghouse',
                'cold storage',
                'growing',
                'handling',
                'u-pick',
                'storage',
                'packing - production site',
                'repacking',
                'brokerage',
                'wholesale',
              ],
            },
            operator: {
              description:
                'operator is used to detail the information about the crew or on-site operators for a given operation.',
              properties: {
                contacts: {
                  description:
                    'contacts is a list of contact people for an organization.',
                  type: 'array',
                  items: {
                    description:
                      'contact describes an individuals who may be contacted in reference to this audit.',
                    properties: {
                      name: {
                        description:
                          'name is a string, typically the name of the object the key appears in.',
                        type: 'string',
                        pattern: '^(?!(indexing|.*-index|_.*)).*$',
                      },
                      email: {
                        description:
                          'email address for an organization or contact',
                        type: 'string',
                      },
                      location: {
                        description:
                          'location describes the postal address used to identify where something is.',
                        properties: {
                          postal_code: {
                            description:
                              'postal_code is the postal code used in a postal address',
                            type: 'string',
                          },
                          street_address: {
                            description:
                              'The street name and mailbox number of a postal address.',
                            type: 'string',
                          },
                          city: {
                            description:
                              'The name of the city, usually in a postal address.',
                            type: 'string',
                          },
                          state: {
                            description:
                              'The name of the state or major region, usually in a postal address.',
                            type: 'string',
                          },
                          country: {
                            description:
                              'The name of the country, usually in a postal address.',
                            type: 'string',
                          },
                          name: {
                            description:
                              'name is a string, typically the name of the object the key appears in.',
                            type: 'string',
                            pattern: '^(?!(indexing|.*-index|_.*)).*$',
                          },
                        },
                        type: 'object',
                      },
                      phone: {
                        description:
                          'phone describes the phone number with country code and area code.',
                        type: 'string',
                      },
                      fax: {
                        description: 'fax number for a person or organization',
                        type: 'string',
                      },
                      contact_type: {
                        description:
                          'Indicates if this particular contact person has some special role in the organization such as "Food Safety Program Coordinator" or "Recall Coordinator."  Introduced for CanadaGAP Audit',
                        type: 'string',
                        examples: [
                          'Food Safety Program Coordinator',
                          'Recall Coordinator',
                          'Responsible For Operation',
                        ],
                      },
                      contact_types: {
                        description:
                          'Allows one person to be multiple contact types.  Introduced for CanadaGAP audits.',
                        type: 'array',
                        items: {
                          description:
                            'Indicates if this particular contact person has some special role in the organization such as "Food Safety Program Coordinator" or "Recall Coordinator."  Introduced for CanadaGAP Audit',
                          type: 'string',
                          examples: [
                            'Food Safety Program Coordinator',
                            'Recall Coordinator',
                            'Responsible For Operation',
                          ],
                        },
                      },
                    },
                    type: 'object',
                  },
                },
                name: {
                  description:
                    'name is a string, typically the name of the object the key appears in.',
                  type: 'string',
                  pattern: '^(?!(indexing|.*-index|_.*)).*$',
                },
                location: {
                  description:
                    'location describes the postal address used to identify where something is.',
                  properties: {
                    postal_code: {
                      description:
                        'postal_code is the postal code used in a postal address',
                      type: 'string',
                    },
                    street_address: {
                      description:
                        'The street name and mailbox number of a postal address.',
                      type: 'string',
                    },
                    city: {
                      description:
                        'The name of the city, usually in a postal address.',
                      type: 'string',
                    },
                    state: {
                      description:
                        'The name of the state or major region, usually in a postal address.',
                      type: 'string',
                    },
                    country: {
                      description:
                        'The name of the country, usually in a postal address.',
                      type: 'string',
                    },
                    name: {
                      description:
                        'name is a string, typically the name of the object the key appears in.',
                      type: 'string',
                      pattern: '^(?!(indexing|.*-index|_.*)).*$',
                    },
                  },
                  type: 'object',
                },
              },
              type: 'object',
            },
            shipper: {
              description:
                'shipper is the parent organization who will be responsible for moving the product(s) to their next destination.',
              properties: {
                name: {
                  description:
                    'name is a string, typically the name of the object the key appears in.',
                  type: 'string',
                  pattern: '^(?!(indexing|.*-index|_.*)).*$',
                },
              },
              type: 'object',
            },
            location: {
              description:
                'location describes the postal address used to identify where something is.',
              properties: {
                postal_code: {
                  description:
                    'postal_code is the postal code used in a postal address',
                  type: 'string',
                },
                street_address: {
                  description:
                    'The street name and mailbox number of a postal address.',
                  type: 'string',
                },
                city: {
                  description:
                    'The name of the city, usually in a postal address.',
                  type: 'string',
                },
                state: {
                  description:
                    'The name of the state or major region, usually in a postal address.',
                  type: 'string',
                },
                country: {
                  description:
                    'The name of the country, usually in a postal address.',
                  type: 'string',
                },
                name: {
                  description:
                    'name is a string, typically the name of the object the key appears in.',
                  type: 'string',
                  pattern: '^(?!(indexing|.*-index|_.*)).*$',
                },
              },
              type: 'object',
            },
            name: {
              description:
                'name is a string, typically the name of the object the key appears in.',
              type: 'string',
              pattern: '^(?!(indexing|.*-index|_.*)).*$',
            },
          },
          type: 'object',
        },
        products_observed: {
          description: 'The set of products evaluated in the audit.',
          type: 'array',
          items: {
            description:
              'product describes the particular type of item being evaluated in the audit. May describe the fruit, vegetable, etc. as well as other descriptors such as "chopped", "pitted", "organic", etc.',
            properties: {
              name: {
                description:
                  'name is a string, typically the name of the object the key appears in.',
                type: 'string',
                pattern: '^(?!(indexing|.*-index|_.*)).*$',
                examples: ['tomatoes', 'peppers', 'zucchini'],
              },
              organic: {
                description:
                  'organic is a true/false value indicating if a particular product is considered organic or not.',
                type: 'boolean',
              },
              area: {
                description:
                  'area describes a quantity of area such as acres or hectares.',
                properties: {
                  units: {
                    description:
                      'the units used to interpret the associated value.',
                    type: 'string',
                    examples: ['acres', 'ac', 'hectares', 'ha'],
                  },
                  value: {
                    description:
                      'a numeric or qualitative value, represented as a string',
                    type: 'string',
                  },
                },
                type: 'object',
              },
              location: {
                description:
                  'location describes the postal address used to identify where something is.',
                properties: {
                  postal_code: {
                    description:
                      'postal_code is the postal code used in a postal address',
                    type: 'string',
                  },
                  street_address: {
                    description:
                      'The street name and mailbox number of a postal address.',
                    type: 'string',
                  },
                  city: {
                    description:
                      'The name of the city, usually in a postal address.',
                    type: 'string',
                  },
                  state: {
                    description:
                      'The name of the state or major region, usually in a postal address.',
                    type: 'string',
                  },
                  country: {
                    description:
                      'The name of the country, usually in a postal address.',
                    type: 'string',
                  },
                  name: {
                    description:
                      'name is a string, typically the name of the object the key appears in.',
                    type: 'string',
                    pattern: '^(?!(indexing|.*-index|_.*)).*$',
                  },
                },
                type: 'object',
              },
            },
            type: 'object',
          },
        },
        similar_products_not_observed: {
          description:
            'array of products not under evaulation that may be similar to those observed in the audit.',
          type: 'array',
          items: {
            description:
              'product describes the particular type of item being evaluated in the audit. May describe the fruit, vegetable, etc. as well as other descriptors such as "chopped", "pitted", "organic", etc.',
            properties: {
              name: {
                description:
                  'name is a string, typically the name of the object the key appears in.',
                type: 'string',
                pattern: '^(?!(indexing|.*-index|_.*)).*$',
                examples: ['tomatoes', 'peppers', 'zucchini'],
              },
              organic: {
                description:
                  'organic is a true/false value indicating if a particular product is considered organic or not.',
                type: 'boolean',
              },
              area: {
                description:
                  'area describes a quantity of area such as acres or hectares.',
                properties: {
                  units: {
                    description:
                      'the units used to interpret the associated value.',
                    type: 'string',
                    examples: ['acres', 'ac', 'hectares', 'ha'],
                  },
                  value: {
                    description:
                      'a numeric or qualitative value, represented as a string',
                    type: 'string',
                  },
                },
                type: 'object',
              },
              location: {
                description:
                  'location describes the postal address used to identify where something is.',
                properties: {
                  postal_code: {
                    description:
                      'postal_code is the postal code used in a postal address',
                    type: 'string',
                  },
                  street_address: {
                    description:
                      'The street name and mailbox number of a postal address.',
                    type: 'string',
                  },
                  city: {
                    description:
                      'The name of the city, usually in a postal address.',
                    type: 'string',
                  },
                  state: {
                    description:
                      'The name of the state or major region, usually in a postal address.',
                    type: 'string',
                  },
                  country: {
                    description:
                      'The name of the country, usually in a postal address.',
                    type: 'string',
                  },
                  name: {
                    description:
                      'name is a string, typically the name of the object the key appears in.',
                    type: 'string',
                    pattern: '^(?!(indexing|.*-index|_.*)).*$',
                  },
                },
                type: 'object',
              },
            },
            type: 'object',
          },
        },
        products_applied_for_but_not_observed: {
          description:
            'array of products that had been applied for but are not under evaulation in this particular audit.',
          type: 'array',
          items: {
            description:
              'product describes the particular type of item being evaluated in the audit. May describe the fruit, vegetable, etc. as well as other descriptors such as "chopped", "pitted", "organic", etc.',
            properties: {
              name: {
                description:
                  'name is a string, typically the name of the object the key appears in.',
                type: 'string',
                pattern: '^(?!(indexing|.*-index|_.*)).*$',
                examples: ['tomatoes', 'peppers', 'zucchini'],
              },
              organic: {
                description:
                  'organic is a true/false value indicating if a particular product is considered organic or not.',
                type: 'boolean',
              },
              area: {
                description:
                  'area describes a quantity of area such as acres or hectares.',
                properties: {
                  units: {
                    description:
                      'the units used to interpret the associated value.',
                    type: 'string',
                    examples: ['acres', 'ac', 'hectares', 'ha'],
                  },
                  value: {
                    description:
                      'a numeric or qualitative value, represented as a string',
                    type: 'string',
                  },
                },
                type: 'object',
              },
              location: {
                description:
                  'location describes the postal address used to identify where something is.',
                properties: {
                  postal_code: {
                    description:
                      'postal_code is the postal code used in a postal address',
                    type: 'string',
                  },
                  street_address: {
                    description:
                      'The street name and mailbox number of a postal address.',
                    type: 'string',
                  },
                  city: {
                    description:
                      'The name of the city, usually in a postal address.',
                    type: 'string',
                  },
                  state: {
                    description:
                      'The name of the state or major region, usually in a postal address.',
                    type: 'string',
                  },
                  country: {
                    description:
                      'The name of the country, usually in a postal address.',
                    type: 'string',
                  },
                  name: {
                    description:
                      'name is a string, typically the name of the object the key appears in.',
                    type: 'string',
                    pattern: '^(?!(indexing|.*-index|_.*)).*$',
                  },
                },
                type: 'object',
              },
            },
            type: 'object',
          },
        },
        production_sites: {
          description:
            'production_sites is an array of object, each of which are a production site.',
          items: {
            description:
              'A production_site is defined for GlobalGAP and describes the products grown, harvested, or handled at multiple locations for the same audit.',
            properties: {
              name: {
                description:
                  'name is a string, typically the name of the object the key appears in.',
                type: 'string',
                pattern: '^(?!(indexing|.*-index|_.*)).*$',
              },
              id: {
                description:
                  'An id is a string which should be reasonably unique to represent the  object it belongs to.',
                type: 'string',
                pattern: '^(?!(indexing|.*-index|_.*)).*$',
              },
              products_observed: {
                description: 'The set of products evaluated in the audit.',
                type: 'array',
                items: {
                  description:
                    'product describes the particular type of item being evaluated in the audit. May describe the fruit, vegetable, etc. as well as other descriptors such as "chopped", "pitted", "organic", etc.',
                  properties: {
                    name: {
                      description:
                        'name is a string, typically the name of the object the key appears in.',
                      type: 'string',
                      pattern: '^(?!(indexing|.*-index|_.*)).*$',
                      examples: ['tomatoes', 'peppers', 'zucchini'],
                    },
                    organic: {
                      description:
                        'organic is a true/false value indicating if a particular product is considered organic or not.',
                      type: 'boolean',
                    },
                    area: {
                      description:
                        'area describes a quantity of area such as acres or hectares.',
                      properties: {
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['acres', 'ac', 'hectares', 'ha'],
                        },
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    location: {
                      description:
                        'location describes the postal address used to identify where something is.',
                      properties: {
                        postal_code: {
                          description:
                            'postal_code is the postal code used in a postal address',
                          type: 'string',
                        },
                        street_address: {
                          description:
                            'The street name and mailbox number of a postal address.',
                          type: 'string',
                        },
                        city: {
                          description:
                            'The name of the city, usually in a postal address.',
                          type: 'string',
                        },
                        state: {
                          description:
                            'The name of the state or major region, usually in a postal address.',
                          type: 'string',
                        },
                        country: {
                          description:
                            'The name of the country, usually in a postal address.',
                          type: 'string',
                        },
                        name: {
                          description:
                            'name is a string, typically the name of the object the key appears in.',
                          type: 'string',
                          pattern: '^(?!(indexing|.*-index|_.*)).*$',
                        },
                      },
                      type: 'object',
                    },
                  },
                  type: 'object',
                },
              },
            },
            type: 'object',
          },
        },
        parallel_production: {
          description:
            'parallel_production is defined for GlobalGAP as to whether the site is growing other things in addition to those under audit.',
          type: 'boolean',
        },
        parallel_ownership: {
          description:
            'parallel_ownership is defined for GlobalGAP as to whether the site is growing things owned by someone other than the party under audit',
          type: 'boolean',
        },
        applicable_sites_description: {
          description:
            'Introduced for CanadaGAP, this holds a free-form string describing which  types of sites this audit applies to.',
          type: 'string',
        },
      },
      required: [
        'notification',
        'description',
        'operations',
        'products_observed',
      ],
      type: 'object',
    },
    conditions_during_audit: {
      description:
        'describes conditions when the audit took place.  Date audit started/finished, etc.',
      properties: {
        FSMS_observed_date: {
          description:
            'the period (beginning and ending times) of the FSMS portion of the audit.',
          properties: {
            start: {
              description:
                'start describes the date and time when the audit started',
              type: 'string',
              pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
            },
            end: {
              description:
                'end describes the date and time when the audit was completed.',
              type: 'string',
              pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
            },
            duration: {
              description:
                'duration describes how long an audit took to perform.  Introduced for GlobalGAP audits since that is how they specify it instead of start/end.',
              properties: {
                units: {
                  description:
                    'the units used to interpret the associated value.',
                  type: 'string',
                  examples: ['hours'],
                },
                value: {
                  description:
                    'a numeric or qualitative value, represented as a string',
                  type: 'string',
                },
              },
              type: 'object',
            },
          },
          required: ['start', 'end'],
          type: 'object',
        },
        operation_observed_date: {
          description:
            'the period (beginning and ending times) of the walk-through/field operations portion of the audit.',
          properties: {
            start: {
              description:
                'start describes the date and time when the audit started',
              type: 'string',
              pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
            },
            end: {
              description:
                'end describes the date and time when the audit was completed.',
              type: 'string',
              pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
            },
            duration: {
              description:
                'duration describes how long an audit took to perform.  Introduced for GlobalGAP audits since that is how they specify it instead of start/end.',
              properties: {
                units: {
                  description:
                    'the units used to interpret the associated value.',
                  type: 'string',
                  examples: ['hours'],
                },
                value: {
                  description:
                    'a numeric or qualitative value, represented as a string',
                  type: 'string',
                },
              },
              type: 'object',
            },
          },
          required: ['start', 'end'],
          type: 'object',
        },
      },
      required: ['FSMS_observed_date', 'operation_observed_date'],
      type: 'object',
    },
    certificationid: {
      description:
        'certificationid is an id which spans all documents for a single certification process.  i.e. the audit, corrective actions, and final certificate all share the same certificationid',
      properties: {
        id: {
          description:
            'An id is a string which should be reasonably unique to represent the  object it belongs to.',
          type: 'string',
          pattern: '^(?!(indexing|.*-index|_.*)).*$',
        },
        id_source: {
          description:
            'An id_source is a representation of who assigned the id: i.e. who do you go ask to figure out what a particular ID goes to.',
          type: 'string',
          examples: ['scheme', 'certifying_body'],
        },
      },
      type: 'object',
    },
    score: {
      description:
        'score presents the quanititative performance of a control point, section, or overall audit.',
      properties: {
        units: {
          description: 'the units used to interpret the associated value.',
          type: 'string',
        },
        preliminary: {
          description: 'A prelimiary score for an audit',
          properties: {
            value: {
              description:
                'a numeric or qualitative value, represented as a string',
              type: 'string',
            },
            units: {
              description: 'the units used to interpret the associated value.',
              type: 'string',
            },
            possible: {
              description: 'Number of points possible for this control point',
              type: 'string',
            },
          },
          type: 'object',
        },
        final: {
          description: 'The final score for an audit',
          properties: {
            value: {
              description:
                'a numeric or qualitative value, represented as a string',
              type: 'string',
            },
            units: {
              description: 'the units used to interpret the associated value.',
              type: 'string',
            },
            possible: {
              description: 'Number of points possible for this control point',
              type: 'string',
            },
          },
          type: 'object',
        },
        value: {
          description:
            'a numeric or qualitative value, represented as a string',
          type: 'string',
        },
        possible: {
          description: 'Number of points possible for this control point',
          type: 'string',
        },
        compliance: {
          description:
            'written description indicating the level of satisfaction of the control point. E.g., "Total Compliance", "Minor Deficiency", or simply "Pass"/"Fail".',
          type: 'string',
        },
        globalgap_levels: {
          description:
            'GlobalGAP has particular levels of major_musts and minor_must that are entirely unique to GlobalGAP, hence the name.',
          properties: {
            major_musts: {
              description:
                'The summary score for all major-must level questions',
              anyOf: [
                {
                  properties: {
                    yes: {
                      description:
                        'yes is used to represent the summary count of "yes" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    no: {
                      description:
                        'no is used to represent the summary count of "no" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    n_a: {
                      description:
                        'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    is_compliant: {
                      description:
                        'GlobalGAP has an overall true/false compliance for an audit score',
                      type: 'boolean',
                    },
                  },
                  type: 'object',
                },
                {
                  properties: {
                    major_must: {
                      description:
                        'major_must is used to represent the summary count of "Major Must" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    minor_must: {
                      description:
                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    recommended: {
                      description:
                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                  },
                  type: 'object',
                },
              ],
            },
            minor_musts: {
              description:
                'The summary score for all minor-must level questions',
              anyOf: [
                {
                  properties: {
                    yes: {
                      description:
                        'yes is used to represent the summary count of "yes" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    no: {
                      description:
                        'no is used to represent the summary count of "no" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    n_a: {
                      description:
                        'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    is_compliant: {
                      description:
                        'GlobalGAP has an overall true/false compliance for an audit score',
                      type: 'boolean',
                    },
                  },
                  type: 'object',
                },
                {
                  properties: {
                    major_must: {
                      description:
                        'major_must is used to represent the summary count of "Major Must" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    minor_must: {
                      description:
                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    recommended: {
                      description:
                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                      properties: {
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                          examples: ['count'],
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                  },
                  type: 'object',
                },
              ],
            },
          },
          type: 'object',
        },
        canadagap_isautofail: {
          description:
            'If the audit is scored as autofail, this key should be set to true in the score section.  Otherwise it can either be missing or set to false.  Specific to CanadaGAP',
          type: 'boolean',
        },
        subtotals: {
          description:
            'Introduced for CanadaGAP.  Represents the sub totals for various combinations of sections as specified by CanadaGAP, as well as the weighting_factor for that combination of sections toward the overall score.  This is needed because the subtotals do not perfectly match the sections, so it exists here as a separate key.  Other audits should just put the subtotal under the section that it goes with.',
          properties: {
            score: {
              description:
                'Do not use score_core in an audit schema.  It exists to avoid recursive definition of score and subtotals.',
              properties: {
                units: {
                  description:
                    'the units used to interpret the associated value.',
                  type: 'string',
                },
                preliminary: {
                  description: 'A prelimiary score for an audit',
                  properties: {
                    value: {
                      description:
                        'a numeric or qualitative value, represented as a string',
                      type: 'string',
                    },
                    units: {
                      description:
                        'the units used to interpret the associated value.',
                      type: 'string',
                    },
                    possible: {
                      description:
                        'Number of points possible for this control point',
                      type: 'string',
                    },
                  },
                  type: 'object',
                },
                final: {
                  description: 'The final score for an audit',
                  properties: {
                    value: {
                      description:
                        'a numeric or qualitative value, represented as a string',
                      type: 'string',
                    },
                    units: {
                      description:
                        'the units used to interpret the associated value.',
                      type: 'string',
                    },
                    possible: {
                      description:
                        'Number of points possible for this control point',
                      type: 'string',
                    },
                  },
                  type: 'object',
                },
                value: {
                  description:
                    'a numeric or qualitative value, represented as a string',
                  type: 'string',
                },
                possible: {
                  description:
                    'Number of points possible for this control point',
                  type: 'string',
                },
                compliance: {
                  description:
                    'written description indicating the level of satisfaction of the control point. E.g., "Total Compliance", "Minor Deficiency", or simply "Pass"/"Fail".',
                  type: 'string',
                },
                globalgap_levels: {
                  description:
                    'GlobalGAP has particular levels of major_musts and minor_must that are entirely unique to GlobalGAP, hence the name.',
                  properties: {
                    major_musts: {
                      description:
                        'The summary score for all major-must level questions',
                      anyOf: [
                        {
                          properties: {
                            yes: {
                              description:
                                'yes is used to represent the summary count of "yes" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            no: {
                              description:
                                'no is used to represent the summary count of "no" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            n_a: {
                              description:
                                'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            is_compliant: {
                              description:
                                'GlobalGAP has an overall true/false compliance for an audit score',
                              type: 'boolean',
                            },
                          },
                          type: 'object',
                        },
                        {
                          properties: {
                            major_must: {
                              description:
                                'major_must is used to represent the summary count of "Major Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            minor_must: {
                              description:
                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            recommended: {
                              description:
                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                          },
                          type: 'object',
                        },
                      ],
                    },
                    minor_musts: {
                      description:
                        'The summary score for all minor-must level questions',
                      anyOf: [
                        {
                          properties: {
                            yes: {
                              description:
                                'yes is used to represent the summary count of "yes" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            no: {
                              description:
                                'no is used to represent the summary count of "no" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            n_a: {
                              description:
                                'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            is_compliant: {
                              description:
                                'GlobalGAP has an overall true/false compliance for an audit score',
                              type: 'boolean',
                            },
                          },
                          type: 'object',
                        },
                        {
                          properties: {
                            major_must: {
                              description:
                                'major_must is used to represent the summary count of "Major Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            minor_must: {
                              description:
                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            recommended: {
                              description:
                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                          },
                          type: 'object',
                        },
                      ],
                    },
                  },
                  type: 'object',
                },
                canadagap_isautofail: {
                  description:
                    'If the audit is scored as autofail, this key should be set to true in the score section.  Otherwise it can either be missing or set to false.  Specific to CanadaGAP',
                  type: 'boolean',
                },
              },
              type: 'object',
            },
            name: {
              description:
                'name is a string, typically the name of the object the key appears in.',
              type: 'string',
              pattern: '^(?!(indexing|.*-index|_.*)).*$',
            },
            sectionids: {
              description:
                'An array of section id strings that belong to a subtotal or a sub-section.',
              type: 'array',
              items: {
                description:
                  "sectionid is the string id associated with a particular section. sectionid is constructed by prefixing the id with any parent sections, separated by periods (e.g., sectionid '2.3' is a section that is inside of a parent section with sectionid '2').  Note that CanadaGAP also has a special sectionid of \"autofail\" for their autofail items.  All other sectionids that we have seen are of the form <number_or_letter>.<number_or_letter>.<number_or_letter>... with 1 or more numbers",
                type: 'string',
              },
            },
            weighting_factor: {
              description:
                'Introduced for CanadaGAP.  Represents the weight used to combine sections into a total score.',
              type: 'string',
              pattern: '^-?[0-9]+(.[0-9]+)?',
            },
          },
          type: 'object',
        },
      },
      type: 'object',
    },
    sections: {
      description:
        'sections is a list of section objects, used for organizing control points into groupings.',
      type: 'array',
      items: {
        description:
          'A section is a recursively defined partition of the audit, meaning that it may contain other "child" sections within it.  If it is a specialized sub-section that does not follow a clean hierarchy, it may use the sectionids key to state which other sections belong to this section.  Introduced the sectionids for CanadaGAP to handle the sub-total sections of A1-3 and A4-5.',
        properties: {
          sections: {},
          name: {
            description:
              'name is a string, typically the name of the object the key appears in.',
            type: 'string',
            pattern: '^(?!(indexing|.*-index|_.*)).*$',
          },
          sectionid: {
            description:
              "sectionid is the string id associated with a particular section. sectionid is constructed by prefixing the id with any parent sections, separated by periods (e.g., sectionid '2.3' is a section that is inside of a parent section with sectionid '2').  Note that CanadaGAP also has a special sectionid of \"autofail\" for their autofail items.  All other sectionids that we have seen are of the form <number_or_letter>.<number_or_letter>.<number_or_letter>... with 1 or more numbers",
            type: 'string',
          },
          score: {
            description:
              'score presents the quanititative performance of a control point, section, or overall audit.',
            properties: {
              units: {
                description:
                  'the units used to interpret the associated value.',
                type: 'string',
              },
              preliminary: {
                description: 'A prelimiary score for an audit',
                properties: {
                  value: {
                    description:
                      'a numeric or qualitative value, represented as a string',
                    type: 'string',
                  },
                  units: {
                    description:
                      'the units used to interpret the associated value.',
                    type: 'string',
                  },
                  possible: {
                    description:
                      'Number of points possible for this control point',
                    type: 'string',
                  },
                },
                type: 'object',
              },
              final: {
                description: 'The final score for an audit',
                properties: {
                  value: {
                    description:
                      'a numeric or qualitative value, represented as a string',
                    type: 'string',
                  },
                  units: {
                    description:
                      'the units used to interpret the associated value.',
                    type: 'string',
                  },
                  possible: {
                    description:
                      'Number of points possible for this control point',
                    type: 'string',
                  },
                },
                type: 'object',
              },
              value: {
                description:
                  'a numeric or qualitative value, represented as a string',
                type: 'string',
              },
              possible: {
                description: 'Number of points possible for this control point',
                type: 'string',
              },
              compliance: {
                description:
                  'written description indicating the level of satisfaction of the control point. E.g., "Total Compliance", "Minor Deficiency", or simply "Pass"/"Fail".',
                type: 'string',
              },
              globalgap_levels: {
                description:
                  'GlobalGAP has particular levels of major_musts and minor_must that are entirely unique to GlobalGAP, hence the name.',
                properties: {
                  major_musts: {
                    description:
                      'The summary score for all major-must level questions',
                    anyOf: [
                      {
                        properties: {
                          yes: {
                            description:
                              'yes is used to represent the summary count of "yes" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                          no: {
                            description:
                              'no is used to represent the summary count of "no" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                          n_a: {
                            description:
                              'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                          is_compliant: {
                            description:
                              'GlobalGAP has an overall true/false compliance for an audit score',
                            type: 'boolean',
                          },
                        },
                        type: 'object',
                      },
                      {
                        properties: {
                          major_must: {
                            description:
                              'major_must is used to represent the summary count of "Major Must" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                          minor_must: {
                            description:
                              'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                          recommended: {
                            description:
                              'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                        },
                        type: 'object',
                      },
                    ],
                  },
                  minor_musts: {
                    description:
                      'The summary score for all minor-must level questions',
                    anyOf: [
                      {
                        properties: {
                          yes: {
                            description:
                              'yes is used to represent the summary count of "yes" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                          no: {
                            description:
                              'no is used to represent the summary count of "no" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                          n_a: {
                            description:
                              'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                          is_compliant: {
                            description:
                              'GlobalGAP has an overall true/false compliance for an audit score',
                            type: 'boolean',
                          },
                        },
                        type: 'object',
                      },
                      {
                        properties: {
                          major_must: {
                            description:
                              'major_must is used to represent the summary count of "Major Must" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                          minor_must: {
                            description:
                              'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                          recommended: {
                            description:
                              'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                            properties: {
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                                examples: ['count'],
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                            },
                            type: 'object',
                          },
                        },
                        type: 'object',
                      },
                    ],
                  },
                },
                type: 'object',
              },
              canadagap_isautofail: {
                description:
                  'If the audit is scored as autofail, this key should be set to true in the score section.  Otherwise it can either be missing or set to false.  Specific to CanadaGAP',
                type: 'boolean',
              },
              subtotals: {
                description:
                  'Introduced for CanadaGAP.  Represents the sub totals for various combinations of sections as specified by CanadaGAP, as well as the weighting_factor for that combination of sections toward the overall score.  This is needed because the subtotals do not perfectly match the sections, so it exists here as a separate key.  Other audits should just put the subtotal under the section that it goes with.',
                properties: {
                  score: {
                    description:
                      'Do not use score_core in an audit schema.  It exists to avoid recursive definition of score and subtotals.',
                    properties: {
                      units: {
                        description:
                          'the units used to interpret the associated value.',
                        type: 'string',
                      },
                      preliminary: {
                        description: 'A prelimiary score for an audit',
                        properties: {
                          value: {
                            description:
                              'a numeric or qualitative value, represented as a string',
                            type: 'string',
                          },
                          units: {
                            description:
                              'the units used to interpret the associated value.',
                            type: 'string',
                          },
                          possible: {
                            description:
                              'Number of points possible for this control point',
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      final: {
                        description: 'The final score for an audit',
                        properties: {
                          value: {
                            description:
                              'a numeric or qualitative value, represented as a string',
                            type: 'string',
                          },
                          units: {
                            description:
                              'the units used to interpret the associated value.',
                            type: 'string',
                          },
                          possible: {
                            description:
                              'Number of points possible for this control point',
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      value: {
                        description:
                          'a numeric or qualitative value, represented as a string',
                        type: 'string',
                      },
                      possible: {
                        description:
                          'Number of points possible for this control point',
                        type: 'string',
                      },
                      compliance: {
                        description:
                          'written description indicating the level of satisfaction of the control point. E.g., "Total Compliance", "Minor Deficiency", or simply "Pass"/"Fail".',
                        type: 'string',
                      },
                      globalgap_levels: {
                        description:
                          'GlobalGAP has particular levels of major_musts and minor_must that are entirely unique to GlobalGAP, hence the name.',
                        properties: {
                          major_musts: {
                            description:
                              'The summary score for all major-must level questions',
                            anyOf: [
                              {
                                properties: {
                                  yes: {
                                    description:
                                      'yes is used to represent the summary count of "yes" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  no: {
                                    description:
                                      'no is used to represent the summary count of "no" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  n_a: {
                                    description:
                                      'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  is_compliant: {
                                    description:
                                      'GlobalGAP has an overall true/false compliance for an audit score',
                                    type: 'boolean',
                                  },
                                },
                                type: 'object',
                              },
                              {
                                properties: {
                                  major_must: {
                                    description:
                                      'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  minor_must: {
                                    description:
                                      'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  recommended: {
                                    description:
                                      'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                },
                                type: 'object',
                              },
                            ],
                          },
                          minor_musts: {
                            description:
                              'The summary score for all minor-must level questions',
                            anyOf: [
                              {
                                properties: {
                                  yes: {
                                    description:
                                      'yes is used to represent the summary count of "yes" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  no: {
                                    description:
                                      'no is used to represent the summary count of "no" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  n_a: {
                                    description:
                                      'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  is_compliant: {
                                    description:
                                      'GlobalGAP has an overall true/false compliance for an audit score',
                                    type: 'boolean',
                                  },
                                },
                                type: 'object',
                              },
                              {
                                properties: {
                                  major_must: {
                                    description:
                                      'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  minor_must: {
                                    description:
                                      'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  recommended: {
                                    description:
                                      'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                },
                                type: 'object',
                              },
                            ],
                          },
                        },
                        type: 'object',
                      },
                      canadagap_isautofail: {
                        description:
                          'If the audit is scored as autofail, this key should be set to true in the score section.  Otherwise it can either be missing or set to false.  Specific to CanadaGAP',
                        type: 'boolean',
                      },
                    },
                    type: 'object',
                  },
                  name: {
                    description:
                      'name is a string, typically the name of the object the key appears in.',
                    type: 'string',
                    pattern: '^(?!(indexing|.*-index|_.*)).*$',
                  },
                  sectionids: {
                    description:
                      'An array of section id strings that belong to a subtotal or a sub-section.',
                    type: 'array',
                    items: {
                      description:
                        "sectionid is the string id associated with a particular section. sectionid is constructed by prefixing the id with any parent sections, separated by periods (e.g., sectionid '2.3' is a section that is inside of a parent section with sectionid '2').  Note that CanadaGAP also has a special sectionid of \"autofail\" for their autofail items.  All other sectionids that we have seen are of the form <number_or_letter>.<number_or_letter>.<number_or_letter>... with 1 or more numbers",
                      type: 'string',
                    },
                  },
                  weighting_factor: {
                    description:
                      'Introduced for CanadaGAP.  Represents the weight used to combine sections into a total score.',
                    type: 'string',
                    pattern: '^-?[0-9]+(.[0-9]+)?',
                  },
                },
                type: 'object',
              },
            },
            type: 'object',
          },
          sectionids: {
            description:
              'An array of section id strings that belong to a subtotal or a sub-section.',
            type: 'array',
            items: {
              description:
                "sectionid is the string id associated with a particular section. sectionid is constructed by prefixing the id with any parent sections, separated by periods (e.g., sectionid '2.3' is a section that is inside of a parent section with sectionid '2').  Note that CanadaGAP also has a special sectionid of \"autofail\" for their autofail items.  All other sectionids that we have seen are of the form <number_or_letter>.<number_or_letter>.<number_or_letter>... with 1 or more numbers",
              type: 'string',
            },
          },
          control_pointids: {
            description:
              'control_pointids lists the array of control point ids associated with the given section.',
            type: 'array',
            items: {
              description:
                'control_pointid is the id associated with a particular control point.',
              type: 'string',
              pattern: '^(?!(indexing|.*-index|_.*)).*$',
            },
          },
          supporting_points: {
            description:
              'supporting_points is just an object whose keys are supporting_pointids, and whose values are supporting_point objects.',
            patternProperties: {
              '^(?!(indexing|.*-index|_.*)).*$': {
                description:
                  'A supporting point is a sub-point within a control point.  This was introduced for CanadaGAP to represent all the checkboxes under the control points.  It is just an object with a name and a score.',
                properties: {
                  name: {
                    description:
                      'name is a string, typically the name of the object the key appears in.',
                    type: 'string',
                    pattern: '^(?!(indexing|.*-index|_.*)).*$',
                  },
                  score: {
                    description:
                      'score presents the quanititative performance of a control point, section, or overall audit.',
                    properties: {
                      units: {
                        description:
                          'the units used to interpret the associated value.',
                        type: 'string',
                      },
                      preliminary: {
                        description: 'A prelimiary score for an audit',
                        properties: {
                          value: {
                            description:
                              'a numeric or qualitative value, represented as a string',
                            type: 'string',
                          },
                          units: {
                            description:
                              'the units used to interpret the associated value.',
                            type: 'string',
                          },
                          possible: {
                            description:
                              'Number of points possible for this control point',
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      final: {
                        description: 'The final score for an audit',
                        properties: {
                          value: {
                            description:
                              'a numeric or qualitative value, represented as a string',
                            type: 'string',
                          },
                          units: {
                            description:
                              'the units used to interpret the associated value.',
                            type: 'string',
                          },
                          possible: {
                            description:
                              'Number of points possible for this control point',
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      value: {
                        description:
                          'a numeric or qualitative value, represented as a string',
                        type: 'string',
                      },
                      possible: {
                        description:
                          'Number of points possible for this control point',
                        type: 'string',
                      },
                      compliance: {
                        description:
                          'written description indicating the level of satisfaction of the control point. E.g., "Total Compliance", "Minor Deficiency", or simply "Pass"/"Fail".',
                        type: 'string',
                      },
                      globalgap_levels: {
                        description:
                          'GlobalGAP has particular levels of major_musts and minor_must that are entirely unique to GlobalGAP, hence the name.',
                        properties: {
                          major_musts: {
                            description:
                              'The summary score for all major-must level questions',
                            anyOf: [
                              {
                                properties: {
                                  yes: {
                                    description:
                                      'yes is used to represent the summary count of "yes" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  no: {
                                    description:
                                      'no is used to represent the summary count of "no" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  n_a: {
                                    description:
                                      'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  is_compliant: {
                                    description:
                                      'GlobalGAP has an overall true/false compliance for an audit score',
                                    type: 'boolean',
                                  },
                                },
                                type: 'object',
                              },
                              {
                                properties: {
                                  major_must: {
                                    description:
                                      'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  minor_must: {
                                    description:
                                      'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  recommended: {
                                    description:
                                      'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                },
                                type: 'object',
                              },
                            ],
                          },
                          minor_musts: {
                            description:
                              'The summary score for all minor-must level questions',
                            anyOf: [
                              {
                                properties: {
                                  yes: {
                                    description:
                                      'yes is used to represent the summary count of "yes" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  no: {
                                    description:
                                      'no is used to represent the summary count of "no" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  n_a: {
                                    description:
                                      'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  is_compliant: {
                                    description:
                                      'GlobalGAP has an overall true/false compliance for an audit score',
                                    type: 'boolean',
                                  },
                                },
                                type: 'object',
                              },
                              {
                                properties: {
                                  major_must: {
                                    description:
                                      'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  minor_must: {
                                    description:
                                      'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                  recommended: {
                                    description:
                                      'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                    properties: {
                                      value: {
                                        description:
                                          'a numeric or qualitative value, represented as a string',
                                        type: 'string',
                                      },
                                      units: {
                                        description:
                                          'the units used to interpret the associated value.',
                                        type: 'string',
                                        examples: ['count'],
                                      },
                                      possible: {
                                        description:
                                          'Number of points possible for this control point',
                                        type: 'string',
                                      },
                                    },
                                    type: 'object',
                                  },
                                },
                                type: 'object',
                              },
                            ],
                          },
                        },
                        type: 'object',
                      },
                      canadagap_isautofail: {
                        description:
                          'If the audit is scored as autofail, this key should be set to true in the score section.  Otherwise it can either be missing or set to false.  Specific to CanadaGAP',
                        type: 'boolean',
                      },
                      subtotals: {
                        description:
                          'Introduced for CanadaGAP.  Represents the sub totals for various combinations of sections as specified by CanadaGAP, as well as the weighting_factor for that combination of sections toward the overall score.  This is needed because the subtotals do not perfectly match the sections, so it exists here as a separate key.  Other audits should just put the subtotal under the section that it goes with.',
                        properties: {
                          score: {
                            description:
                              'Do not use score_core in an audit schema.  It exists to avoid recursive definition of score and subtotals.',
                            properties: {
                              units: {
                                description:
                                  'the units used to interpret the associated value.',
                                type: 'string',
                              },
                              preliminary: {
                                description: 'A prelimiary score for an audit',
                                properties: {
                                  value: {
                                    description:
                                      'a numeric or qualitative value, represented as a string',
                                    type: 'string',
                                  },
                                  units: {
                                    description:
                                      'the units used to interpret the associated value.',
                                    type: 'string',
                                  },
                                  possible: {
                                    description:
                                      'Number of points possible for this control point',
                                    type: 'string',
                                  },
                                },
                                type: 'object',
                              },
                              final: {
                                description: 'The final score for an audit',
                                properties: {
                                  value: {
                                    description:
                                      'a numeric or qualitative value, represented as a string',
                                    type: 'string',
                                  },
                                  units: {
                                    description:
                                      'the units used to interpret the associated value.',
                                    type: 'string',
                                  },
                                  possible: {
                                    description:
                                      'Number of points possible for this control point',
                                    type: 'string',
                                  },
                                },
                                type: 'object',
                              },
                              value: {
                                description:
                                  'a numeric or qualitative value, represented as a string',
                                type: 'string',
                              },
                              possible: {
                                description:
                                  'Number of points possible for this control point',
                                type: 'string',
                              },
                              compliance: {
                                description:
                                  'written description indicating the level of satisfaction of the control point. E.g., "Total Compliance", "Minor Deficiency", or simply "Pass"/"Fail".',
                                type: 'string',
                              },
                              globalgap_levels: {
                                description:
                                  'GlobalGAP has particular levels of major_musts and minor_must that are entirely unique to GlobalGAP, hence the name.',
                                properties: {
                                  major_musts: {
                                    description:
                                      'The summary score for all major-must level questions',
                                    anyOf: [
                                      {
                                        properties: {
                                          yes: {
                                            description:
                                              'yes is used to represent the summary count of "yes" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                          no: {
                                            description:
                                              'no is used to represent the summary count of "no" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                          n_a: {
                                            description:
                                              'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                          is_compliant: {
                                            description:
                                              'GlobalGAP has an overall true/false compliance for an audit score',
                                            type: 'boolean',
                                          },
                                        },
                                        type: 'object',
                                      },
                                      {
                                        properties: {
                                          major_must: {
                                            description:
                                              'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                          minor_must: {
                                            description:
                                              'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                          recommended: {
                                            description:
                                              'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                        },
                                        type: 'object',
                                      },
                                    ],
                                  },
                                  minor_musts: {
                                    description:
                                      'The summary score for all minor-must level questions',
                                    anyOf: [
                                      {
                                        properties: {
                                          yes: {
                                            description:
                                              'yes is used to represent the summary count of "yes" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                          no: {
                                            description:
                                              'no is used to represent the summary count of "no" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                          n_a: {
                                            description:
                                              'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                          is_compliant: {
                                            description:
                                              'GlobalGAP has an overall true/false compliance for an audit score',
                                            type: 'boolean',
                                          },
                                        },
                                        type: 'object',
                                      },
                                      {
                                        properties: {
                                          major_must: {
                                            description:
                                              'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                          minor_must: {
                                            description:
                                              'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                          recommended: {
                                            description:
                                              'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                            properties: {
                                              value: {
                                                description:
                                                  'a numeric or qualitative value, represented as a string',
                                                type: 'string',
                                              },
                                              units: {
                                                description:
                                                  'the units used to interpret the associated value.',
                                                type: 'string',
                                                examples: ['count'],
                                              },
                                              possible: {
                                                description:
                                                  'Number of points possible for this control point',
                                                type: 'string',
                                              },
                                            },
                                            type: 'object',
                                          },
                                        },
                                        type: 'object',
                                      },
                                    ],
                                  },
                                },
                                type: 'object',
                              },
                              canadagap_isautofail: {
                                description:
                                  'If the audit is scored as autofail, this key should be set to true in the score section.  Otherwise it can either be missing or set to false.  Specific to CanadaGAP',
                                type: 'boolean',
                              },
                            },
                            type: 'object',
                          },
                          name: {
                            description:
                              'name is a string, typically the name of the object the key appears in.',
                            type: 'string',
                            pattern: '^(?!(indexing|.*-index|_.*)).*$',
                          },
                          sectionids: {
                            description:
                              'An array of section id strings that belong to a subtotal or a sub-section.',
                            type: 'array',
                            items: {
                              description:
                                "sectionid is the string id associated with a particular section. sectionid is constructed by prefixing the id with any parent sections, separated by periods (e.g., sectionid '2.3' is a section that is inside of a parent section with sectionid '2').  Note that CanadaGAP also has a special sectionid of \"autofail\" for their autofail items.  All other sectionids that we have seen are of the form <number_or_letter>.<number_or_letter>.<number_or_letter>... with 1 or more numbers",
                              type: 'string',
                            },
                          },
                          weighting_factor: {
                            description:
                              'Introduced for CanadaGAP.  Represents the weight used to combine sections into a total score.',
                            type: 'string',
                            pattern: '^-?[0-9]+(.[0-9]+)?',
                          },
                        },
                        type: 'object',
                      },
                    },
                    type: 'object',
                  },
                },
                type: 'object',
              },
            },
          },
          auditor_comments: {
            description:
              'Free-form text comments from the auditor for a particular control point or section.',
            type: 'string',
            pattern: '.*',
          },
        },
        type: 'object',
      },
    },
    control_points: {
      description:
        'control_points is a key that contains the complete set of control points within an audit. Each control point is indexed by its control_pointid. This key is a top level key for ease of accessing any/all control points. No prior knowledge of section structure is therefore necessary to look up a particular control point of interest.',
      patternProperties: {
        '^(?!(indexing|.*-index|_.*)).*$': {
          description:
            'control_point is a single question/item to be addressed by the auditor and represents the core set of scores which are used for the audit.',
          properties: {
            name: {
              description:
                'name is a string, typically the name of the object the key appears in.',
              type: 'string',
              pattern: '^(?!(indexing|.*-index|_.*)).*$',
            },
            score: {
              description:
                'score presents the quanititative performance of a control point, section, or overall audit.',
              properties: {
                units: {
                  description:
                    'the units used to interpret the associated value.',
                  type: 'string',
                },
                preliminary: {
                  description: 'A prelimiary score for an audit',
                  properties: {
                    value: {
                      description:
                        'a numeric or qualitative value, represented as a string',
                      type: 'string',
                    },
                    units: {
                      description:
                        'the units used to interpret the associated value.',
                      type: 'string',
                    },
                    possible: {
                      description:
                        'Number of points possible for this control point',
                      type: 'string',
                    },
                  },
                  type: 'object',
                },
                final: {
                  description: 'The final score for an audit',
                  properties: {
                    value: {
                      description:
                        'a numeric or qualitative value, represented as a string',
                      type: 'string',
                    },
                    units: {
                      description:
                        'the units used to interpret the associated value.',
                      type: 'string',
                    },
                    possible: {
                      description:
                        'Number of points possible for this control point',
                      type: 'string',
                    },
                  },
                  type: 'object',
                },
                value: {
                  description:
                    'a numeric or qualitative value, represented as a string',
                  type: 'string',
                },
                possible: {
                  description:
                    'Number of points possible for this control point',
                  type: 'string',
                },
                compliance: {
                  description:
                    'written description indicating the level of satisfaction of the control point. E.g., "Total Compliance", "Minor Deficiency", or simply "Pass"/"Fail".',
                  type: 'string',
                },
                globalgap_levels: {
                  description:
                    'GlobalGAP has particular levels of major_musts and minor_must that are entirely unique to GlobalGAP, hence the name.',
                  properties: {
                    major_musts: {
                      description:
                        'The summary score for all major-must level questions',
                      anyOf: [
                        {
                          properties: {
                            yes: {
                              description:
                                'yes is used to represent the summary count of "yes" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            no: {
                              description:
                                'no is used to represent the summary count of "no" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            n_a: {
                              description:
                                'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            is_compliant: {
                              description:
                                'GlobalGAP has an overall true/false compliance for an audit score',
                              type: 'boolean',
                            },
                          },
                          type: 'object',
                        },
                        {
                          properties: {
                            major_must: {
                              description:
                                'major_must is used to represent the summary count of "Major Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            minor_must: {
                              description:
                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            recommended: {
                              description:
                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                          },
                          type: 'object',
                        },
                      ],
                    },
                    minor_musts: {
                      description:
                        'The summary score for all minor-must level questions',
                      anyOf: [
                        {
                          properties: {
                            yes: {
                              description:
                                'yes is used to represent the summary count of "yes" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            no: {
                              description:
                                'no is used to represent the summary count of "no" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            n_a: {
                              description:
                                'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            is_compliant: {
                              description:
                                'GlobalGAP has an overall true/false compliance for an audit score',
                              type: 'boolean',
                            },
                          },
                          type: 'object',
                        },
                        {
                          properties: {
                            major_must: {
                              description:
                                'major_must is used to represent the summary count of "Major Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            minor_must: {
                              description:
                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                            recommended: {
                              description:
                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                              properties: {
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                  examples: ['count'],
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                              },
                              type: 'object',
                            },
                          },
                          type: 'object',
                        },
                      ],
                    },
                  },
                  type: 'object',
                },
                canadagap_isautofail: {
                  description:
                    'If the audit is scored as autofail, this key should be set to true in the score section.  Otherwise it can either be missing or set to false.  Specific to CanadaGAP',
                  type: 'boolean',
                },
                subtotals: {
                  description:
                    'Introduced for CanadaGAP.  Represents the sub totals for various combinations of sections as specified by CanadaGAP, as well as the weighting_factor for that combination of sections toward the overall score.  This is needed because the subtotals do not perfectly match the sections, so it exists here as a separate key.  Other audits should just put the subtotal under the section that it goes with.',
                  properties: {
                    score: {
                      description:
                        'Do not use score_core in an audit schema.  It exists to avoid recursive definition of score and subtotals.',
                      properties: {
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                        },
                        preliminary: {
                          description: 'A prelimiary score for an audit',
                          properties: {
                            value: {
                              description:
                                'a numeric or qualitative value, represented as a string',
                              type: 'string',
                            },
                            units: {
                              description:
                                'the units used to interpret the associated value.',
                              type: 'string',
                            },
                            possible: {
                              description:
                                'Number of points possible for this control point',
                              type: 'string',
                            },
                          },
                          type: 'object',
                        },
                        final: {
                          description: 'The final score for an audit',
                          properties: {
                            value: {
                              description:
                                'a numeric or qualitative value, represented as a string',
                              type: 'string',
                            },
                            units: {
                              description:
                                'the units used to interpret the associated value.',
                              type: 'string',
                            },
                            possible: {
                              description:
                                'Number of points possible for this control point',
                              type: 'string',
                            },
                          },
                          type: 'object',
                        },
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                        compliance: {
                          description:
                            'written description indicating the level of satisfaction of the control point. E.g., "Total Compliance", "Minor Deficiency", or simply "Pass"/"Fail".',
                          type: 'string',
                        },
                        globalgap_levels: {
                          description:
                            'GlobalGAP has particular levels of major_musts and minor_must that are entirely unique to GlobalGAP, hence the name.',
                          properties: {
                            major_musts: {
                              description:
                                'The summary score for all major-must level questions',
                              anyOf: [
                                {
                                  properties: {
                                    yes: {
                                      description:
                                        'yes is used to represent the summary count of "yes" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    no: {
                                      description:
                                        'no is used to represent the summary count of "no" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    n_a: {
                                      description:
                                        'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    is_compliant: {
                                      description:
                                        'GlobalGAP has an overall true/false compliance for an audit score',
                                      type: 'boolean',
                                    },
                                  },
                                  type: 'object',
                                },
                                {
                                  properties: {
                                    major_must: {
                                      description:
                                        'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    minor_must: {
                                      description:
                                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    recommended: {
                                      description:
                                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                  },
                                  type: 'object',
                                },
                              ],
                            },
                            minor_musts: {
                              description:
                                'The summary score for all minor-must level questions',
                              anyOf: [
                                {
                                  properties: {
                                    yes: {
                                      description:
                                        'yes is used to represent the summary count of "yes" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    no: {
                                      description:
                                        'no is used to represent the summary count of "no" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    n_a: {
                                      description:
                                        'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    is_compliant: {
                                      description:
                                        'GlobalGAP has an overall true/false compliance for an audit score',
                                      type: 'boolean',
                                    },
                                  },
                                  type: 'object',
                                },
                                {
                                  properties: {
                                    major_must: {
                                      description:
                                        'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    minor_must: {
                                      description:
                                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    recommended: {
                                      description:
                                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                  },
                                  type: 'object',
                                },
                              ],
                            },
                          },
                          type: 'object',
                        },
                        canadagap_isautofail: {
                          description:
                            'If the audit is scored as autofail, this key should be set to true in the score section.  Otherwise it can either be missing or set to false.  Specific to CanadaGAP',
                          type: 'boolean',
                        },
                      },
                      type: 'object',
                    },
                    name: {
                      description:
                        'name is a string, typically the name of the object the key appears in.',
                      type: 'string',
                      pattern: '^(?!(indexing|.*-index|_.*)).*$',
                    },
                    sectionids: {
                      description:
                        'An array of section id strings that belong to a subtotal or a sub-section.',
                      type: 'array',
                      items: {
                        description:
                          "sectionid is the string id associated with a particular section. sectionid is constructed by prefixing the id with any parent sections, separated by periods (e.g., sectionid '2.3' is a section that is inside of a parent section with sectionid '2').  Note that CanadaGAP also has a special sectionid of \"autofail\" for their autofail items.  All other sectionids that we have seen are of the form <number_or_letter>.<number_or_letter>.<number_or_letter>... with 1 or more numbers",
                        type: 'string',
                      },
                    },
                    weighting_factor: {
                      description:
                        'Introduced for CanadaGAP.  Represents the weight used to combine sections into a total score.',
                      type: 'string',
                      pattern: '^-?[0-9]+(.[0-9]+)?',
                    },
                  },
                  type: 'object',
                },
              },
              type: 'object',
            },
            comments: {
              description:
                'comments from an auditor on a particular control point',
              type: 'string',
            },
            files: {
              description:
                "a list of file URL's that go with a particular control point",
              type: 'array',
              items: {
                description:
                  'an object with a url at the moment, perhaps more complex later.',
                properties: {
                  url: {
                    description: 'a string representing a URL link',
                    type: 'string',
                  },
                },
                type: 'object',
              },
            },
            justification: {
              description:
                'justification is an explanation by the auditor of why they scored a control_point the way they did',
              type: 'string',
            },
            criteria: {
              description:
                'criteria is an arrray of strings representing the various criteria needed for the certifying body to pass/fail a given control point',
              items: {
                type: 'string',
              },
            },
            globalgap_level: {
              description:
                "globalgap_level is not actually a key that is used, but rather describes a class of objects which represent a level's summary score",
              enum: ['major_must', 'minor_must', 'recommended'],
            },
            auditor_comments: {
              description:
                'Free-form text comments from the auditor for a particular control point or section.',
              type: 'string',
              pattern: '.*',
            },
            supporting_points: {
              description:
                'supporting_points is just an object whose keys are supporting_pointids, and whose values are supporting_point objects.',
              patternProperties: {
                '^(?!(indexing|.*-index|_.*)).*$': {
                  description:
                    'A supporting point is a sub-point within a control point.  This was introduced for CanadaGAP to represent all the checkboxes under the control points.  It is just an object with a name and a score.',
                  properties: {
                    name: {
                      description:
                        'name is a string, typically the name of the object the key appears in.',
                      type: 'string',
                      pattern: '^(?!(indexing|.*-index|_.*)).*$',
                    },
                    score: {
                      description:
                        'score presents the quanititative performance of a control point, section, or overall audit.',
                      properties: {
                        units: {
                          description:
                            'the units used to interpret the associated value.',
                          type: 'string',
                        },
                        preliminary: {
                          description: 'A prelimiary score for an audit',
                          properties: {
                            value: {
                              description:
                                'a numeric or qualitative value, represented as a string',
                              type: 'string',
                            },
                            units: {
                              description:
                                'the units used to interpret the associated value.',
                              type: 'string',
                            },
                            possible: {
                              description:
                                'Number of points possible for this control point',
                              type: 'string',
                            },
                          },
                          type: 'object',
                        },
                        final: {
                          description: 'The final score for an audit',
                          properties: {
                            value: {
                              description:
                                'a numeric or qualitative value, represented as a string',
                              type: 'string',
                            },
                            units: {
                              description:
                                'the units used to interpret the associated value.',
                              type: 'string',
                            },
                            possible: {
                              description:
                                'Number of points possible for this control point',
                              type: 'string',
                            },
                          },
                          type: 'object',
                        },
                        value: {
                          description:
                            'a numeric or qualitative value, represented as a string',
                          type: 'string',
                        },
                        possible: {
                          description:
                            'Number of points possible for this control point',
                          type: 'string',
                        },
                        compliance: {
                          description:
                            'written description indicating the level of satisfaction of the control point. E.g., "Total Compliance", "Minor Deficiency", or simply "Pass"/"Fail".',
                          type: 'string',
                        },
                        globalgap_levels: {
                          description:
                            'GlobalGAP has particular levels of major_musts and minor_must that are entirely unique to GlobalGAP, hence the name.',
                          properties: {
                            major_musts: {
                              description:
                                'The summary score for all major-must level questions',
                              anyOf: [
                                {
                                  properties: {
                                    yes: {
                                      description:
                                        'yes is used to represent the summary count of "yes" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    no: {
                                      description:
                                        'no is used to represent the summary count of "no" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    n_a: {
                                      description:
                                        'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    is_compliant: {
                                      description:
                                        'GlobalGAP has an overall true/false compliance for an audit score',
                                      type: 'boolean',
                                    },
                                  },
                                  type: 'object',
                                },
                                {
                                  properties: {
                                    major_must: {
                                      description:
                                        'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    minor_must: {
                                      description:
                                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    recommended: {
                                      description:
                                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                  },
                                  type: 'object',
                                },
                              ],
                            },
                            minor_musts: {
                              description:
                                'The summary score for all minor-must level questions',
                              anyOf: [
                                {
                                  properties: {
                                    yes: {
                                      description:
                                        'yes is used to represent the summary count of "yes" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    no: {
                                      description:
                                        'no is used to represent the summary count of "no" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    n_a: {
                                      description:
                                        'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    is_compliant: {
                                      description:
                                        'GlobalGAP has an overall true/false compliance for an audit score',
                                      type: 'boolean',
                                    },
                                  },
                                  type: 'object',
                                },
                                {
                                  properties: {
                                    major_must: {
                                      description:
                                        'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    minor_must: {
                                      description:
                                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                    recommended: {
                                      description:
                                        'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                      properties: {
                                        value: {
                                          description:
                                            'a numeric or qualitative value, represented as a string',
                                          type: 'string',
                                        },
                                        units: {
                                          description:
                                            'the units used to interpret the associated value.',
                                          type: 'string',
                                          examples: ['count'],
                                        },
                                        possible: {
                                          description:
                                            'Number of points possible for this control point',
                                          type: 'string',
                                        },
                                      },
                                      type: 'object',
                                    },
                                  },
                                  type: 'object',
                                },
                              ],
                            },
                          },
                          type: 'object',
                        },
                        canadagap_isautofail: {
                          description:
                            'If the audit is scored as autofail, this key should be set to true in the score section.  Otherwise it can either be missing or set to false.  Specific to CanadaGAP',
                          type: 'boolean',
                        },
                        subtotals: {
                          description:
                            'Introduced for CanadaGAP.  Represents the sub totals for various combinations of sections as specified by CanadaGAP, as well as the weighting_factor for that combination of sections toward the overall score.  This is needed because the subtotals do not perfectly match the sections, so it exists here as a separate key.  Other audits should just put the subtotal under the section that it goes with.',
                          properties: {
                            score: {
                              description:
                                'Do not use score_core in an audit schema.  It exists to avoid recursive definition of score and subtotals.',
                              properties: {
                                units: {
                                  description:
                                    'the units used to interpret the associated value.',
                                  type: 'string',
                                },
                                preliminary: {
                                  description:
                                    'A prelimiary score for an audit',
                                  properties: {
                                    value: {
                                      description:
                                        'a numeric or qualitative value, represented as a string',
                                      type: 'string',
                                    },
                                    units: {
                                      description:
                                        'the units used to interpret the associated value.',
                                      type: 'string',
                                    },
                                    possible: {
                                      description:
                                        'Number of points possible for this control point',
                                      type: 'string',
                                    },
                                  },
                                  type: 'object',
                                },
                                final: {
                                  description: 'The final score for an audit',
                                  properties: {
                                    value: {
                                      description:
                                        'a numeric or qualitative value, represented as a string',
                                      type: 'string',
                                    },
                                    units: {
                                      description:
                                        'the units used to interpret the associated value.',
                                      type: 'string',
                                    },
                                    possible: {
                                      description:
                                        'Number of points possible for this control point',
                                      type: 'string',
                                    },
                                  },
                                  type: 'object',
                                },
                                value: {
                                  description:
                                    'a numeric or qualitative value, represented as a string',
                                  type: 'string',
                                },
                                possible: {
                                  description:
                                    'Number of points possible for this control point',
                                  type: 'string',
                                },
                                compliance: {
                                  description:
                                    'written description indicating the level of satisfaction of the control point. E.g., "Total Compliance", "Minor Deficiency", or simply "Pass"/"Fail".',
                                  type: 'string',
                                },
                                globalgap_levels: {
                                  description:
                                    'GlobalGAP has particular levels of major_musts and minor_must that are entirely unique to GlobalGAP, hence the name.',
                                  properties: {
                                    major_musts: {
                                      description:
                                        'The summary score for all major-must level questions',
                                      anyOf: [
                                        {
                                          properties: {
                                            yes: {
                                              description:
                                                'yes is used to represent the summary count of "yes" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                            no: {
                                              description:
                                                'no is used to represent the summary count of "no" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                            n_a: {
                                              description:
                                                'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                            is_compliant: {
                                              description:
                                                'GlobalGAP has an overall true/false compliance for an audit score',
                                              type: 'boolean',
                                            },
                                          },
                                          type: 'object',
                                        },
                                        {
                                          properties: {
                                            major_must: {
                                              description:
                                                'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                            minor_must: {
                                              description:
                                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                            recommended: {
                                              description:
                                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                          },
                                          type: 'object',
                                        },
                                      ],
                                    },
                                    minor_musts: {
                                      description:
                                        'The summary score for all minor-must level questions',
                                      anyOf: [
                                        {
                                          properties: {
                                            yes: {
                                              description:
                                                'yes is used to represent the summary count of "yes" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                            no: {
                                              description:
                                                'no is used to represent the summary count of "no" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                            n_a: {
                                              description:
                                                'n_a is used to represent the summary count of "Not Applicable" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                            is_compliant: {
                                              description:
                                                'GlobalGAP has an overall true/false compliance for an audit score',
                                              type: 'boolean',
                                            },
                                          },
                                          type: 'object',
                                        },
                                        {
                                          properties: {
                                            major_must: {
                                              description:
                                                'major_must is used to represent the summary count of "Major Must" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                            minor_must: {
                                              description:
                                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                            recommended: {
                                              description:
                                                'major_must is used to represent the summary count of "Minor Must" answers in the audit',
                                              properties: {
                                                value: {
                                                  description:
                                                    'a numeric or qualitative value, represented as a string',
                                                  type: 'string',
                                                },
                                                units: {
                                                  description:
                                                    'the units used to interpret the associated value.',
                                                  type: 'string',
                                                  examples: ['count'],
                                                },
                                                possible: {
                                                  description:
                                                    'Number of points possible for this control point',
                                                  type: 'string',
                                                },
                                              },
                                              type: 'object',
                                            },
                                          },
                                          type: 'object',
                                        },
                                      ],
                                    },
                                  },
                                  type: 'object',
                                },
                                canadagap_isautofail: {
                                  description:
                                    'If the audit is scored as autofail, this key should be set to true in the score section.  Otherwise it can either be missing or set to false.  Specific to CanadaGAP',
                                  type: 'boolean',
                                },
                              },
                              type: 'object',
                            },
                            name: {
                              description:
                                'name is a string, typically the name of the object the key appears in.',
                              type: 'string',
                              pattern: '^(?!(indexing|.*-index|_.*)).*$',
                            },
                            sectionids: {
                              description:
                                'An array of section id strings that belong to a subtotal or a sub-section.',
                              type: 'array',
                              items: {
                                description:
                                  "sectionid is the string id associated with a particular section. sectionid is constructed by prefixing the id with any parent sections, separated by periods (e.g., sectionid '2.3' is a section that is inside of a parent section with sectionid '2').  Note that CanadaGAP also has a special sectionid of \"autofail\" for their autofail items.  All other sectionids that we have seen are of the form <number_or_letter>.<number_or_letter>.<number_or_letter>... with 1 or more numbers",
                                type: 'string',
                              },
                            },
                            weighting_factor: {
                              description:
                                'Introduced for CanadaGAP.  Represents the weight used to combine sections into a total score.',
                              type: 'string',
                              pattern: '^-?[0-9]+(.[0-9]+)?',
                            },
                          },
                          type: 'object',
                        },
                      },
                      type: 'object',
                    },
                  },
                  type: 'object',
                },
              },
            },
          },
          type: 'object',
        },
      },
    },
    _id: {
      description: '_id identifies a resource in the OADA API.',
      type: 'string',
    },
    _rev: {
      description:
        '_rev is the revision string for a resource in the OADA API.',
      type: 'integer',
    },
    _meta: {
      description: '_meta is a link to the meta document for a resources.',
      properties: {
        _id: {
          description: '_id identifies a resource in the OADA API.',
          type: 'string',
        },
        _rev: {
          description:
            '_rev is the revision string for a resource in the OADA API.',
          type: 'integer',
        },
      },
      required: ['_id', '_rev'],
      type: 'object',
    },
    _type: {
      enum: ['application/vnd.trellis.audit.globalgap.1+json'],
    },
  },
  additionalProperties: true,
  required: ['_type'],
  type: 'object',
  examples: [
    {
      _type: 'application/vnd.trellis.audit.globalgap.1+json',
      certificationid: {
        id_source: 'scheme',
        id: '12345-AAAAA-6789',
      },
      scheme: {
        name: 'GLOBALGAP',
        version: '5.0-1',
        option: '1',
        modules: [
          {
            name: 'All Farm Base',
          },
          {
            name: 'Crops Base',
          },
          {
            name: 'Fruit and Vegetables',
          },
        ],
      },
      certifying_body: {
        name: 'SCS Global Services',
        auditor: {
          name: 'Aaron Auditor Ault',
        },
      },
      organization: {
        organizationid: {
          id_source: 'scheme',
          id: '777777777',
          otherids: [
            {
              id_source: 'certifying_body',
              id: '1234567',
            },
          ],
        },
        name: 'Noel Produce Masters',
        contacts: [
          {
            name: 'Sam Noel',
          },
        ],
        location: {
          description: '(All sites in same area), Pesticide storage',
          street_address: '44641 SW Plumlee Rd.',
          city: 'Nowhere',
          state: 'Florida',
          country: 'USA',
        },
      },
      scope: {
        notification: 'announced',
        description: '',
        operations: [
          {
            operation_type: 'handling',
          },
        ],
        products_observed: [
          {
            name: 'Blueberries',
            first_area: {
              value: 70,
              units: 'acres',
            },
            further_area: {
              value: 10.67,
              units: 'acres',
            },
            operations: [
              {
                operation_type: 'growing',
                covering_type: 'uncovered',
              },
              {
                operation_type: 'harvest',
              },
            ],
          },
        ],
        similar_products_not_observed: [
          {
            name: 'Snozzberries',
          },
        ],
        production_sites: [
          {
            name: 'The Big Ranch',
            id: '1234',
            products_observed: [
              {
                name: 'Blueberries',
                organic: true,
                area: {
                  value: '70',
                  units: 'acres',
                },
                location: {
                  description: '',
                  city: '',
                },
              },
            ],
          },
        ],
        parallel_production: false,
        parallel_ownership: false,
      },
      conditions_during_audit: {
        FSMS_observed_date: {
          start: '2016-07-26',
          end: '2016-07-26',
        },
        operation_observed_date: {
          start: '2016-07-26',
          end: '2016-07-26',
          duration: {
            value: '4.5',
            units: 'hours',
          },
        },
      },
      score: {
        is_compliant: false,
        globalgap_levels: {
          major_musts: {
            yes: {
              value: '12',
              units: 'count',
            },
            no: {
              value: '1',
              units: 'count',
            },
            n_a: {
              value: '32',
              units: 'count',
            },
            is_compliant: false,
          },
          minor_musts: {
            yes: {
              value: '12',
              units: 'count',
            },
            no: {
              value: '1',
              units: 'count',
            },
            n_a: {
              value: '32',
              units: 'count',
            },
            value: '98.72',
            units: '%',
            is_compliant: true,
          },
        },
      },
      sections: [
        {
          sectionid: 'AF',
          name: 'All Farm Base',
          sections: [
            {
              sectionid: 'AF 1',
              name: 'Site History and Site Management',
              sections: [
                {
                  sectionid: 'AF 1.1',
                  name: 'Site History',
                  control_pointids: ['AF 1.1.1', 'AF 1.1.2'],
                },
                {
                  sectionid: 'AF 1.2',
                  name: 'Site Management',
                  control_pointids: ['AF 1.2.1', 'AF 1.2.2'],
                },
              ],
            },
            {
              sectionid: 'AF 2',
              name: 'Record Keeping And Internal Self-Assessment/Internal Inspection',
              control_pointids: ['AF 2.1', 'AF 2.2', 'AF 2.3'],
            },
          ],
        },
      ],
      control_points: {
        'AF 1.1.1': {
          name: 'Is there a reference system for each field, orchard, greenhouse, yard, plot, livestock building/pen, and/or other area/location used in production?',
          criteria: [
            'A physical sign at each field/orchard, greenhouse/yard/plot/livestock building/pen, or other farm area/location',
            'A farm map, which also identifies the location of water sources, storage/handling facilities, ponds, stables, etc. and that could be cross-referenced to the identification system.',
          ],
          globalgap_level: 'major_must',
          score: {
            value: 'yes',
            units: 'yes-no-n_a',
          },
          justification:
            'Site map was available for review. Broken down by Field ID. Variety and acreage is listed on legend indicating which applies to each block. Fuel and drip water line indicated on map.',
        },
      },
    },
  ],
} as const satisfies Schema;
export = schema;
