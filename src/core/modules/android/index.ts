import { Bot } from 'grammy';
import { Cortana } from '../../../context';
import { fwCmd, fwHelp } from './fw';
import { twrpCmd, twrpHelp } from './twrp';
import { magiskCmd, magiskHelp } from './magisk';

export default function androidModule(bot: Bot<Cortana>) {
  bot.command('fw', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(fwHelp);
    return await fwCmd(ctx);
  });
  bot.command('twrp', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(twrpHelp);
    return await twrpCmd(ctx);
  });

	bot.command('magisk', async (ctx) => {
		if (ctx.help) return ctx.replyWithMarkdownV2(magiskHelp);
		return await magiskCmd(ctx);
	});

}