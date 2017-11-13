/*
 * email-service/index.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 10/11/2017
 * Copyright (c) 2017 SeekAsia. All rights reserved.
 **/

import Model from './model'
import Store from './store'

const Email = ({ schema }) => {
  const model = Model({
    store: Store(),
    schema
  })

  return {
    async send (params) {
      return model.send(params)
    }
  }
}

export default Email
