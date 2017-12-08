'use strict'

import Greet from './greet-service'
import config from './config'
import Schema from './schema'
import GreetSchema from './schema/greet.json'

const schema = Schema()
schema.add('greet', GreetSchema) // Load all the schemas required for the service

module.exports.greet = function (event, context, callback) {
  const version = config.get('version')
  console.log(`running service ${version}`)

  // Check if the data provided through the SNS is present
  const hasRecords = event.Records && event.Records.length && event.Records[0] && event.Records[0].Sns && event.Records[0].Sns.Message
  if (!hasRecords) {
    return callback(null, { message: 'No record found.' })
  }

  // Data exist but in stringified format - parse back to JSON
  const params = JSON.parse(event.Records[0].Sns.Message)

  // Initialize a new service with the schema and config
  const greeter = Greet({ schema, config })
  
  greeter
  .greet(params) // Execute the service with the params
  .then((ok) => callback(null, ok)) // Handle success
  .catch(callback) // Handle error
}
