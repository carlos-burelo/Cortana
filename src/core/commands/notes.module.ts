import { Telegraf } from 'telegraf';
import { addOrUpdateNote, deleteNote, getNote, getNotes } from '../controllers/notes.controller';
import { MsgI } from '../types';
import { matchMessage, log } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command('notes', async (ctx) => {
    try {
      await getNotes(ctx);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/notes', l });
    }
  });
  bot.hears(/^#[^\s]+/, async (ctx) => {
    try {
      let MsgId: string = ctx.message.text.replace(/#/, '');
      let arg: string = MsgId.split(' ')[1];
      if (arg && arg == '--rm') {
        MsgId = MsgId.split(' ')[0];
        return await deleteNote(ctx, MsgId);
      }
      await getNote(ctx, MsgId);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/#note/', l });
    }
  });
  bot.command(['/add', '/save'], async (ctx) => {
    try {
      if (ctx.message.reply_to_message) {
        let id: string = ctx.message.text
          .replace(/\/add|\/save/, '')
          .trim()
          .split(' ')[0];
        if (id.length < 1) {
          ctx.reply('Ingrese un nombre para la nota');
          return;
        }
        let reply: any = ctx.message.reply_to_message;
        let note: MsgI = matchMessage(reply, id);
        await addOrUpdateNote(ctx, note);
        console.log('fgdgdf');
      } else {
        let id: string = ctx.message.text
          .replace(/\/add|\/save/, '')
          .trim()
          .split(' ')[0];
        if (id.length < 1) {
          ctx.reply('Ingrese un nombre para la nota');
          return;
        }
        let text = ctx.message.text
          .replace(/\/add|\/save/, '')
          .trim()
          .replace(id, '')
          .trim();
        if (text.length < 1) {
          ctx.reply('Ingrese el contenido para la nota');
          return;
        }
        let note: MsgI = { id, text };
        console.log(note, id);
        await addOrUpdateNote(ctx, note);
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/add|/save', l });
    }
  });
}
