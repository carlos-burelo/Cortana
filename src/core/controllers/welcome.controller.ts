import { Context } from 'telegraf';
import { db, lang } from '../../database';
import { _bot, _owner } from '../../config';
import { ChatUserI, MsgI, OwnerI, WelcomeI } from '../interfaces';
import { editMessage, errorHandler, sendMessage } from '../libs/messages';
import { promoteUser } from './admin.controller';

export async function welcomeOwner(ctx: Context, user: OwnerI | ChatUserI) {
  try {
    const _ = await lang(ctx);
    let { message_id: id } = await ctx.replyWithMarkdown(`\`${_.welcomeModule.ownerProcess[0]}\``);
    try {
      await editMessage({ ctx, id, text: `\`${_.welcomeModule.ownerProcess[1]}\`` });
      await promoteUser(ctx, _bot, user);
      await editMessage({ ctx, id, text: `\`${_.welcomeModule.ownerProcess[3]}\`` });
    } catch (error) {
      await editMessage({ ctx, id, text: `\`${_.welcomeModule.ownerProcess[2]}\`` });
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'welcomeOwner()', l });
  }
}
export async function getPrefs(ctx: Context, pref: 'welcome' | 'goodbye'): Promise<WelcomeI> {
  try {
    return db(ctx.chat).get(`prefs.${pref}`).value();
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'getPrefs()', l });
  }
}
export async function sendGreetings(ctx: Context, member: ChatUserI, pref: 'welcome' | 'goodbye') {
  try {
    let { status, message } = await getPrefs(ctx, pref);
    if (status == true) {
      if (message.text) {
        message.content = message.text;
        message.type = 'text';
      }
      return await sendMessage({ ctx, msg: message, id: ctx.chat.id, vars: member });
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'sendGreetings()', l });
  }
}
export async function setGreetins(ctx: Context, msg: MsgI, pref: 'welcome' | 'goodbye') {
  const _ = await lang(ctx);
  try {
    db(ctx.chat).get(`prefs`).get(pref).assign({ message: msg }).write();
    return ctx.reply(_.welcomeModule.prefSuccess(pref));
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'setGreetings()', l });
  }
}
export async function greetingStatus(ctx: Context, stat: boolean, pref: 'welcome' | 'goodbye') {
  try {
    const _ = await lang(ctx);
    let { status } = db(ctx.chat).get('prefs').get(pref).value();
    if (status == stat) {
      return ctx.reply(_.welcomeModule.prefRepeat(`${stat ? 'on' : 'off'}`));
    }
    db(ctx.chat).get(`prefs`).get(pref).assign({ status: stat }).write();
    return ctx.reply(_.welcomeModule.prefSuccess(pref));
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'greetingsStatus()', l });
  }
}
