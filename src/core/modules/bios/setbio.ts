import { BioI } from '@models/sql';
import { Cortana } from '@context';
import { log } from '@libs/messages';
import { addBio, getBio, updateBio } from '@sql/bio.sql';

export async function setbioCmd(ctx: Cortana) {
  try {
    const { reply_to_message: msg } = ctx.msg;
    if (!msg) return ctx.reply('No message detect');
    const {
      reply_to_message: {
        chat: { id: chatId },
        from: { id: userId },
      },
    } = ctx.msg;
    const text = ctx.clean();
    if (text.length < 1) return ctx.reply('Please add ano bio');
    const bio: BioI = {
      chatId,
      userId,
      text,
    };
    const bioExist = await getBio(chatId, userId);
    const status = !bioExist ? await addBio(bio) : await updateBio(bio);
    status ? ctx.reply('Bio updated') : ctx.reply('Something went wrong');
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: 'setbioCmd()' });
  }
}
