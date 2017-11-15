const jobs = require('../src/data/job.json')

module.exports = {
    job: {
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
            keyword: 'Work',
            location: 'Selangor',
            unsubscribeLink: 'http://www.jobstreet.com.my/',
            termsLink: 'http://www.jobstreet.com.my/',
            privacyLink: 'http://www.jobstreet.com.my/',
            contactUsLink: 'http://www.jobstreet.com.my/',
            callToAction: 'View more jobs',
            callToActionLink: '',
            countryCopyrightName: 'Malaysia',
            jobstreetLink: 'http://www.jobstreet.com.my/',
            facebookLink: 'https://www.facebook.com/jobstreet/',
            twitterLink: 'https://twitter.com/jobstreetmy?lang=en',
            salary: 'RM 3000',
            count: jobs.length,
            specialization: 'IT/Technology'
        },
        collections: {
            jobs
        }
    },
    welcome: {
        sender: {
            subject: 'Welcome to SeekAsia!'
        },
        recipient: {
            email: 'alextan220990@seekasia.com',
            name: 'John Doe'
        },
        template: {
            type: 'welcome'
        },
        models: {
            keyword: 'Work',
            location: 'Selangor',
            unsubscribeLink: 'http://www.jobstreet.com.my/',
            termsLink: 'http://www.jobstreet.com.my/',
            privacyLink: 'http://www.jobstreet.com.my/',
            contactUsLink: 'http://www.jobstreet.com.my/',
            countryCopyrightName: 'Malaysia',
            jobstreetLink: 'http://www.jobstreet.com.my/',
            facebookLink: 'https://www.facebook.com/jobstreet/',
            twitterLink: 'https://twitter.com/jobstreetmy?lang=en',
            salary: 'RM 3000',
            specialization: 'IT/Technology'
        }
    }

}