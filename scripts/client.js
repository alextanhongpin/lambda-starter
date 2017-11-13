const AWS = require('aws-sdk')
AWS.config.update({
    region: 'ap-southeast-1',
    credentials: new AWS.SharedIniFileCredentials({ profile: 'email-delivery' })
})
const sns = new AWS.SNS()

const jobs = require('../src/data/job.json')

function sendJob() {
    const payload = {
        sender: {
            subject: 'Hello lambda!'
        },
        recipient: {
            email: 'alextan220990@gmail.com',
            name: 'John Doe'
        },
        template: {
            type: 'job'
        },
        models: {
            name: 'John Doe',
            keyword: 'Work',
            location: 'Selangor'
        },
        collections: {
            jobs
        }
    }

    const params = {
        Message: JSON.stringify(payload),
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

function sendWelcome() {
    const payload = {
        sender: {
            subject: 'Welcome to SeekAsia!'
        },
        recipient: {
            email: 'salledev@seekasia.com',
            name: 'John Doe'
        },
        template: {
            type: 'welcome'
        },
        models: {
            keyword: 'Work',
            location: 'Selangor'
        }
    }

    const params = {
        Message: JSON.stringify(payload),
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

sendWelcome()