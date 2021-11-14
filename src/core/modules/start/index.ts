import { Cortana } from '@context';
import { Bot } from 'grammy';
import { joinCmd } from './join';
import { langCmd } from './lang';
import { langsCmd } from './langs';
import { startCmd } from './start';

export default function startModule(bot: Bot<Cortana>) {
  bot.command('start', async (ctx) => startCmd(ctx));
  bot.command('join', async (ctx) => joinCmd(ctx));
  bot.callbackQuery(/lang_.+/, async (ctx) => langCmd(ctx));
  bot.command('langs', async (ctx) => langsCmd(ctx));
  bot.command('lang', async (ctx) => langCmd(ctx));
}
