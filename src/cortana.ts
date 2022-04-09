import { i18n } from '#libs/i18n'
import { md } from '#utils/message'
import { Api, Context, RawApi } from 'grammy'
import { Other } from 'grammy/out/core/api'
import { Message, Update, UserFromGetMe } from 'grammy/out/platform.node'
interface MessageParsed
  extends Omit<Other<RawApi, 'sendMessage', 'text'>, 'parse_mode'> {}

export class CortanaCtx extends Context {
  constructor(update: Update, api: Api, me: UserFromGetMe) {
    super(update, api, me)
  }
  get l() {
    const chatType = this.chat?.type
    let lang = 'es'
    if (chatType === 'private') lang = this.from?.language_code || 'es'
    return i18n('es')
  }
  send(
    text: string,
    other?: MessageParsed,
    signal?: AbortSignal
  ): Promise<Message.TextMessage> {
    return this.api.sendMessage(this.chat?.id as number, md(text), {
      parse_mode: 'MarkdownV2',
      ...other,
      ...signal,
    })
  }
}
