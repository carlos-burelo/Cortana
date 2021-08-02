import { Telegraf } from 'telegraf';
import { isAllowed, noAccess, lang } from '../../database';
import { getWarnInfo, removeWarn, setWarn } from '../controllers/warn.controller';
import { clean, errorHandler } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command('/warn', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = await lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      const A = await ctx.getChatMember(ctx.message.from.id);
      const B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
      const reason = clean(ctx.message.text);
      if (!reason || reason.length == 0) {
        return ctx.reply(_.warnModule.reason);
      }
      setWarn(ctx, A, B, reason);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/warn', l });
    }
  });
  bot.command('/warns', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = await lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      return getWarnInfo(ctx, ctx.message.reply_to_message.from);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/warns', l });
    }
  });
  bot.command('/rmwarn', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = await lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        return ctx.reply(_.global.noReplyMessage);
      }
      const A = await ctx.getChatMember(ctx.message.from.id);
      const B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
      return removeWarn(ctx, A, B);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/rmwarn', l });
    }
  });
}
