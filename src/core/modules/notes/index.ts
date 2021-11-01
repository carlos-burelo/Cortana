import { Bot } from 'grammy';
import { Cortana } from '@context';

export default function Module(bot: Bot<Cortana>) {
  bot.command(['save', 'add'], async (ctx) => {
    const { saveNoteCmd } = await import('./save');
    return await saveNoteCmd(ctx);
  });
}