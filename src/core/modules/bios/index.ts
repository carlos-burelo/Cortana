import { Bot } from 'grammy';
import { Cortana } from '@context';
import { bioCmd } from './bio';
import { setbioCmd } from './setbio';
import { rmbioCmd } from './rmbio';

export default function biosModule(bot: Bot<Cortana>) {
  bot.command('bio', async (ctx) => await bioCmd(ctx));
  bot.command('setbio', async (ctx) => await setbioCmd(ctx));
  bot.command('rmbio', async (ctx) => await rmbioCmd(ctx));
}
