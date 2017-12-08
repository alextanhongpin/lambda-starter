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

import MockGreetStore from './mock-store'
import GreetModel from '../../src/greet-service/model'

import Schema from '../../src/schema'
import GreetSchema from '../../src/schema/greet.json'

const expect = chai.expect

// In our test, we mock the store and only validate the model
// The route and store should not contain any business logic
const schema = Schema()
schema.add('greet', GreetSchema)

const model = GreetModel({
  store: MockGreetStore(),
  schema
})

describe('Greet Model', () => {
  it('should return the correct greeting', async() => {
    try {
      const response = await model.greet({ name: 'john' })
      const expected = 'Hello, john'
      expect(response).to.be.equal(expected)
    } catch (error) {
      throw error
    }
  })
})
