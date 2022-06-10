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
  $id: 'https://formats.openag.io/trellis/audit/generic/v1.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'A generic audit document represents the results of an actual auditor from a certifying_body performing an inspection of a facility or crew.',
  properties: {
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
    auditid: {
      description: '',
      type: 'object',
      properties: {
        id_source: {
          description:
            'An id_source is a representation of who assigned the id: i.e. who do you go ask to figure out what a particular ID goes to.',
          type: 'string',
          examples: ['scheme', 'certifying_body'],
        },
        id: {
          description:
            'An id is a string which should be reasonably unique to represent the  object it belongs to.',
          type: 'string',
        },
      },
    },
    scheme: {
      description:
        'the set of descriptors for identifying the current audit scheme for this document.',
      properties: {
        name: {
          description:
            'name is a string, typically the name of the object the key appears in.',
          type: 'string',
          pattern: '^(?!(indexing|.*-index|_.*)).*$',
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
        auditors: {
          description:
            'Introduced for foodlogiq integration. List of auditors from the certifying body',
          type: 'array',
          items: {
            description: 'identifying information of auditor',
            type: 'object',
            properties: {
              FName: { type: 'string' },
              LName: { type: 'string' },
              PersonNum: { type: 'string' },
              Role: { type: 'string' },
            },
          },
        },
      },
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
          pattern: '^([0-9]{13}|Undefined)$',
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
          $comment:
            'Is this supposed to only be the below values, or any string?',
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
            },
            end: {
              description:
                'end describes the date and time when the audit was completed.',
              type: 'string',
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
            },
            end: {
              description:
                'end describes the date and time when the audit was completed.',
              type: 'string',
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
          type: 'object',
        },
        individuals_present: {
          description:
            'List of people present during the audit (part of conditions_during_audit)',
          type: 'array',
          items: {
            description:
              'person is a key that never appears anywhere, but anywhere a person-type of thing exists (auditor, contact, etc.) it is one of these things.',
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
        },
        audit_duration_rationale: {
          description:
            'Introduced for CanadaGAP, this is a free-form string explaining why the duration of an audit does not meet the minimum duration requirements.',
          type: 'string',
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
                examples: [
                  'Total Compliance',
                  'Minor Deficiency',
                  'Major Deficiency',
                  'Yes',
                  'No',
                  'Pass',
                  'Fail',
                  'N/A',
                ],
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
    score: {
      description:
        'Introduced for foodlogiq integration. Final audit score of a facility.',
      type: 'object',
      properties: {
        final: {
          description: 'Final audit score',
          type: 'object',
          properties: {
            value: { type: 'string' },
            units: { type: 'string' },
          },
        },
      },
    },
    certificate_validity_period: {
      description:
        'Introduced for foodlogiq integration. Period of audit validity.',
      type: 'object',
      properties: {
        start: { type: 'string' },
        end: { type: 'string' },
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
      enum: [
        'application/vnd.trellis.audit.primusgfs.1+json',
        'application/vnd.trellisfw.audit.sqfi.1+json',
      ],
    },
  },
  additionalProperties: true,
  required: ['_type'],
  type: 'object',
  definitions: {
    id_source: {
      description:
        'An id_source is a representation of who assigned the id: i.e. who do you go ask to figure out what a particular ID goes to.',
      type: 'string',
      examples: ['scheme', 'certifying_body'],
    },
  },
  examples: [
    {
      _type: 'application/vnd.trellis.audit.primusgfs.1+json',
      certificationid: {
        id_source: 'scheme',
        id: '00000 - Cert: 0',
      },
      scheme: {
        name: 'PrimusGFS',
        version: '2.1-2',
      },
      certifying_body: {
        name: 'Primus Auditing Operations',
        auditor: {
          name: 'Aaron Auditor Ault',
        },
      },
      organization: {
        organizationid: {
          id_source: 'certifying_body',
          id: 'PA−PGFS−000−0',
        },
        name: 'Noel Produce Masters',
        contacts: [
          {
            name: 'Sam Noel',
          },
        ],
        location: {
          stree_address: '123 Nonexistent Street',
          postal_code: '00000',
          city: 'Nowhere',
          state: 'Florida',
          country: 'USA',
        },
        phone: '0000000000',
      },
      scope: {
        description:
          'Harvest crew audit of GFS activities, personnel, sanitation, crop area, tools, etc. were observed and applicable documents.They were observed approx.10 people in the activity.',
        operation: {
          type: 'harvest',
          operator: {
            contacts: [
              {
                name: 'Sam Noel',
              },
            ],
            name: 'Noel Produce - Linked to Greenhouse Noel Produce Masters',
          },
          shipper: {
            name: "Noel's Happy Tomato",
          },
          location: {
            address: '124 Nonexistent Street',
            city: 'Lafayette',
            state: 'IN',
            postal_code: '47907',
            country: 'USA',
          },
        },
        products_observed: [
          {
            name: 'Tomatoes',
          },
        ],
        similar_products_not_observed: [
          {
            name: 'Tomatoes Organic',
          },
        ],
        products_applied_for_but_not_observed: [],
      },
      conditions_during_audit: {
        FSMS_observed_date: {
          start: '2016-04-08T17:00:00Z-06:00',
          end: '2016-04-08T19:00:00Z-06:00',
        },
        operation_observed_date: {
          start: '2016-04-08T10:00:00Z-06:00',
          end: '2016-04-08T11:30:00Z-06:00',
        },
      },
      score: {
        preliminary: {
          value: '96',
          units: '%',
        },
        final: {
          value: '100',
          units: '%',
        },
      },
      sections: [
        {
          sectionid: '1',
          name: 'Food Safety Management System',
          score: {
            preliminary: {
              value: '179',
              units: 'points',
            },
            final: {
              value: '194',
              units: 'points',
            },
            possible: '194',
          },
          sections: [
            {
              sectionid: '1.01',
              name: 'Management System',
              score: {
                preliminary: {
                  value: '179',
                  units: 'points',
                },
                final: {
                  value: '194',
                  units: 'points',
                },
                possible: '194',
              },
              control_pointids: [
                '1.01.01',
                '1.01.02',
                '1.01.03',
                '1.01.04',
                '1.01.05',
                '1.01.06',
              ],
            },
            {
              sectionid: '1.02',
              name: 'Control of Documents and Records',
              control_pointids: ['1.02.01', '1.02.02', '1.02.03', '1.02.04'],
            },
            {
              sectionid: '1.03',
              name: 'Procedures and Corrective Actions Internal and External Inspections',
              control_pointids: ['1.03.01', '1.03.02', '1.03.03', '1.03.04'],
            },
            {
              sectionid: '1.04',
              name: 'Rejection and Release of Product',
              control_pointids: ['1.04.01', '1.04.02', '1.04.03', '1.04.04'],
            },
            {
              sectionid: '1.05',
              name: 'Supplier Control Traceability and Recall',
              control_pointids: [
                '1.05.01',
                '1.05.02',
                '1.05.03',
                '1.05.04',
                '1.05.05',
              ],
            },
            {
              sectionid: '1.06',
              name: 'Supplier Control',
              control_pointids: [
                '1.06.01',
                '1.06.02',
                '1.06.03',
                '1.06.04',
                '1.06.05',
                '1.06.06',
              ],
            },
            {
              sectionid: '1.07',
              name: 'Tracability and Recall',
              control_pointids: ['1.07.01', '1.07.02', '1.07.03'],
            },
            {
              sectionid: '1.08',
              name: 'Food Defense',
              control_pointids: ['1.08.01', '1.08.02', '1.08.03'],
            },
          ],
        },
        {
          sectionid: '2',
          name: 'Good Agricultural Practices',
          sections: [
            {
              sectionid: '2.11',
              name: 'Harvesting Inspections Policies And Training',
              control_pointids: [
                '2.11.01',
                '2.11.02',
                '2.11.02a',
                '2.11.03',
                '2.11.04',
                '2.11.05',
                '2.11.06',
              ],
            },
            {
              sectionid: '2.12',
              name: 'Harvesting Worker Activities And Sanitary Facilities',
              control_pointids: [
                '2.12.01',
                '2.12.02',
                '2.12.03',
                '2.12.04',
                '2.12.05',
                '2.12.06',
                '2.12.06a',
                '2.12.07',
                '2.12.07a',
                '2.12.08',
                '2.12.08a',
                '2.12.08b',
                '2.12.08c',
                '2.12.08d',
                '2.12.08e',
                '2.12.08f',
                '2.12.08g',
                '2.12.08h',
                '2.12.08i',
                '2.12.08j',
                '2.12.08k',
                '2.12.08l',
                '2.12.08m',
                '2.12.09',
                '2.12.10',
                '2.12.10a',
                '2.12.10b',
                '2.12.10c',
                '2.12.10d',
                '2.12.10e',
                '2.12.10f',
                '2.12.10g',
                '2.12.10h',
                '2.12.10i',
                '2.12.10j',
                '2.12.10k',
                '2.12.11',
                '2.12.11a',
                '2.12.11b',
                '2.12.12',
                '2.12.13',
                '2.12.13a',
                '2.12.14',
                '2.12.15',
                '2.12.15a',
                '2.12.16',
                '2.12.17',
              ],
            },
            {
              sectionid: '2.13',
              name: 'Harvest Practices',
              control_pointids: [
                '2.13.01',
                '2.13.02',
                '2.13.03',
                '2.13.04',
                '2.13.05',
                '2.13.06',
              ],
            },
            {
              sectionid: '2.14',
              name: 'Harvest Practices Transportation and Tracking',
              control_pointids: [
                '2.14.01',
                '2.14.02',
                '2.14.03',
                '2.14.04',
                '2.14.05',
                '2.14.06',
              ],
            },
            {
              sectionid: '2.15',
              name: 'On Site Storage',
              control_pointids: [
                '2.15.01',
                '2.15.02',
                '2.15.03',
                '2.15.04',
                '2.15.05',
                '2.15.06',
              ],
            },
          ],
        },
      ],
      control_points: {
        '1.01.01': {
          name: 'Is there a Food Safety Manual or other documented food safety management system covering the scope of business included in this audit and procedures/instructions for all food safety processes?',
          score: {
            value: '5',
            units: 'points',
            possible: '5',
            compliance: 'Total Compliance',
          },
          auditor_comments:
            'Yes. They have a manual which covers the scope of the operation: procedures, risk analysis, etc.',
          files: [],
        },
        '1.01.02': {
          name: 'Is there a documented food safety policy detailing the company ́s commitment to food safety?',
          score: {
            value: '5',
            units: 'points',
            possible: '5',
            compliance: 'Total Compliance',
          },
          auditor_comments:
            'Yes. They have a document called Safety Policy. Policy posted on the office.signed and dated policy (16 / Jan / 2016) by management.published policy.',
          files: [],
        },
        '1.01.03': {
          name: '',
          score: {
            value: '2',
            units: 'points',
            possible: '3',
            compliance: 'Minor Deficiency',
          },
          auditor_comments:
            'Mn.Have a document called Chart, dated (16.1.2016).job functions have.Lack positions include the role of the production department.Missing some alternates.',
          files: [],
        },
        '2.11.02': {
          name: 'Was a pre−harvest inspection performed on the block being harvested and was the block cleared for harvest? If No, go to 2.11.03.',
          score: {
            value: '5',
            units: 'points',
            possible: '5',
            compliance: 'Yes',
          },
          auditor_comments:
            'Yes. They have a record Registering weekly crop inspection personnel.',
          files: [],
        },
        '2.11.02a': {
          name: 'Where pre−harvest inspections have discovered issues, have buffer zones been clearly identified and at the time of the audit, are these buffer zones being respected?',
          score: {
            value: '0',
            units: 'points',
            possible: '0',
            compliance: 'N/A',
          },
          auditor_comments: 'N / A.No problem.The score is not affected.',
          files: [],
        },
      },
    },
  ],
};
export = schema;
