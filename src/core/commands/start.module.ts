import { Telegraf } from 'telegraf';
import { isAllowed, db, noAccess, lang, setLang } from '../../database';
import { ButtonI } from '../types';
import { createButtons } from '../libs/buttons';
import { log } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.start(async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    const { startModule: _ } = lang(ctx);
    try {
      if (ctx.chat.type == 'private') {
        db(ctx.message.from).value();
        ctx.replyWithMarkdown(_.message(ctx.message.from.first_name), {
          reply_markup: createButtons(_.buttons, 2)
        });
      } else {
        db(ctx.chat).value();
        ctx.reply(_.message(ctx.message.from.first_name), {
          reply_markup: createButtons(_.buttons, 2)
        });
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/clone', l });
    }
  });
  bot.command('lang', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      let lang1: 'es' | 'en' | string = ctx.message.text.split(' ')[1];
      if (lang1 == 'en' || lang1 == 'es') {
        setLang(ctx, lang1);
      } else {
        return ctx.reply(_.global.codeLangError);
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/clone', l });
    }
  });
  bot.action('set_lang', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      let langs: ButtonI[] = [
        { text: 'Español 🇲🇽', callback: 'lang:es' },
        { text: 'English 🇺🇸', callback: 'lang:en' }
      ];
      ctx.editMessageText(_.global.chooseLang, {
        reply_markup: createButtons(langs, 1),
        parse_mode: 'Markdown'
      });
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/clone', l });
    }
  });
  bot.action(/lang:.+/, async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      let { data }: any = ctx.callbackQuery;
      let lang1 = data.split(':')[1];
      setLang(ctx, lang1);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/clone', l });
    }
  });
}
