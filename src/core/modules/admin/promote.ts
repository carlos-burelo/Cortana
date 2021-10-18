import { ChatMember } from '@grammyjs/types';
import { Cortana } from '../../../context';
import { canPromote } from '../../guard';
import { log } from '../../libs/messages';

export async function promoteCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    if (ctx.chat.type === 'private') return ctx.reply(_.global.noPrivateChat);
    if (!ctx.msg.reply_to_message) return ctx.reply(_.global.replyMissing);
    const a: ChatMember = await ctx.getChatMember(ctx.msg.from.id);
    const b: ChatMember = await ctx.getChatMember(
      ctx.msg.reply_to_message.from.id
    );
    const [perms, method] = canPromote(a, b);
    if (!perms) {
      return ctx.reply(_.helpers[method]('promote'));
    }
    return ctx.reply(
      _.helpers.success(b.user.first_name, 'promoted', a.user.first_name)
    );
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'promoteCmd()' });
  }
}
