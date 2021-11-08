import { getNotes } from '@sql/notes.sql';
import { Cortana } from '@context';
import { log } from '@libs/messages';
import { NoteI } from '@models/sql';

export async function notesCmd(ctx: Cortana) {
  try {
    const { notes: _, global } = await ctx.lang();
    if (ctx.chat.type === 'private') return ctx.reply(global.noPrivateChat);
    const notes: NoteI[] = await getNotes(ctx.chat.id);
    if (notes.length == 0 || !notes) return ctx.reply(_.notesNotFound);
    const notesString: string = notes
      .map((note: NoteI, id: number) => `${id + 1}.  \`#${note.key}\``)
      .join('\n');
    const { title }: any = await ctx.getChat();
    const template = `${_.notesTitle(`*${title}*`)}\n\n${notesString}`;
    ctx.replyWithMarkdown(template);
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'notesCmd()' });
  }
}
