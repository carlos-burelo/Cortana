import { Context } from 'telegraf';
import { ChatMember } from 'typegram';
import { BOT_ID, OWNER_ID } from '../../config';
import { db, lang } from '../../database';
import { ChatUserI, WarnI } from '../types';
import { log } from '../libs/messages';

export async function getWarn(ctx: Context, id: number): Promise<WarnI> {
  try {
    let user = db(ctx.chat).get('warns').find({ id: id }).value();
    if (!user || user == undefined) {
      return undefined;
    } else {
      return user;
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getWarn()', l });
  }
}
export async function setWarn(ctx: Context, A: ChatMember, B: ChatMember, reason: string) {
  const _ = lang(ctx);
  try {
    if (B.status == 'creator') {
      return ctx.reply(_.helpers.anyActionCreator('warn'));
    }
    if (B.user.id == BOT_ID) {
      return ctx.reply(_.global.preventBot);
    }
    if (B.user.id == OWNER_ID) {
      return ctx.reply(_.global.preventOwner);
    }
    if (A.status == 'member' && B.status == 'administrator') {
      return ctx.reply(_.helpers.memberActionAdmin('warn'));
    }
    let user: WarnI | any = await getWarn(ctx, B.user.id);
    if (user !== undefined) {
      if (user.count < 2) {
        db(ctx.chat)
          .get('warns')
          .find({ id: user.id })
          .assign({ count: user.count + 1 })
          .write();
        db(ctx.chat).get('warns').find({ id: user.id }).get('reasons').push(reason).write();
        return ctx.reply(_.warnModule.lastWarn);
      }
      if (user.count == 2) {
        return ctx.reply('Por ahora no puedo banear, por ahora...');
      }
    } else {
      let warnedUser: WarnI = {
        id: B.user.id,
        count: 1,
        username: B.user.username,
        first_name: B.user.first_name,
        reasons: [reason]
      };
      db(ctx.chat).get('warns').push(warnedUser).write();
      return ctx.reply(_.warnModule.firstWarn);
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'setWarn()', l });
  }
}
export async function getWarnInfo(ctx: Context, B: ChatUserI) {
  try {
    const _ = lang(ctx);
    let user: WarnI = await getWarn(ctx, B.id);
    if (user !== undefined) {
      let text = _.warnModule.warnInfo(user);
      user.reasons.map((r, i) => (text += `<b>${i + 1}</b> - ${r}\n`));
      return ctx.replyWithHTML(text);
    } else {
      return ctx.reply(_.warnModule.noWarns(B.user.first_name));
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getWarnInfo()', l });
  }
}
export async function removeWarn(ctx: Context, A: ChatMember, B: ChatMember) {
  const _ = lang(ctx);
  try {
    if (A.status == 'member') {
      return ctx.reply(_.global.permissionsDenied);
    }
    let user: WarnI = await getWarn(ctx, B.user.id);
    if (user !== undefined) {
      if (user.count == 1) {
        db(ctx.chat).get('warns').remove({ id: user.id }).write();
        return ctx.reply(_.warnModule.allWarnsRemoved);
      } else {
        db(ctx.chat)
          .get('warns')
          .find({ id: user.id })
          .assign({ count: user.count - 1 })
          .write();
        return ctx.reply(_.warnModule.warnRemoved);
      }
    } else {
      return ctx.reply(_.warnModule.noWarns(B.user.first_name));
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'removeWarn()', l });
  }
}
