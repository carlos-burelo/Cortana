import { Cortana } from '@context';
import { log } from '@libs/messages';

export async function unpinCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    // let message_id: number;
    if (ctx.chat.type == 'private') return ctx.reply(_.global.noPrivateChat);
    const id = ctx.msg.reply_to_message.message_id;
    if (!id) {
      ctx.unpinAllChatMessages();
      return ctx.reply(_.admin.unPinAllSuccess);
    }
    ctx.unpinChatMessage(id);
    ctx.reply(_.admin.pinSuccess);
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'unpinCmd()' });
  }
}
