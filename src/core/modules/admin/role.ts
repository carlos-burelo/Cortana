import { Cortana } from '@context';
import { log } from '@libs/messages';

export async function roleCmd(ctx: Cortana) {
  try {
    const { admin, global } = await ctx.lang();
    if (!ctx.msg.reply_to_message) return ctx.reply(global.replyMissing);
    const A = await ctx.getChatMember(ctx.from.id);
    const B = await ctx.getChatMember(ctx.msg.reply_to_message.from.id);
    if (A.status == 'member') return ctx.reply(global.notHavePerms);
    if (B.status !== 'administrator' || A.status !== 'administrator') {
      return ctx.reply(admin.notAdmin(B.user.first_name));
    }
    const role = ctx.clean().length > 1 ? ctx.clean() : 'Administrator';
    ctx.setChatAdministratorAuthorCustomTitle(role);
    if (B.user.id == A.user.id) return ctx.reply(admin.noAutoRole);
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'roleCmd()' });
  }
}
