import { Bot } from 'grammy';
import { Cortana } from '../../../context';

export default function androidModule(bot: Bot<Cortana>) {
  bot.command('fw', async (ctx) => {
    const { fwCmd } = await import('./fw');
    return await fwCmd(ctx);
  });
  bot.command('twrp', async (ctx) => {
    const { twrpCmd } = await import('./twrp');
    return await twrpCmd(ctx);
  });
  bot.command('magisk', async (ctx) => {
    const { magiskCmd } = await import('./magisk');
    return await magiskCmd(ctx);
  });
}
