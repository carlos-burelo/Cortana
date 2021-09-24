import { Bot } from 'grammy';
import { Cortana } from '../../../context';

export default function extrasModule(bot: Bot<Cortana>) {
  bot.command('mdv2', async (ctx) => {
    const { mdv2Cmd, mdv2Help } = await import('./mdv2');
    if (ctx.help) return ctx.reply(mdv2Help, { parse_mode: 'MarkdownV2' });
    return await mdv2Cmd(ctx);
  });
} // extras module
