import { Message, Update, UserFromGetMe } from 'grammy/out/platform';
import { Other } from 'grammy/out/core/api';
import { getLang } from './core/sql';
import { argRegex, BOT_TOKEN, localesDir } from './config';
import { Api, Context, RawApi } from 'grammy';
import { resolve as join } from 'path';
import { ArgsI } from './core/types';
import axios from 'axios';
import { LangI } from './core/types/locales';

interface MessageParsed extends Omit<Other<RawApi, 'sendMessage', 'text'>, 'parse_mode'> {}

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
    super(update, api, me);
  }
  /**
   * Generate message with parse_mode in
   * HTML
   * @param {string} text
   * @param {MessageParsed} other?
   * @param {AbortSignal} signal?
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
      ...signal
    });
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
      ...signal
    });
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
      ...signal
    });
  }
  /**
   * Get specific language of the
   * user in DB and return the
   * local correct module.
   * @return {Promise<LanguageI>}
   */
  async lang(): Promise<LangI> {
    const lang: string = await getLang(this.chat.id);
    const { LANG } = await import(join(localesDir, lang));
    return LANG;
  }
  /**
   * Remove the commands and any type
   * of arguments
   * @param {RegExp|string[]} [pattern]
   */
  clean(pattern?: RegExp | string[]): string {
    let text: string = this.msg.text;
    if (pattern) {
      if (pattern instanceof RegExp) {
        text = text.replace(pattern, '').trim();
      } else {
        pattern.map((i) => {
          text = text.replace(i, '');
        });
        text = text.trim();
      }
    }
    text = text.replace(argRegex, '').trim();
    return text.replace(/\/\w+\s?/g, '').trim();
  }
  args(): ArgsI | undefined {
    try {
      const text = this.msg.text;
      const keys = text.match(argRegex);
      if (keys == null) return undefined;
      let obj: ArgsI = {};
      keys.forEach((i) => {
        if (i.includes(':')) {
          let value: string = i.split(':')[1];
          let key: string = i.split(':')[0].replace(/\W/g, '');
          key.length !== 0 ? (obj[key] = value) : (obj[key] = false);
        } else {
          let key: string = i.replace(/\W+/, '');
          obj[key] = true;
        }
      });
      return obj;
    } catch (error) {
      return undefined;
    }
  }
  get params() {
    return this.msg.text.replace(/\/\w+\s?/, '').split(' ');
  }
  async getLink(file_id: string) {
    const root = 'https://api.telegram.org/bot';
    const method = '/getFile?file_id=';
    const apiUrl: string = root + BOT_TOKEN + method + file_id;
    const res = await axios.get(apiUrl);
    const filePath: string = res.data.result.file_path;
    return `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
  }
  get help(): boolean {
    if (this.params.includes('-help')) {
      return true;
    } else {
      return false;
    }
  }
}
