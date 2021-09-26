import { Bot } from 'grammy';
import { Cortana } from '../../../context';
import { promoteCmd, promoteHelp } from './promote';

export default function adminModule(bot: Bot<Cortana>) {
  bot.command('promote', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(promoteHelp);
    return await promoteCmd(ctx);
  });
}
