import { Bot } from 'grammy';
import { Cortana } from '../../../context';
import { startCmd, startHelp } from './start';
import { joinCmd, joinHelp } from './join';
import { langCmd, langHelp } from './lang';
import { setlangCmd, setlangHelp } from './setlang';

export default function startModule(bot: Bot<Cortana>) {
  bot.command('start', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(startHelp);
    return await startCmd(ctx);
  });

  bot.command('join', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(joinHelp);
    return await joinCmd(ctx);
  });

  bot.command('lang', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(langHelp);
    return await langCmd(ctx);
  });

  bot.command('setlang', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(setlangHelp);
    return await setlangCmd(ctx);
  });
}
