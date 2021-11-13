import { Bot } from 'grammy';
import { Cortana } from '@context';
import { mdv2Cmd } from './mdv2';
import { mdv2helpCmd } from './mdv2help';
import { highlightCmd } from './highlight';
import { loliCmd } from './loli';
import { ccCmd } from './concurrency';

export default function extrasModule(bot: Bot<Cortana>) {
  bot.command('mdv2', async (ctx) => await mdv2Cmd(ctx));
  bot.command('mdv2help', async (ctx) => await mdv2helpCmd(ctx));
  bot.command('hl', async (ctx) => await highlightCmd(ctx));
  bot.command('loli', async (ctx) => await loliCmd(ctx));
  bot.command('cc', async (ctx) => await ccCmd(ctx));
}
