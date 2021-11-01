import { Bot } from 'grammy';
import { Cortana } from '@context';
import { sendCmd } from './send';

export default function ownerModule(bot: Bot<Cortana>) {
  bot.command('send', async (ctx) => await sendCmd(ctx));
}
