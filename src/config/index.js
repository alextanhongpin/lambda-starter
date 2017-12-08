/*
 * src/config/index.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 8/12/2017
 * Copyright (c) 2017 SEEK Asia. All rights reserved.
**/

// Config values, if not required, should at least have a default value.
// Also, it is important to validate the type the values passed through
// process.env, as they mostly default to type string.

import convict from 'convict'

const config = convict({
  version: {
    doc: 'The current version of the application',
    format: String,
    default: 'v1.0.0',
    env: 'VERSION'
  }
})

const validated = config.validate({ allowed: 'strict' })

export default validated
