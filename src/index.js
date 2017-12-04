'use strict'

import Email from './email-service'
import Schema from './schema'
import config from './config'

const schema = Schema()

module.exports.email = function (event, context, callback) {
  const email = Email({ schema, config })
  const hasRecords = event.Records && event.Records.length && event.Records[0] && event.Records[0].Sns && event.Records[0].Sns.Message
  if (!hasRecords) {
    return callback(null, { message: 'No record found.' })
  }

  const { sender, recipient, template, models, collections } = JSON.parse(event.Records[0].Sns.Message)

    // Match the template and return the id
  const templateMatcher = {
    job: config.get('jobTemplate'),
    welcome: config.get('welcomeTemplate')
  }

  const params = {
    sender: {
      email: sender && sender.email,
      name: sender && sender.name,
      subject: sender && sender.subject
    },
    recipient: {
      email: recipient && recipient.email,
      name: recipient && recipient.name
    },
    api: {
      url: config.get('apiEndpoint'),
      key: config.get('apiKey'),
      tags: config.get('tags')
    },
    template: {
      id: templateMatcher[template && template.type],
      type: template && template.type
    },
    models: Object.assign({}, models, { senderEmail: sender && sender.email }),
    collections
  }

  email.send(params).then((ok) => {
    callback(null, ok)
  }).catch(callback)
}
