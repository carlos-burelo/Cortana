import { Bot } from 'grammy';
import { Cortana } from '@context';
import { bioCmd } from './bio';

export default function biosModule(bot: Bot<Cortana>) {
  bot.command('bio', async (ctx) => await bioCmd(ctx));
}
