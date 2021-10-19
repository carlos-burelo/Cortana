import { Bot } from 'grammy';
import { Cortana } from '../../../context';
import { backhelpCmd } from './backhelp';
import { helpCmd } from './help';
import { helpmoduleCmd } from './helpmodule';

export default function helperModule(bot: Bot<Cortana>) {
  bot.command('help', async (ctx) => helpCmd(ctx));
  bot.callbackQuery(/help_./, async (ctx) => helpmoduleCmd(ctx));
  bot.callbackQuery('back_help', async (ctx) => backhelpCmd(ctx));
}
