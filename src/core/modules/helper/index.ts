import { Bot } from 'grammy';
import { Cortana } from '../../../context';

export default function helperModule(bot: Bot<Cortana>) {
  bot.command('help', async (ctx) => {
    const { helpCmd } = await import('./help');
    return await helpCmd(ctx);
  });
  bot.callbackQuery(/help_./, async (ctx) => {
    const { helpmoduleCmd } = await import('./helpmodule');
    return await helpmoduleCmd(ctx);
  });
  bot.callbackQuery('back_help', async (ctx) => {
    const { backhelpCmd } = await import('./backhelp');
    return await backhelpCmd(ctx);
  });
}
