/*
 * helper/schema.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 10/11/2017
 * Copyright (c) 2017 SeekAsia. All rights reserved.
 **/

const Ajv = require('ajv')

const jobSchema = require('../schema/job.json')
const jobsSchema = require('../schema/jobs.json')
const welcomeSchema = require('../schema/welcome.json')
const emailSchema = require('../schema/email.json')

const Schema = () => {
  const ajv = new Ajv({
    allErrors: true, // Tell AJV to return all errors, instead of just 1 error
    removeAdditional: true, // Remove additional fields that is not specified in the payload
    coerceTypes: true // Convert the type to the specified type (e.g. string to int)
  })

  const _schemas = {
        // Load all your schemas here
    welcome: ajv.compile(welcomeSchema),
    job: ajv.compile(jobSchema),
    jobs: ajv.compile(jobsSchema),
    email: ajv.compile(emailSchema)
  }

  return (name, payload) => {
    return new Promise((resolve, reject) => {
      const schema = _schemas[name] ? _schemas[name] : null
      if (!schema) {
        return reject(new Error(`no schema with the name ${name} found`))
      }
      const valid = schema(payload)

      if (!valid) {
        const error = new Error('invalid Schema')
        error.message = JSON.stringify(schema.errors)
        return reject(error)
      }
      resolve(payload)
    })
  }
}

export default Schema
