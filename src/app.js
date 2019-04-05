import '@babel/polyfill'
import Vue from 'vue'
import App from './components/App.vue'
// import router, { createRouter } from './router'
// import store, { createStore } from './store'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import './plugins'
import './components'
// import { createI18n, getAutoLang } from './utils/i18n'
import { createI18n } from './utils/i18n'

// Global filters
for (const key in filters) {
  Vue.filter(key, filters[key])
}

// sync(store, router)

// async function main () {
//   const locale = getAutoLang()
//   const i18n = await createI18n(locale)
//   await store.dispatch('init')

//   // eslint-disable-next-line no-new
//   new Vue({
//     el: '#app',
//     router,
//     store,
//     i18n,
//     ...App,
//   })
// }

// main()

export async function createApp (context) {
  const router = createRouter()
  const store = createStore()

  sync(store, router)
  const i18n = await createI18n(context.locale)
  await store.dispatch('init')

  const app = new Vue({
    router,
    store,
    i18n,
    ...App,
  })
  return { app, router, store }
}
