import { Telegraf } from 'telegraf';
import { _bot } from '../../config';
import { isAllowed, db, noAccess, lang, setLang } from '../../database';
import { ButtonI } from '../interfaces';
import { createButtons } from '../libs/buttons';
import { errorHandler } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.start(async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    const _ = await lang(ctx);
    try {
      if (ctx.chat.type == 'private') {
        db(ctx.message.from).value();
        ctx.reply(_.startModule.message, {});
      } else {
        db(ctx.chat).value();
        ctx.reply(_.startModule.message, {
          reply_markup: createButtons(_.startModule.buttons, 2)
        });
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/clone', l });
    }
  });
  bot.command('/lang', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = await lang(ctx);
      let lang1: 'es' | 'en' | string = ctx.message.text.split(' ')[1];
      if (lang1 == 'en' || lang1 == 'es') {
        setLang(ctx, lang1);
      } else {
        return ctx.reply(_.global.codeLangError);
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/clone', l });
    }
  });
  bot.action('set_lang', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = await lang(ctx);
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
      errorHandler({ ctx, error, __filename, f: '/clone', l });
    }
  });
  bot.action(/lang:.+/, async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = await lang(ctx);
      let { data }: any = ctx.callbackQuery;
      let lang1 = data.split(':')[1];
      setLang(ctx, lang1);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/clone', l });
    }
  });
}
