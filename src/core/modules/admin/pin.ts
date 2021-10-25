import { Cortana } from '@context';
import { log } from '@libs/messages';

export async function pinCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    if (ctx.chat.type == 'private') {
      return ctx.reply(_.global.noPrivateChat);
    }
    const id = ctx.message.reply_to_message.message_id;
    ctx.pinChatMessage(id);
    ctx.reply(_.admin.pinSuccess);
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'unpinCmd()' });
  }
}
