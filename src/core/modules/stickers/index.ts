import { Bot } from 'grammy';
import { Cortana } from '../../../context';

export default function stickersModule(bot: Bot<Cortana>) {
  bot.command('kang', async (ctx) => {
    const { kangCmd, kangHelp } = await import('./kang');
    if (ctx.help) return ctx.replyWithMarkdownV2(kangHelp);
    return await kangCmd(ctx);
  });
} // stickers module
