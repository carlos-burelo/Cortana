import { Bot } from 'grammy';
import { Cortana } from '../../../context';
import { joinCmd } from './join';
import { langCmd } from './lang';
import { setlangCmd } from './setlang';
import { startCmd } from './start';

export default function startModule(bot: Bot<Cortana>) {
  bot.command('start', async (ctx) => startCmd(ctx));
  bot.command('join', async (ctx) => joinCmd(ctx));
  bot.command('lang', async (ctx) => langCmd(ctx));
  bot.command('setlang', async (ctx) => setlangCmd(ctx));
}
