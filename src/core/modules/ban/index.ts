import { Bot } from 'grammy';
import { Cortana } from '@context';
import { banCmd } from './ban';

export default function banModule(bot: Bot<Cortana>) {
  bot.command('ban', async (ctx) => await banCmd(ctx));
}
