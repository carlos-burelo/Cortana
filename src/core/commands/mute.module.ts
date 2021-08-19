import { Telegraf } from 'telegraf';
import { isAllowed, noAccess, lang } from '../../database';
import { decideMuteUser, decideUnMuteUser } from '../controllers/mute.controller';
import { log } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command('mute', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      const A = await ctx.getChatMember(ctx.message.from.id);
      const B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
      await decideMuteUser(ctx, A, B);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/mute', l });
    }
  });
  bot.command('unmute', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      const A = await ctx.getChatMember(ctx.message.from.id);
      const B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
      await decideUnMuteUser(ctx, A, B);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/unmute', l });
    }
  });
  // bot.command('mute', async (ctx) => {
  //   try {
  //     const _ = lang(ctx)
  //     if (ctx.chat.type == 'private') {
  //       return ctx.reply(_.global.noPrivateChat);
  //     }
  //     if (!ctx.message.reply_to_message) {
  //       return ctx.reply(_.global.noReplyMessage);
  //     }
  //     let A: ChatMember = await ctx.getChatMember(ctx.message.from.id);
  //     let B: ChatMember = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
  //     let arg = ctx.message.text.split(' ')[1];
  //     return setMute(ctx, A, B, arg);
  //   } catch (error) {
  //     const [l] = error.stack.match(/(\d+):(\d+)/);
  //    log({ ctx, error, __filename, f: '/mute', l });
  //   }
  // });
  // bot.command('unmute', async (ctx) => {
  //   try {
  //     const _ = lang(ctx)
  //     if (ctx.chat.type == 'private') {
  //       return ctx.reply(_.global.noPrivateChat);
  //     }
  //     if (!ctx.message.reply_to_message) {
  //       return ctx.reply(_.global.noReplyMessage);
  //     }
  //     let A: ChatMember = await ctx.getChatMember(ctx.message.from.id);
  //     let B: ChatMember = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
  //     let arg = ctx.message.text.split(' ')[1];
  //     return decideUnmute(ctx, A, B, arg);
  //   } catch (error) {
  //     const [l] = error.stack.match(/(\d+):(\d+)/);
  //    log({ ctx, error, __filename, f: '/unmute', l });
  //   }
  // });
}
