const { email } = require('./dist/index')

const jobs = require('../dist/data/job.json')
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

const data = {
    Records: [{
        Sns: {
            Message: JSON.stringify(payload)
        }
    }]
}

console.log(JSON.stringify(data, null, 2))
console.log(JSON.stringify(payload, null, 2))

email(data, {}, (error, ok) => {
    if (error) {
        console.log('error:', error)
    }
    console.log(ok)
})