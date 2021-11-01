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
    const noteName = `\`#${key}\``;
    noteExist
      ? (await updateNote(note), ctx.reply(_.notes.updatedNote(noteName)))
      : (await insertNote(note), ctx.reply(_.notes.noteCreated(noteName)));
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'saveNoteCmd()' });
  }
}
