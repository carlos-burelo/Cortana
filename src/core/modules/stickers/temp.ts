import { Cortana } from '../../../context';
import { matchMessage } from '../../libs/messages';

export async function kang(ctx: Cortana) {
  const emoji = ctx.params[0] ?? '👻';
  const { type, content } = matchMessage(ctx.msg.reply_to_message);
  if (type !== 'photo' || 'sticker') {
    return console.log('No es una foto');
  }
}
