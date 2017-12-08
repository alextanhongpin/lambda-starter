/*
 * src/greet-service/index.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 8/12/2017
 * Copyright (c) 2017 SEEK Asia. All rights reserved.
**/

import Model from './model'
import Store from './store'

const GreetService = ({ schema }) => {
  const model = Model({
    store: Store(),
    schema
  })

  return model
}

export default GreetService
