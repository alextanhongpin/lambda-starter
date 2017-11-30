const Model = ({ store, schema }) => {
  return {
    async send (params) {
      const validatedParams = await schema('email', params)

      const templateMatcher = {
        job: () => schema('jobs', validatedParams),
        welcome: () => schema('welcome', validatedParams)
      }

      const type = validatedParams && validatedParams.template && validatedParams.template.type
      await templateMatcher[type]()
      return store.send(validatedParams)
    }
  }
}

export default Model
