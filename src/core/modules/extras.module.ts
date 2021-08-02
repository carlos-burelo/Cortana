import { Telegraf } from 'telegraf';
import { lang } from '../../database';
import { array_lolis } from '../components/extras.component';
import {
  deleteSticker,
  getCurrency,
  getIdFromFile,
  kangSticker,
  parseMarkdown
} from '../controllers/extras.controller';
import { createButtons, extractButtons } from '../libs/buttons';
import { matchMessage, errorHandler } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command('/getid', async (ctx) => {
    try {
      const _ = await lang(ctx);
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      getIdFromFile(ctx);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/getid', l });
    }
  });
  bot.command('/cc', async (ctx) => {
    try {
      const { extrasModule: _ } = await lang(ctx);
      let msg: string[] = ctx.message.text.split(' ');
      let base: number = parseInt(msg[1]);
      if (!base) return ctx.reply(_.noBaseFound);
      if (isNaN(base)) return ctx.reply(_.baseIsNaN);
      let orig: string = msg[2].toUpperCase();
      if (!orig) return ctx.reply(_.origNotFound);
      let dest: string = msg[3].toUpperCase();
      if (!dest) return ctx.reply(_.destNotFound);
      await getCurrency(ctx, dest, orig, base);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/cc', l });
    }
  });
  bot.command('/loli', async (ctx) => {
    try {
      return ctx.replyWithSticker(array_lolis[Math.floor(Math.random() * array_lolis.length)]);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/loli', l });
    }
  });
  bot.command('/poll', async (ctx) => {
    const _ = await lang(ctx);
    if (ctx.chat.type == 'private') {
      return ctx.reply(_.global.noPrivateChat);
    }
    let msg = ctx.message.text.replace(/\/poll/, '').trim();
    if (msg.length == 0) {
      return ctx.reply(_.extrasModule.emptyPoll);
    }
    try {
      let title: string[] | string = msg.match(/\[.*?\]/gi);
      if (title == null) {
        return ctx.reply(_.extrasModule.emptyTitlePoll);
      }
      title = title[0].replace(/[\[\]]/g, '');
      let resp: string[] | string = msg.match(/".*?"/gi);
      if (resp == null) {
        return ctx.reply(_.extrasModule.emptyTitlePoll);
      }
      if (resp.length == 1) {
        return ctx.reply(_.extrasModule.minResp);
      }
      resp = resp.map((r) => r.replace(/"/g, ''));
      return ctx.replyWithPoll(title, resp, {
        is_anonymous: false
      });
    } catch (error) {
      ctx.reply(_.extrasModule.errorFormatPoll);
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/promote', l });
    }
  });
  bot.command('/kang', async (ctx) => {
    try {
      const _ = await lang(ctx);
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      let arg: string = ctx.message.text.split(' ')[1];
      if (arg == '--rm') {
        let {
          sticker: { file_id }
        }: any = ctx.message.reply_to_message;
        if (!file_id) {
          return ctx.reply(_.extrasModule.kangFormatError);
        }
        return await deleteSticker(ctx, file_id);
      }
      let reply: any = ctx.message.reply_to_message;
      const file = matchMessage(reply);
      const user = ctx.message.from;
      switch (file.type) {
        case 'photo':
          await kangSticker(ctx, user, file, arg);
          break;
        case 'sticker':
          await kangSticker(ctx, user, file, arg);
          break;
        default:
          ctx.reply(_.extrasModule.kangFormatError);
          break;
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/kang', l });
    }
  });
  bot.command('/md', async (ctx) => {
    try {
      let text: string = ctx.message.text.replace('/md', '').trim();
      if (ctx.message.reply_to_message) {
        let { text: tx }: any = ctx.message.reply_to_message;
        text = tx;
      }
      let preview: boolean = false;
      let cols: number = 1;
      parseMarkdown(ctx, text, preview, cols);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/md', l });
    }
  });
  bot.command('/html', async (ctx) => {
    try {
      const { text, buttons } = extractButtons(ctx.message.text.replace('/html', '').trim());
      ctx.replyWithHTML(text, {
        reply_markup: createButtons(buttons, 2)
      });
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/html', l });
    }
  });
}
