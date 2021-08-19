import { Context } from 'telegraf';
import { ChatMember } from 'typegram';
import { BOT_ID, OWNER_ID } from '../../config';
import { lang } from '../../database';
import { log } from '../libs/messages';
import { ExtraRestrictChatMember } from 'telegraf/typings/telegram-types';
import { ChatUserI } from '../types';

const muteRights: ExtraRestrictChatMember = {
  permissions: { can_send_messages: false }
};
const unMuteRights: ExtraRestrictChatMember = {
  permissions: { can_send_messages: true }
};
export async function decideMuteUser(ctx: Context, A: ChatMember, B: ChatMember) {
  const _ = lang(ctx);
  try {
    if (B.status == 'creator') {
      return ctx.reply(_.helpers.anyActionCreator('mute'));
    }
    if (B.user.id == OWNER_ID) {
      return ctx.reply(_.helpers.anyActionOwner('mute'));
    }
    if (B.user.id == BOT_ID) {
      return ctx.reply(_.global.preventBot);
    }
    if (A.user.id == OWNER_ID) {
      return await muteUser(ctx, A.user, B.user);
    }
    if (A.status == 'member' && B.status == 'administrator') {
      return ctx.reply(_.helpers.adminActionAdmin('mute'));
    }
    if (A.status == 'administrator' && B.status == 'administrator') {
      return ctx.reply(_.helpers.adminActionAdmin('mute'));
    }
    return await muteUser(ctx, A.user, B.user);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'decideMuteUser()', l });
  }
}
export async function muteUser(ctx: Context, A: ChatUserI, B: ChatUserI) {
  const _ = lang(ctx);
  try {
    await ctx.restrictChatMember(B.id, muteRights);
    return ctx.reply(_.helpers.anyActionSuccess('mute', A.first_name, B.first_name));
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'muteUser()', l });
    return ctx.reply(_.helpers.actionError('mute'));
  }
}
export async function decideUnMuteUser(ctx: Context, A: ChatMember, B: ChatMember) {
  const _ = lang(ctx);
  try {
    if (B.status == 'creator') {
      return ctx.reply(_.muteModule.noUnMuted(B.user.first_name));
    }
    if (B.user.id == OWNER_ID) {
      return ctx.reply(_.muteModule.noUnMuted(B.user.first_name));
    }
    if (B.user.id == BOT_ID) {
      return ctx.reply(_.muteModule.noUnMuted(B.user.first_name));
    }
    if (A.status == 'member') {
      return ctx.reply(_.global.permissionsDenied);
    }
    return await unMuteUser(ctx, B.user);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'decideUnMuteUser()', l });
  }
}
export async function unMuteUser(ctx: Context, B: ChatUserI) {
  const _ = lang(ctx);
  try {
    await ctx.restrictChatMember(B.id, unMuteRights);
    return ctx.reply(_.muteModule.unMuted(B.first_name));
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'unMuteUser()', l });
    return ctx.reply(_.muteModule.noUnMuted(B.first_name));
  }
}

// export async function setMute(ctx: Context, A: ChatMember, B: ChatMember, args?: string) {
//   try {
//     const _ = lang(ctx)
//     if (B.user.id == BOT_ID) {
//       return ctx.reply(_.helpers.noAutoAction('mute'));
//     }
//     if (B.status == 'creator') {
//       return ctx.reply(_.helpers.anyActionCreator('mute'));
//     }
//     if (A.user.id == OWNER_ID) {
//       if (!args) {
//         args = '$messages';
//       }
//       return muteUser(ctx, B.user, args);
//     }
//     if (isSudo(B.user.id)) {
//       return ctx.reply(_.global.preventSudo(B.user.first_name));
//     }
//     if (A.user.id == A.user.id) {
//       return ctx.reply(_.helpers.noYourAutoAction('mute'));
//     }
//     if (A.status == 'member' && B.status == 'administrator') {
//       return ctx.reply(_.helpers.memberActionAdmin('mute'));
//     }
//     if (A.status == 'administrator' && B.status == 'administrator') {
//       return ctx.reply(_.helpers.adminActionAdmin('mute'));
//     }
//     if (!args) {
//       args = '$messages';
//       return muteUser(ctx, B.user, args);
//     }
//   } catch (error) {
//     const [l] = error.stack.match(/(\d+):(\d+)/);
//    log({ ctx, error, __filename, f: 'setMute()', l });
//   }
// }
// export async function decideUnmute(ctx: Context, A: ChatMember, B: ChatMember, args?: string) {
//   try {
//     const _ = lang(ctx)
//     if (B.user.id == BOT_ID) {
//       return ctx.reply(_.global.preventBot);
//     }
//     if (B.user.id == OWNER_ID) {
//       return ctx.reply(_.global.preventOwner);
//     }
//     if (A.user.id == OWNER_ID) {
//       unMuteUser(ctx, B.user, args);
//     }
//     if (A.status == 'member') {
//       return ctx.reply(_.global.permissionsDenied);
//     }
//     unMuteUser(ctx, B.user, args);
//   } catch (error) {
//     const [l] = error.stack.match(/(\d+):(\d+)/);
//    log({ ctx, error, __filename, f: 'decideUnmute()', l });
//   }
// }
// export async function argEvalue(ctx: Context, arg: string, v: boolean) {
//   try {
//     switch (arg) {
//       case '$all':
//         return {
//           can_change_info: v,
//           can_delete_messages: v,
//           can_invite_users: v,
//           can_pin_messages: v,
//           can_promote_members: v,
//           can_restrict_members: v,
//           can_manage_chat: v
//         };
//       case '$messages':
//         return { can_send_messages: v };
//       case '$media':
//         return { can_send_media_messages: v };
//       case '$pin':
//         return { can_pin_messages: v };
//       default:
//         return { can_send_messages: v };
//     }
//   } catch (error) {
//     const [l] = error.stack.match(/(\d+):(\d+)/);
//    log({ ctx, error, __filename, f: 'argEvalue()', l });
//   }
// }

// export async function muteUser(ctx: Context, user: ChatUserI, args: string) {
//   try {
//     let perms = await argEvalue(ctx, args, false);
//     ctx.restrictChatMember(user.id, { permissions: perms });
//   } catch (error) {
//     const [l] = error.stack.match(/(\d+):(\d+)/);
//    log({ ctx, error, __filename, f: 'muteUser()', l });
//   }
// }
// export async function unMuteUser(ctx: Context, user: ChatUserI, args: string) {
//   try {
//     let perms = await argEvalue(ctx, args, true);
//     console.log(perms);
//     ctx.restrictChatMember(user.id, { permissions: perms });
//   } catch (error) {
//     const [l] = error.stack.match(/(\d+):(\d+)/);
//    log({ ctx, error, __filename, f: 'unMuteUser()', l });
//   }
// }
