import { Telegraf } from 'telegraf';
import {
  greetingStatus,
  sendGreetings,
  setGreetins,
  welcomeOwner
} from '../controllers/welcome.controller';
import { _owner, _bot } from '../../config';
import { ChatUserI } from '../interfaces';
import { lang } from '../../database';
import { matchMessage, errorHandler } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.on('new_chat_members', async (ctx) => {
    try {
      let {
        message: { new_chat_member: member }
      }: ChatUserI | any = ctx.update;
      if (member.id == _owner.id) {
        return welcomeOwner(ctx, _owner);
      }
      return sendGreetings(ctx, member, 'welcome');
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: 'new_chat_members', l });
    }
  });
  bot.command('/welcome', async (ctx) => {
    try {
      const _ = await lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      let msg = ctx.message.text.replace(/\/welcome/, '').trim();
      if (msg == 'on') {
        return greetingStatus(ctx, true, 'welcome');
      }
      if (msg == 'off') {
        return greetingStatus(ctx, false, 'welcome');
      }
      if (ctx.message.reply_to_message) {
        let reply: any = ctx.message.reply_to_message;
        let msg = matchMessage(reply);
        return setGreetins(ctx, msg, 'welcome');
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/welcome', l });
    }
  });
  bot.on('left_chat_member', async (ctx) => {
    try {
      let {
        message: { left_chat_member: member }
      }: ChatUserI | any = ctx.update;
      return sendGreetings(ctx, member, 'goodbye');
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: 'left_chat_member', l });
    }
  });
  bot.command('/goodbye', async (ctx) => {
    try {
      const _ = await lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      let msg = ctx.message.text.replace(/\/goodbye/, '').trim();
      if (msg == 'on') {
        return greetingStatus(ctx, true, 'goodbye');
      }
      if (msg == 'off') {
        return greetingStatus(ctx, false, 'goodbye');
      }
      if (ctx.message.reply_to_message) {
        let reply: any = ctx.message.reply_to_message;
        let msg = matchMessage(reply);
        return setGreetins(ctx, msg, 'goodbye');
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/goodbye', l });
    }
  });
}
