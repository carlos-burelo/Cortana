import { Bot } from 'grammy';
import { Cortana } from '@context';
import { bashCmd } from './bash';

export default function nodeModule(bot: Bot<Cortana>) {
  bot.command('bash', async (ctx) => await bashCmd(ctx));
}
