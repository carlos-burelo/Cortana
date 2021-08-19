import { Context } from 'telegraf';
import { ChatMember } from 'telegraf/typings/core/types/typegram';
import { BOT_ID, OWNER_ID } from '../../config';
import { db, lang } from '../../database';
import { BioI, ChatUserI } from '../types';
import { log } from '../libs/messages';

export async function getBio(ctx: Context, B: ChatUserI) {
  try {
    const _ = lang(ctx);
    if (db(ctx.chat).get('bios').find({ id: B.id }).value() == undefined) {
      return ctx.reply(_.bioModule.notFound(B.first_name));
    } else {
      let i = db(ctx.chat).get('bios').find({ id: B.id }).value();
      return ctx.reply(`${i.first_name}:\n${i.bio}`, {
        parse_mode: 'Markdown'
      });
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getBio()', l });
  }
}
export async function decideBio(ctx: Context, A: ChatMember, B: ChatMember, Bio: BioI) {
  try {
    const _ = lang(ctx);
    if (A.status == 'member') {
      return ctx.reply(_.global.permissionsDenied);
    }
    if (B.user.id == OWNER_ID) {
      return ctx.reply(_.global.permissionsDenied);
    }
    if (A.user.id !== OWNER_ID && B.user.id == BOT_ID) {
      return ctx.reply(_.global.permissionsDenied);
    }
    let id: number = Bio.id;
    if (db(ctx.chat).get('bios').find({ id: id }).value() == undefined) {
      await setBio(ctx, Bio);
    } else {
      await updateBio(ctx, Bio);
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'decideBio()', l });
  }
}
export async function setBio(ctx: Context, Bio: BioI) {
  const _ = lang(ctx);
  try {
    db(ctx.chat).get('bios').push(Bio).write();
    return ctx.reply(_.bioModule.setBioSuccess);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'setbio()', l });
  }
}
export async function updateBio(ctx: Context, Bio: BioI) {
  const _ = lang(ctx);
  try {
    db(ctx.chat).get('bios').find({ id: Bio.id }).assign(Bio).write();
    return ctx.reply(_.bioModule.updateBioSuccess);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'updateBio()', l });
  }
}
export async function delBio(ctx: Context, A: ChatMember, B: ChatMember) {
  const _ = lang(ctx);
  try {
    if (A.status == 'member') {
      return ctx.reply(_.global.permissionsDenied);
    }
    let i = db(ctx.chat).get('bios').find({ id: B.user.id }).value();
    if (i == undefined) {
      return ctx.reply(_.bioModule.notFound(B.user.first_name));
    }
    db(ctx.chat).get('bios').remove({ id: B.user.id }).write();
    return ctx.reply(_.bioModule.deleteBioSuccess);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'delBio()', l });
  }
}
