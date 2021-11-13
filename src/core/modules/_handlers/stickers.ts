import { LOG_CHANEL } from '@config';
import { Cortana } from '@context';
import { log, md, sendMessage } from '@libs/messages';
import { MsgI } from '@models/index';

export async function stickerHandleCmd(ctx: Cortana) {
  try {
    if (ctx.chat.type == 'private') {
      const { file_id } = ctx.msg.sticker;
      const msg: MsgI = {
        type: 'sticker',
        content: file_id,
      };
      const id: string = LOG_CHANEL;
      await sendMessage({ ctx, msg, id });
      const userId = ctx.from.id as number;
      const message = md(
        `*Sticker request*\nUser: [${
          ctx.from.first_name || 'this'
        }](tg:user?id=${userId})\nstickerId: \`${file_id}\``
      );
      await sendMessage({ ctx, msg: { type: 'text', content: message }, id });
    } else return;
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'stickerHandleCmd()' });
  }
}
