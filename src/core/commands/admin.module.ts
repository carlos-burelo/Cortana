import { Telegraf } from 'telegraf';
import { ChatMember } from 'typegram';
import { OWNER_ID } from '../../config';
import {
  decideDemote,
  decidePromote,
  getAdminList,
  getBackup,
  getChatPerms,
  getPrefs,
  getUserPerms,
  pinMessage,
  promoteMe,
  unPinMessage
} from '../controllers/admin.controller';
import { isAllowed, noAccess, lang } from '../../database';
import { log } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command('promote', async (ctx) => {
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
      let emisor: ChatMember = await ctx.getChatMember(ctx.message.from.id);
      let receptor: ChatMember = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
      await decidePromote(ctx, emisor, receptor);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/promote', l });
    }
  });
  bot.command('demote', async (ctx) => {
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
      let emisor: ChatMember = await ctx.getChatMember(ctx.message.from.id);
      let receptor: ChatMember = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
      await decideDemote(ctx, emisor, receptor);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/demote', l });
    }
  });
  bot.command('promoteme', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (ctx.message.from.id !== OWNER_ID) {
        return ctx.reply(_.global.onlyOwner);
      }
      await promoteMe(ctx);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/promoteme', l });
    }
  });
  bot.command(['/admins', '/adminlist'], async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      await getAdminList(ctx);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: "['/admins','/adminlist']", l });
    }
  });
  bot.command('link', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      let { invite_link, title }: any = await ctx.getChat();
      ctx.replyWithMarkdown(`[${title}](${invite_link})\n`, {
        disable_web_page_preview: false,
        allow_sending_without_reply: true
      });
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/link', l });
    }
  });
  bot.command('pin', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      let msgId: number;
      let arg: '&s' | string;
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        msgId = ctx.message.message_id;
      }
      msgId = ctx.message.reply_to_message.message_id;
      if (ctx.message.text.split(' ')[1] == '&s') {
        arg = ctx.message.text.split(' ')[1];
      }
      pinMessage(ctx, msgId, arg);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/pin', l });
    }
  });
  bot.command('unpin', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      let msgId: number;
      let arg: '&all' | string;
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message && arg !== '&all') {
        return ctx.reply(_.adminModule.unPinSuggestion);
      }
      msgId = ctx.message.reply_to_message.message_id;
      await unPinMessage(ctx, msgId);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/unpin', l });
    }
  });
  bot.command('perms', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      if (!ctx.message.reply_to_message) {
        let { permissions: p, title }: any = await ctx.getChat();
        await getChatPerms(ctx, p, title);
      } else {
        let id = ctx.message.reply_to_message.from.id;
        await getUserPerms(ctx, id);
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/perms', l });
    }
  });
  bot.command('serperms', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      ctx.setChatPermissions({
        can_add_web_page_previews: true,
        can_change_info: true,
        can_invite_users: true,
        can_pin_messages: true,
        can_send_media_messages: true,
        can_send_messages: true,
        can_send_other_messages: true,
        can_send_polls: true
      });
      return ctx.reply(_.permissions.setPermsSuccess);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/serperms', l });
    }
  });
  bot.command('backup', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      getBackup(ctx);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/backup', l });
    }
  });
  bot.command('prefs', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const _ = lang(ctx);
      await getPrefs(ctx);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/prefs', l });
    }
  });
}
