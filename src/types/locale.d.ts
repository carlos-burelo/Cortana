import { InlineKeyboardButton } from 'grammy/out/platform.node'

export interface Locale {
  _start: {
    message: <Custom>(username: Custom) => string
    buttons: InlineKeyboardButton[]
  }
}
