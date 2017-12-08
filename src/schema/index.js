/*
 * helper/schema.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 10/11/2017
 * Copyright (c) 2017 SeekAsia. All rights reserved.
 **/

import Ajv from 'ajv'
import request from 'request-promise'

function Schema () {
  const ajv = Ajv({
    coerceTypes: true,
    allErrors: true,
    useDefaults: true
  })

  const schemas = {}

  return {
    add (name, schema) {
      schemas[name] = ajv.compile(schema)
    },
    async validate (name, params) {
      const schema = schemas[name]
      if (!schema) {
        return Promise.reject(new Error(`schema ${name} does not exist`))
      }
      const validate = schema(params)
      if (!validate) {
        return Promise.reject(schema.errors)
      }
      return params
    },
    async addFromUrl (name, uri) {
      const schema = await request({
        uri,
        json: true
      })
      schemas[name] = ajv.compile(schema)
      return true
    }
  }
}

module.exports = Schema