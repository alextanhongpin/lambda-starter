const { email } = require('../dist/index')

const { job, welcome } = require('./data')

function sendJob () {
  const data = {
    Records: [{
      Sns: {
        Message: JSON.stringify(job)
      }
    }]
  }
  email(data, {}, (error, ok) => {
    if (error) {
      console.log('error:', error)
    }
    console.log(ok)
  })
}

function sendWelcome () {
  const data = {
    Records: [{
      Sns: {
        Message: JSON.stringify(welcome)
      }
    }]
  }
  email(data, {}, (error, ok) => {
    if (error) {
      console.log('error:', error)
    }
    console.log(ok)
  })
}

sendJob()
sendWelcome()
