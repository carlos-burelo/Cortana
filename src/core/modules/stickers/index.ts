import { Bot } from 'grammy';
import { Cortana } from '../../../context';

export default function stickersModule(bot: Bot<Cortana>) {
  bot.command('kang', async (ctx) => {
    const { kangCmd } = await import('./kang');
    return await kangCmd(ctx);
  });
}
