import { BOT_ID } from '@config';
import { Cortana } from '@context';
import { log } from '@libs/messages';

export async function promoteCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    if (ctx.chat.type === 'private') return ctx.reply(_.global.noPrivateChat);
    if (!ctx.msg.reply_to_message) return ctx.reply(_.global.replyMissing);
    const promoter: any = await ctx.getChatMember(ctx.from.id);
    const member = await ctx.getChatMember(ctx.msg.reply_to_message.from.id);
    if (!(promoter.can_promote_members || promoter.status == 'creator') /* || SUDO EXCEPTION*/) {
      return ctx.reply("You don't have the necessary rights to do that!");
    }
    if (member.status == 'administrator' || member.status == 'creator') {
      return ctx.reply("How am I meant to promote someone that's already an admin?");
    }
    if (member.user.id == BOT_ID) {
      return ctx.reply("I can't promote myself! Get an admin to do it for me.");
    } else {
      if (!(await promote(ctx, member.user.id))) {
        return ctx.reply('Hubo un erorr al promover al usuario');
      }
    }
    return ctx.reply('El usuario ha sido promovido');
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'promoteCmd()' });
  }
}
export async function promote(ctx: Cortana, id: number): Promise<boolean> {
  try {
    return await ctx.promoteChatMember(id, {
      can_change_info: true,
      can_delete_messages: true,
      can_invite_users: true,
      can_pin_messages: true,
      can_promote_members: true,
      can_restrict_members: true,
      can_manage_chat: true,
    });
  } catch (error) {
    return false;
  }
}
