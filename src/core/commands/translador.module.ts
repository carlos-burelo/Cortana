import { Telegraf } from 'telegraf';
import { lang } from '../../database';
import { translateText } from '../controllers/translator.controller';
import { cleanText, getArgs, log } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command(['tr', 'tl'], async (ctx) => {
    try {
      let regex: RegExp = /^\/tr\s([A-Z]+)/;
      let code = getArgs(ctx.message.text, regex)[1];
      let text = cleanText(ctx.message.text, regex);
      console.log(code);
      console.log(text);
      // const _ = lang(ctx)
      // let text: string;
      // let lang2: string;
      // if (!ctx.message.reply_to_message) {
      //   text = ctx.message.text.replace(/\/tr|\/tl/, '').trim();
      //   if (text.length >= 200) {
      //     return ctx.reply(_.trasnlatorModule.limit);
      //   }
      //   lang2 = text.split('')[0];
      //   if (lang2.length > 2) {
      //     return ctx.reply(_.global.codeLangError);
      //   }
      //   text = text.replace(lang2, '').trim();
      // } else {
      //   lang2 = ctx.message.text.replace(/\/tr|\/tl/, '').trim();
      //   if (lang2.length > 2) {
      //     return ctx.reply(_.global.codeLangError);
      //   }
      //   let { text: text2 }: any = ctx.update.message.reply_to_message;
      //   if (text2 >= 200) {
      //     return ctx.reply(_.trasnlatorModule.limit);
      //   }
      //   text = text2;
      // }
      // let translated = await translateText(ctx, lang2, text);
      // ctx.reply(translated)
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/tr', l });
    }
  });
}
