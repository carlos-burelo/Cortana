import { Bot } from 'grammy';
import { Cortana } from '../../../context';
import { helpCmd, helpHelp } from './help';
import { helpmoduleCmd, helpmoduleHelp } from './helpmodule';
import { backhelpCmd, backhelpHelp } from './backhelp';

export default function helperModule(bot: Bot<Cortana>) {
  bot.command('help', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(helpHelp);
    return await helpCmd(ctx);
  });
  bot.callbackQuery(/help_./, async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(helpmoduleHelp);
    return await helpmoduleCmd(ctx);
  });
  bot.callbackQuery('back_help', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(backhelpHelp);
    return await backhelpCmd(ctx);
  });
}
