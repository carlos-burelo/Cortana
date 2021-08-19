import { Telegraf } from 'telegraf';
import { lang } from '../../database';
import { decideBio, delBio, getBio } from '../controllers/bios.controller';
import { BioI } from '../types';
import { log } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command('bio', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      let arg: string = ctx.message.text.split(' ')[1];
      if (arg && arg == '--rm') {
        let A = await ctx.getChatMember(ctx.message.from.id);
        let B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
        await delBio(ctx, A, B);
      }
      await getBio(ctx, ctx.message.reply_to_message.from);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/bio', l });
    }
  });
  bot.command('setbio', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      let text = ctx.message.text.replace(/\/setbio/g, '').trim();
      if (text.length < 1) {
        return ctx.reply(_.bioModule.emptyBiography);
      }
      let Bio: BioI = {
        id: ctx.message.reply_to_message.from.id,
        bio: text,
        first_name: ctx.message.reply_to_message.from.first_name
      };
      const A = await ctx.getChatMember(ctx.message.from.id);
      const B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
      await decideBio(ctx, A, B, Bio);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/setbio', l });
    }
  });
  bot.command('delbio', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      let text = ctx.message.text.replace(/\/delbio/g, '').trim();
      if (text.length < 1) {
        return ctx.reply(_.bioModule.emptyBiography);
      }
      let Bio: BioI = {
        id: ctx.message.reply_to_message.from.id,
        bio: text,
        first_name: ctx.message.reply_to_message.from.first_name
      };
      const A = await ctx.getChatMember(ctx.message.from.id);
      const B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
      await decideBio(ctx, A, B, Bio);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/delbio', l });
    }
  });
}
