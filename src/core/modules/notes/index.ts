import { Bot } from 'grammy';
import { Cortana } from '@context';
import { saveNoteCmd } from './save';
import { getNoteCmd } from './note';
import { notesCmd } from './notes';

export default function notesModule(bot: Bot<Cortana>) {
  bot.command(['save', 'add'], async (ctx) => await saveNoteCmd(ctx));
  bot.command('notes', async (ctx) => await notesCmd(ctx));
  bot.hears(/^#[^\s]+/, async (ctx) => await getNoteCmd(ctx));
}
