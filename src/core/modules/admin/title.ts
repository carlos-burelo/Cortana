import { Cortana } from '@context';
import { log } from '@libs/messages';

export async function setTitleCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    if (ctx.chat.type === 'private') return ctx.reply(_.global.noPrivateChat);
    const { params } = ctx;
    const user = await ctx.getChatMember(ctx.from.id);
    if (user.status == 'member') return ctx.reply(_.global.notHavePerms);
    const title = params.join(' ');
    if (title.length == 0) return ctx.reply(_.admin.noTitleFound);
    if (title.length > 16) return ctx.reply(_.admin.titleTooLong);
    await ctx.setChatTitle(title);
    ctx.reply(_.admin.setTitleSuccess);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: 'setTitleCmd()' });
  }
}
