declare module 'ajv-pack' {
  import { Ajv, ValidateFunction } from 'ajv'

  const pack: (ajv: Ajv, validate: ValidateFunction) => string

  export = pack
}

// Declare packed validation functions modules
declare module '*-validate.js' {
  import { ValidateFunction } from 'ajv'

  const validate: ValidateFunction

  export = validate
}
