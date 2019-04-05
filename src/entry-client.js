import { createApp } from './app'
import { getAutoLang } from './utils/i18n'

const locale = getAutoLang()
createApp({ locale }).then(({ app, store }) => {
  if (window._INITIAL_STATE_) {
    store.replaceState(window._INITIAL_STATE_)
  }
  app.$mount('#app')
})
