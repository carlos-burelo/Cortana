import es from '#locales/es'
import { I18nFn, LocaleMap } from '#types'

const Locales: LocaleMap = {
  es,
}

export const i18n: I18nFn = locale => {
  const localeObj = Locales[locale]
  if (!localeObj) throw new Error(`Locale ${locale} not found`)
  return localeObj
}
