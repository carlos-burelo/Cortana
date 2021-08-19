import { readdirSync } from 'fs';
import { resolve } from 'path';
import { Context } from 'telegraf';
import { ChatMember } from 'telegraf/typings/core/types/typegram';
import { BOT_ID, OWNER_ID, rootDir } from '../../config';
import { db, lang } from '../../database';
import { ChatUserI } from '../types';
import { log } from '../libs/messages';

export async function decidePromote(ctx: Context, A: ChatMember, B: ChatMember) {
  try {
    const _ = lang(ctx);
    if (B.status == 'creator') {
      return ctx.reply(_.helpers.anyActionCreator('promote'));
    }
    if (A.status == 'creator' && B.user.id == BOT_ID) {
      return promoteUser(ctx, A.user, B.user);
    }
    if (A.user.id == OWNER_ID) {
      return promoteUser(ctx, A.user, B.user);
    }
    if (A.user.id == B.user.id) {
      return ctx.reply(_.helpers.noYourAutoAction('promote'));
    }
    if (A.status == 'member' && B.status == 'administrator') {
      return ctx.reply(_.helpers.memberActionAdmin('promote'));
    }
    if (A.status == 'administrator' && B.status == 'administrator') {
      return ctx.reply(_.helpers.adminActionAdmin('promote'));
    }
    return promoteUser(ctx, A.user, B.user);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'decidePromote()', l });
  }
}
export async function decideDemote(ctx: Context, A: ChatMember, B: ChatMember) {
  try {
    const _ = lang(ctx);
    if (B.status == 'creator') {
      return ctx.reply(_.helpers.anyActionCreator('promote'));
    }
    if (A.status == 'creator' && B.user.id == BOT_ID) {
      return promoteUser(ctx, A.user, B.user);
    }
    if (A.user.id == OWNER_ID) {
      return promoteUser(ctx, A.user, B.user);
    }
    if (A.user.id == B.user.id) {
      return ctx.reply(_.helpers.noYourAutoAction('promote'));
    }
    if (A.status == 'member' && B.status == 'administrator') {
      return ctx.reply(_.helpers.memberActionAdmin('promote'));
    }
    if (A.status == 'administrator' && B.status == 'administrator') {
      return ctx.reply(_.helpers.adminActionAdmin('promote'));
    }
    return promoteUser(ctx, A.user, B.user);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'decideDemote()', l });
  }
}
export async function promoteUser(ctx: Context, A: ChatUserI, B: ChatUserI) {
  try {
    const _ = lang(ctx);
    ctx.promoteChatMember(B.id, {
      can_change_info: true,
      can_delete_messages: true,
      can_invite_users: true,
      can_pin_messages: true,
      can_promote_members: true,
      can_restrict_members: true,
      can_manage_chat: true
    });
    return ctx.reply(_.helpers.anyActionSuccess('promoted', A.first_name, B.first_name));
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'promoteUser()', l });
  }
}
export async function demoteUser(ctx: Context, A: ChatUserI, B: ChatUserI) {
  try {
    const _ = lang(ctx);
    ctx.promoteChatMember(B.id, {
      can_change_info: false,
      can_post_messages: false,
      can_edit_messages: false,
      can_delete_messages: false,
      can_invite_users: false,
      can_restrict_members: false,
      can_pin_messages: false,
      can_promote_members: false,
      can_manage_chat: false
    });
    return ctx.reply(_.helpers.anyActionSuccess('demote', A.first_name, B.first_name));
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'demoteUser()', l });
  }
}
export async function promoteMe(ctx: Context) {
  try {
    ctx.promoteChatMember(ctx.message.from.id, {
      can_change_info: true,
      can_delete_messages: true,
      can_invite_users: true,
      can_pin_messages: true,
      can_promote_members: true,
      can_restrict_members: true,
      can_manage_chat: true
    });
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'promoteMe()', l });
  }
}

