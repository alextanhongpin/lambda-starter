/*
 * src/greet-service/store.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 8/12/2017
 * Copyright (c) 2017 SEEK Asia. All rights reserved.
**/

// Store contains logic that communicates with DB and also
// external requests. Store is normally used so that we can decouple
// our business logic to DB operations.

const Store = () => {
  async function greet ({ name }) {
    return `Hello, ${name}`
  }

  return { greet }
}

export default Store
