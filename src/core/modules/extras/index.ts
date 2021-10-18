import { Bot } from 'grammy';
import { Cortana } from '../../../context';

export default function extrasModule(bot: Bot<Cortana>) {
  bot.command('mdv2', async (ctx) => {
    const { mdv2Cmd } = await import('./mdv2');
    return await mdv2Cmd(ctx);
  });
  bot.command('mdv2help', async (ctx) => {
    const { md2helpCmd } = await import('./mdv2help');
    return await md2helpCmd(ctx);
  });
}
