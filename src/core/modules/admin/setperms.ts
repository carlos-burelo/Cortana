import { Cortana } from '@context';
import { log } from '@libs/messages';

export async function setpermsCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    ctx.setChatPermissions({
      can_add_web_page_previews: true,
      can_change_info: true,
      can_invite_users: true,
      can_pin_messages: true,
      can_send_media_messages: true,
      can_send_messages: true,
      can_send_other_messages: true,
      can_send_polls: true,
    });
    return ctx.reply(_.admin.setPermsSuccess);
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'setpermsCmd()' });
  }
}