// GET ADMIN LIST
export async function getAdminList(ctx: Context) {
  try {
    const _ = lang(ctx);
    let admins: ChatMember[] = await ctx.getChatAdministrators();
    let adminlist = `*${_.adminModule.adminList}*\n\n`;
    admins.map((admin) => {
      if (admin.status == 'administrator') {
        let name = admin.user.first_name.replace(/[\]\[\(\)_*]/g, '^');
        !name ? (name = 'Deleted account') : name;
        adminlist += `• [${name}](tg://user?id=${admin.user.id})\n`;
      }
    });
    return ctx.replyWithMarkdown(adminlist);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getAdminList()', l });
  }
}
export async function pinMessage(ctx: Context, message_id: number, arg?: '-s' | string) {
  try {
    const _ = lang(ctx);
    ctx.pinChatMessage(message_id, {
      disable_notification: arg == '-s' ? true : false
    });
    ctx.reply(_.adminModule.pinSuccess);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'pinMessage()', l });
  }
}
export async function unPinMessage(ctx: Context, message_id?: number) {
  try {
    const _ = lang(ctx);
    if (!message_id) {
      ctx.unpinAllChatMessages();
      return ctx.reply(_.adminModule.unPinAllSuccess);
    } else {
      ctx.unpinChatMessage(message_id);
      return ctx.reply(_.adminModule.unPinSuccess);
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'unPinMessage()', l });
  }
}
export async function getChatPerms(ctx: Context, p: any, title) {
  try {
    const { permissions: _ } = lang(ctx);
    let text = `${_.title(title)}\n\n`;
    text += `${_.can_send_messages(p['can_send_messages'])}\n`;
    text += `${_.can_send_media_messages(p['can_send_media_messages'])}\n`;
    text += `${_.can_send_polls(p['can_send_polls'])}\n`;
    text += `${_.can_send_other_messages(p['can_send_other_messages'])}\n`;
    text += `${_.can_add_web_page_previews(p['can_add_web_page_previews'])}\n`;
    text += `${_.can_change_info(p['can_change_info'])}\n`;
    text += `${_.can_invite_users(p['can_invite_users'])}\n`;
    text += `${_.can_pin_messages(p['can_pin_messages'])}\n`;
    return ctx.replyWithMarkdown(text);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getChatPerms()', l });
  }
}
export async function getUserPerms(ctx: Context, userId: number) {
  try {
    let p = await ctx.getChatMember(userId);
    const { permissions: _ } = lang(ctx);
    let text = `${_.title(p.user.first_name)}\n\n`;
    text += `${_.can_be_edited(p['can_send_messages'])}\n`;
    text += `${_.can_change_info(p['can_change_info'])}\n`;
    text += `${_.can_delete_messages(p['can_delete_messages'])}\n`;
    text += `${_.can_invite_users(p['can_invite_users'])}\n`;
    text += `${_.can_manage_chat(p['can_manage_chat'])}\n`;
    text += `${_.can_manage_voice_chats(p['can_manage_voice_chats'])}\n`;
    text += `${_.can_promote_members(p['can_promote_members'])}\n`;
    text += `${_.can_pin_messages(p['can_pin_messages'])}\n`;
    text += `${_.can_restrict_members(p['can_restrict_members'])}\n`;
    text += `${_.is_anonymous(p['is_anonymous'])}\n`;
    return ctx.replyWithMarkdown(text);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getUserPerms()', l });
  }
}
export async function getBackup(ctx: Context) {
  try {
    let id = ctx.chat.id.toString();
    let dir: string[] = readdirSync(resolve(rootDir, 'databases'));
    let file: string = dir.find((i) => i.includes(id));
    if (file) {
      let path: string = resolve(rootDir, 'databases', file);
      let text = `*Backup generated successfuly*\n`;
      return ctx.replyWithDocument(
        {
          source: path
        },
        {
          caption: text,
          parse_mode: 'Markdown'
        }
      );
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getBackup()', l });
  }
}
export async function getPrefs(ctx: Context) {
  try {
    const { adminModule: _ } = lang(ctx);
    let p = db(ctx.chat).get('prefs').value();
    const { title }: any = await ctx.getChat();
    let msg = async (p) => {
      let text: any = `${_.prefTitle(title)}\n`;
      Object.keys(p).map((a) => {
        text += `\n*\#${a[0].toUpperCase() + a.substring(1)}'s Prefs:*\n`;
        text += _.stat(p[a].status);
        text += p[a].message ? _.type(p[a].message.type) : '';
        text += p[a].sanction ? _.sanction(p[a].sanction) : '';
      });
      return text;
    };
    return ctx.replyWithMarkdown(await msg(p));
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getPrefs()', l });
  }
}
