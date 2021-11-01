import { getNote } from '@sql/notes.sql';
import { Cortana } from '@context';
import { log, sendMessage } from '@libs/messages';

export async function getNoteCmd(ctx: Cortana) {
  const key: string = ctx.msg.text.replace(/#/, '');
  const note = await getNote(key, ctx.chat.id);
  if (!note) return;
  await sendMessage({ ctx, msg: note });
  try {
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'getNoteCmd()' });
  }
}
