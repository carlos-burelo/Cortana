import { Bot } from 'grammy';
import { Cortana } from '../../../context';

export default function startModule(bot: Bot<Cortana>) {
  bot.command('start', async (ctx) => {
    const { startCmd } = await import('./start');
    return await startCmd(ctx);
  });
  bot.command('join', async (ctx) => {
    const { joinCmd } = await import('./join');
    return await joinCmd(ctx);
  });
  bot.command('lang', async (ctx) => {
    const { langCmd } = await import('./lang');
    return await langCmd(ctx);
  });
  bot.command('setlang', async (ctx) => {
    const { setlangCmd } = await import('./setlang');
    return await setlangCmd(ctx);
  });
}
