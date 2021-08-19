import { lang } from '../../database';
import { Telegraf } from 'telegraf';
import { ChatMember } from 'telegraf/typings/core/types/typegram';
import { decideBan, decideUnBan, setBanMessage } from '../controllers/ban.controller';
import { matchMessage, log } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command('ban', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      const A: ChatMember = await ctx.getChatMember(ctx.message.from.id);
      const B: ChatMember = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
      await decideBan(ctx, A, B);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/ban', l });
    }
  });
  bot.command('unban', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      const A: ChatMember = await ctx.getChatMember(ctx.message.from.id);
      const B: ChatMember = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
      await decideUnBan(ctx, A, B);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/unban', l });
    }
  });
  bot.command('setban', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      let reply: any = ctx.message.reply_to_message;
      let msg = matchMessage(reply);
      await setBanMessage(ctx, msg);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/setban', l });
    }
  });
  bot.command('gban', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      let reply: any = ctx.message.reply_to_message;
      let msg = matchMessage(reply);
      await setBanMessage(ctx, msg);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/gban', l });
    }
  });
}
