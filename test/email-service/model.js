/*
 * test/food-service/model.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 30/10/2017
 * Copyright (c) 2017 alextanhongpin. All rights reserved.
 **/
/* eslint-env mocha */

import chai from 'chai'

import MockEmailStore from './mock-store'
import EmailModel from '../../src/email-service/model'
import Schema from '../../src/schema'
import jobs from '../../src/data/job.json'

const expect = chai.expect

// In our test, we mock the store and only validate the model
// The route and store should not contain any business logic
const schema = Schema()
const model = EmailModel({
  store: MockEmailStore(),
  schema: Schema()
})

describe('Email Model', () => {
  // The base template that is mandatory
  const base = {
    sender: {
      name: 'Jobstreet Saved Searches',
      email: 'jsavedsearch@jobstreet.com',
      subject: 'Welcome'
    },
    recipient: {
      email: 'john.doe@mail.com',
      name: 'John Doe'
    },
    api: {
      url: 'http://api.falconide.com/falconapi/web.send.json',
      key: '10000',
      tags: 'salle, production'
    }
  }

  it('should validate the welcome template', async() => {
    const request = Object.assign({}, base, {
      template: {
        id: 6053,
        type: 'welcome'
      },
      models: {
        keyword: 'hello',
        'location': 'selangor'
      }
    })
    try {
      const response = await model.send(request)
      const expected = {
        message: 'SUCCESS',
        errorcode: '0',
        errormessage: ''
      }
      expect(response.message).to.be.equal(expected.message)
      expect(response.errorcode).to.be.equal(expected.errorcode)
      expect(response.errormessage).to.be.equal(expected.errormessage)
    } catch (error) {
      throw error
    }
  })

  it('should validate the job template', async() => {
    const request = Object.assign({}, base, {
      template: {
        id: 6035,
        type: 'job'
      },
      collections: {
        jobs
      }
    })
    try {
      const response = await model.send(request)
      const expected = {
        message: 'SUCCESS',
        errorcode: '0',
        errormessage: ''
      }
      expect(response.message).to.be.equal(expected.message)
      expect(response.errorcode).to.be.equal(expected.errorcode)
      expect(response.errormessage).to.be.equal(expected.errormessage)
    } catch (error) {
      throw error
    }
  })

  it('should handle unknown template', async() => {
    const request = Object.assign({}, base, {
      template: {
        id: 6035,
        type: '23'
      }
    })
    try {
      await model.send(request)
    } catch (error) {
      expect(error.message).to.be.equal(JSON.stringify([{ 'keyword': 'enum', 'dataPath': '.template.type', 'schemaPath': '#/definitions/email/properties/template/properties/type/enum', 'params': { 'allowedValues': ['welcome', 'job'] }, 'message': 'should be equal to one of the allowed values' }]))
    }
  })
})

describe('Email Schema', () => {
  it('should validate the email payload', async() => {
    const payload = {
      sender: {
        name: 'Jobstreet Saved Searches',
        email: 'jsavedsearch@jobstreet.com',
        subject: 'Welcome'
      },
      recipient: {
        email: 'john.doe@mail.com',
        name: 'John Doe'
      },
      api: {
        url: 'http://api.falconide.com/falconapi/web.send.json',
        key: '10000',
        tags: 'salle, production'
      },
      template: {
        id: 6035,
        type: 'welcome'
      }
    }
    try {
      const validatedPayload = await schema('email', payload)
      expect(validatedPayload).to.be.equal(payload)
    } catch (error) {
      throw error
    }
  })
})

describe('Job Schema', () => {
  it('should handle unknown schema', async() => {
    try {
      await schema('unknown', {})
    } catch (error) {
      expect(error.message).to.be.equal('no schema with the name unknown found')
    }
  })

  it('should validate a job', async() => {
    const payload = {
      title: 'Full Stack Web Developer',
      company: 'SeekAsia',
      description: 'Hiring full stack web developer now',
      hasImages: true,
      isPremium: true,
      isLastItem: false,
      link: 'http://www.jobstreet.com',
      keyword: '',
      isConfidential: false
    }
    try {
      const validatedPayload = await schema('job', payload)
      expect(validatedPayload).to.be.equal(payload)
    } catch (error) {
      throw error
    }
  })

  it('should validate jobs', async() => {
    const payload = {
      collections: {
        jobs
      }
    }
    try {
      const validatedPayload = await schema('jobs', payload)
      expect(validatedPayload).to.be.equal(payload)
    } catch (error) {
      throw error
    }
  })
})
