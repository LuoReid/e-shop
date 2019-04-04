import VueI18n from 'vue-i18n'
import langs from '../i18n'

// async function loadAsyncModule(){
//     await module = await import('./path/to/module')
// }

export function createI18n (locale) {
  // const { default: localeMessages } = await import(`../../i18n/locales/${locale}`)
  // const messages = { [locale]: localeMessages }
  // const i18n = new VueI18n({
  //   locale, messages,
  // })
  // return i18n
  return import(`../i18n/locales/${locale}`).then(module => {
    const localeMessages = module.default
    const messages = { [locale]: localeMessages }
    const i18n = new VueI18n({
      locale, messages,
    })
    return i18n
  })
}
export function getAutoLang () {
  let result = window.navigator.userLanguage || window.navigator.language
  if (result) {
    result = result.substr(0, 2)
  }
  if (langs.indexOf(result) === -1) {
    return 'en'
  } else {
    return result
  }
}
