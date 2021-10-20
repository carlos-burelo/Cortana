import { argRegex, BOT_TOKEN, localesDir } from '@config'
import { LangI } from '@interfaces/locales'
import { AccountsTable } from '@interfaces/sql'
import { request } from '@libs/request'
import { createAccount, getLang, validate } from '@SQL'
import { ArgsI } from '@typings'
import { Api, Context, RawApi } from 'grammy'
import { Other } from 'grammy/out/core/api'
import { Message, Update, UserFromGetMe } from 'grammy/out/platform'
import { resolve as join } from 'path'

interface MessageParsed extends Omit<Other<RawApi, 'sendMessage', 'text'>, 'parse_mode'> { }

/**
 * Class extends from Grammy Context
 * for zoom the methods and props in
 * the ctx object
 * @param {Update} update
 * @param {Api} api
 * @param {UserFromGetMe} me
 */
export class Cortana extends Context {
  /**
   * Constructor extends context
   * @param {Update} update
   * @param {Api} api
   * @param {UserFromGetMe} me
   */
  constructor(update: Update, api: Api, me: UserFromGetMe) {
    super(update, api, me)
  }
  /**
   * Return the params of the message
   * and remove the command for have
   * clean text
   * @return {string[]}
   */
  get params(): string[] {
    return this.msg.text.replace(/\/\w+\s?/, '').split(' ')
  }
  /**
   * Get message and validate if exist
   * the '-help' word and return a boolean
   * @return {boolean}
   */
  get help(): boolean {
    return this.params.includes('-help')
  }
  /**
   * Generate message with parse_mode in
   * HTML
   * @param {string} text
   * @param {MessageParsed} [other]
   * @param {AbortSignal} [signal]
   * @return {Promise<Message.TextMessage>}
   */
  replyWithHTML(
    text: string,
    other?: MessageParsed,
    signal?: AbortSignal
  ): Promise<Message.TextMessage> {
    return this.api.sendMessage(this.chat.id, text, {
      parse_mode: 'HTML',
      ...other,
      ...signal,
    })
  }
  /**
   * Generate message with parse_mode in
   * Markdown
   * @param {string} text
   * @param {MessageParsed} other?
   * @param {AbortSignal} signal?
   * @return {Promise<Message.TextMessage>}
   */
  replyWithMarkdown(
    text: string,
    other?: MessageParsed,
    signal?: AbortSignal
  ): Promise<Message.TextMessage> {
    return this.api.sendMessage(this.chat.id, text, {
      parse_mode: 'Markdown',
      ...other,
      ...signal,
    })
  }
  /**
   * Generate message with parse_mode in
   * MarkdownV2
   * @param {string} text
   * @param {MessageParsed} other?
   * @param {AbortSignal} signal?
   * @return {Promise<Message.TextMessage>}
   */
  replyWithMarkdownV2(
    text: string,
    other?: MessageParsed,
    signal?: AbortSignal
  ): Promise<Message.TextMessage> {
    return this.api.sendMessage(this.chat.id, text, {
      parse_mode: 'MarkdownV2',
      ...other,
      ...signal,
    })
  }
  /**
   * Remove the commands and any type
   * of arguments
   * @param {RegExp|string[]} [pattern]
   */
  clean(pattern?: RegExp | string[]): string {
    let text: string = this.msg.text
    if (pattern) {
      if (pattern instanceof RegExp) {
        text = text.replace(pattern, '').trim()
      } else {
        pattern.map((i) => {
          text = text.replace(i, '')
        })
        text = text.trim()
      }
    }
    text = text.replace(argRegex, '').trim()
    return text.replace(/\/\w+\s?/g, '').trim()
  }
  /**
   * Get the arguments in the message and
   * return object with the all params and
   * props.
   * @return {ArgsI | undefined}
   */
  args(): ArgsI | undefined {
    try {
      const text = this.msg.text
      const keys = text.match(argRegex)
      if (keys == null) return undefined
      let obj: ArgsI = {}
      keys.forEach((i) => {
        if (i.includes(':')) {
          let value: string = i.split(':')[1]
          let key: string = i.split(':')[0].replace(/\W/g, '')
          key.length !== 0 ? (obj[key] = value) : (obj[key] = false)
        } else {
          let key: string = i.replace(/\W+/, '')
          obj[key] = true
        }
      })
      return obj
    } catch (error) {
      return undefined
    }
  }
  /**
   * Get specific language of the
   * user in DB and return the
   * local correct module.
   * @return {Promise<LanguageI>}
   */
  async lang(): Promise<LangI> {
    const lang: string = await getLang(this.chat.id)
    const { LANG } = await import(join(localesDir, lang))
    return LANG
  }
  /**
   * Get link in the telegram server
   * based in file_id of the (photo,sticker,video,audio)
   * @param {string} file_id
   * @return {Promise<string>}
   */
  async getLink(file_id: string): Promise<string> {
    const root = 'https://api.telegram.org/bot'
    const method = '/getFile?file_id='
    const apiUrl: string = root + BOT_TOKEN + method + file_id
    // const res = await axios.get()
    const res = await request<any>(apiUrl)
    const filePath: string = res.result.file_path
    return `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`
  }
  /**
   * Evaluate the account_id and return
   * a object from database or undefined if
   * id not exist
   * @param {number} id
   * @return {Promise<{id:number}| undefined>}
   */
  async login(id: number): Promise<{ id: number } | undefined> {
    const users = await validate()
    return users.find((i) => id === i.id)
  }
  /**
   * Add account private or public of
   * the database.
   * @return {Promise<void>}
   */
  async signIn(): Promise<void> {
    const data: any = await this.getChat()
    const newAccount: AccountsTable = {
      id: data.id,
      type: data.type,
      lang: data.language_code || 'es',
      ...(data.title && { title: data.title }),
      ...(data.username && { username: data.usename }),
      ...(data.first_name && { first_name: data.first_name }),
      ...(data.invite_link && { invite_link: data.invite_link }),
    }
    await createAccount(newAccount)
  }
}
