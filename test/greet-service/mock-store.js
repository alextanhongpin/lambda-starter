/*
 * test/food-service/mock-store.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 30/10/2017
 * Copyright (c) 2017 alextanhongpin. All rights reserved.
 **/

const MockGreetStore = () => {
  async function greet ({ name }) {
    return `Hello, ${name}`
  }
  return { greet }
}

export default MockGreetStore
