import { CortanaCtx } from '#cortana'
import { Bot } from 'grammy'
import { Locale } from './locale'

export type Cmd = Bot<CortanaCtx>

export type LocaleMap = {
  [key: string]: Locale
}

export type I18nFn = (locale: string) => LocaleMap[string]
