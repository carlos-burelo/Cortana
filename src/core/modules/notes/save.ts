import { Cortana } from '@context';
import { log, matchMessage } from '@libs/messages';
import { NoteI } from '@interfaces/sql';
import { getNote, insertNote, updateNote } from '@sql/notes.sql';

export async function saveNoteCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    if (ctx.chat.type == 'private') return ctx.reply(_.global.noPrivateChat);
    if (!ctx.msg.reply_to_message) return ctx.reply(_.global.replyMissing);
    const { reply_to_message } = ctx.message;
    const match = matchMessage(reply_to_message);
    if (!match) return ctx.reply('Error');
    const [key]: string[] = ctx.params;
    if (!key) return ctx.reply(_.notes.keyMissing);
    const note: NoteI = {
      chatId: ctx.chat.id,
      key: key.toLowerCase().trim(),
      type: match.type,
      content: match.content,
      ...match,
    };
    const noteExist = await getNote(note.key, note.chatId);
    noteExist
      ? (await updateNote(note), ctx.replyWithMarkdown(_.notes.updatedNote(key)))
      : (await insertNote(note), ctx.replyWithMarkdown(_.notes.noteCreated(key)));
  } catch (error) {
    console.log(error.message);
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'saveNoteCmd()' });
  }
}
