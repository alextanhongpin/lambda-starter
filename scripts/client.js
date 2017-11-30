const AWS = require('aws-sdk')
AWS.config.update({
  region: 'ap-southeast-1',
  credentials: new AWS.SharedIniFileCredentials({ profile: 'email-delivery' })
})

// In production, pass the AWS Access Key and Secret
// aws.config.update({
//     region: 'ap-southeast-1',
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })

const { job, welcome } = require('./data')
const sns = new AWS.SNS()

function sendJob () {
  const params = {
    Message: JSON.stringify(job),
    TopicArn: process.env.SNS_TOPIC
  }

  sns.publish(params, (error, done) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('success', done)
  })
}

function sendWelcome () {
  const params = {
    Message: JSON.stringify(welcome),
    TopicArn: process.env.SNS_TOPIC
  }

  sns.publish(params, (error, done) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('success', done)
  })
}
// sendJob()
// sendWelcome()
