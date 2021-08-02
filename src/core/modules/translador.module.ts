import { Telegraf } from 'telegraf';
import { lang } from '../../database';
import { translateText } from '../controllers/translator.controller';
import { errorHandler } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command('/tr', async (ctx) => {
    try {
      const _ = await lang(ctx);
      let text: string;
      let lang2: string;
      if (!ctx.message.reply_to_message) {
        text = ctx.message.text.replace(/\/tr|\/tl/, '').trim();
        if (text.length >= 200) {
          return ctx.reply(_.trasnlatorModule.limit);
        }
        lang2 = text.split('')[0];
        if (lang2.length > 2) {
          return ctx.reply(_.global.codeLangError);
        }
        text = text.replace(lang2, '').trim();
      } else {
        lang2 = ctx.message.text.replace(/\/tr|\/tl/, '').trim();
        if (lang2.length > 2) {
          return ctx.reply(_.global.codeLangError);
        }
        let { text: text2 }: any = ctx.update.message.reply_to_message;
        if (text2 >= 200) {
          return ctx.reply(_.trasnlatorModule.limit);
        }
        text = text2;
      }
      await translateText(ctx, lang2, text);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/tr', l });
    }
  });
}
