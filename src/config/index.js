/*
 * config/index.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 10/11/2017
 * Copyright (c) 2017 SeekAsia. All rights reserved.
 **/

import convict from 'convict'

const config = convict({
  apiKey: {
    doc: 'The api key for Netcore Email Service Provider (ESP)',
    format: String,
    default: process.env.API_KEY,
    env: 'API_KEY'
  },
  apiEndpoint: {
    doc: 'The api endpoint for Netcore Email Service Provider (ESP)',
    format: 'url',
    default: 'http://api.falconide.com/falconapi/web.send.json',
    env: 'API_ENDPOINT'
  },
  jobTemplate: {
    doc: 'The ID of the template uploaded to Falconide Web Dashboard',
    format: Number,
    default: 6035,
    env: 'JOB_TEMPLATE'
  },
  welcomeTemplate: {
    doc: 'The ID of the template uploaded to Falconide Web Dashboard',
    format: Number,
    default: 6053,
    env: 'WELCOME_TEMPLATE'
  },
  tags: {
    doc: 'Comma-separated tags you want to apply to the email send',
    format: String,
    default: 'salle, production',
    env: 'TAGS'
  }
})

const validated = config.validate({ allowed: 'strict' })

export default validated
