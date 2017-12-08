/*
 * src/greet-service/model.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 8/12/2017
 * Copyright (c) 2017 SEEK Asia. All rights reserved.
**/

// Model contains business logic orchestration and validation.
// Note that the model does not make a call to dependencies directly 
// (http requests, database), but rather through the Store.

const Model = ({ store, schema }) => {
  return {
    async greet (params) {
      const validatedParams = await schema.validate('greet', params)
      return store.greet(validatedParams)
    }
  }
}

export default Model
