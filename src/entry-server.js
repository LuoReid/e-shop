import { createApp } from './app'

export default context => {
  return new Promise(async (resolve, reject) => {
    const { app, router, store } = await createApp(context)
    router.push(context.url)
    // todo data and component
    // todo resolve(app)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // todo load data
      // todo resolve(app)
      Promise.all(matchedComponents.map(Component => {
        if (Comment.asyncData) {
          return Component.asyncData({ store, route: router.currentRoute })
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
