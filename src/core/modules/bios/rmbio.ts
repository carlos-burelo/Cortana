import { getBio, removeBio } from '@sql/bio.sql';
import { Cortana } from '@context';
import { log } from '@libs/messages';

export async function rmbioCmd(ctx: Cortana) {
  try {
    const { reply_to_message: msg } = ctx.msg;
    if (!msg) return ctx.reply('No message detect');
    const {
      reply_to_message: {
        chat: { id: chatId },
        from: { id: userId },
      },
    } = ctx.msg;
    const bioExist = await getBio(chatId, userId);
    const status = bioExist ? await removeBio(chatId, userId) : false;
    return ctx.reply(status ? 'Bio removed' : 'No bio found');
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: 'rmbioCmd()' });
  }
}
