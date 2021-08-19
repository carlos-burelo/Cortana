import { Context } from 'telegraf';
import { db, lang } from '../../database';
import { MsgI } from '../types';
import { log, sendMessage } from '../libs/messages';

export async function getNote(ctx: Context, MsgId: string) {
  const _ = lang(ctx);
  try {
    let a = db(ctx.chat).get('notes').find({ id: MsgId }).value();
    if (a == undefined) {
      return ctx.reply(_.notesModule.noteNotFound);
    }
    return await sendMessage({ ctx, msg: a });
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getNote()', l });
  }
}
export async function getNotes(ctx: Context) {
  const _ = lang(ctx);
  try {
    const notes = db(ctx.chat).get('notes').value();
    if (notes.length == 0) {
      return ctx.reply(_.notesModule.notesNotFound);
    } else {
      const chat = await ctx.getChat();
      let title: string = '';
      if (chat.type == 'private') {
        title = _.notesModule.personalNotes;
      } else {
        title = _.notesModule.publicNotes(chat.title);
      }
      let notas: string = '';
      notas += `${title}\n\n`;
      notes.map((note, i) => {
        let indice1 = i + 1;
        let indice = indice1 <= 9 ? `0${indice1}` : `${indice1}`;
        notas += `*${indice} - *\`#${note.id}\`\n`;
      });
      notas += _.notesModule.noteSuggest;
      return ctx.reply(notas, { parse_mode: 'Markdown' });
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getNotes()', l });
  }
}
export async function addOrUpdateNote(ctx: Context, note: MsgI) {
  const _ = lang(ctx);
  try {
    if (db(ctx.chat).get('notes').find({ id: note.id }).value() !== undefined) {
      await db(ctx.chat).get('notes').remove({ id: note.id }).write();
      db(ctx.chat).get('notes').push(note).write();
      return ctx.replyWithMarkdown(_.notesModule.updateNote(note.id));
    } else {
      db(ctx.chat).get('notes').push(note).write();
      return ctx.replyWithMarkdown(_.notesModule.noteAdded(note.id));
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'addOrUpdateNote()', l });
  }
}
export async function deleteNote(ctx: Context, MsgId: string) {
  try {
    const _ = lang(ctx);
    let a: MsgI = db(ctx.chat).get('notes').find({ id: MsgId }).value();
    if (!a == undefined) {
      return ctx.reply(_.notesModule.noteNotFound);
    } else {
      await db(ctx.chat).get('notes').remove({ id: MsgId }).write();
      return ctx.replyWithMarkdown(_.notesModule.deleteNote(MsgId));
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'deleteNote()', l });
  }
}
