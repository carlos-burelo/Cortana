import { Bot } from 'grammy';
import { BOT_TOKEN } from './config';
import { modules } from './bot';
import { Cortana } from './context';

/**
 * Start the bot
 * @return {Promise<void>}
 */
export async function start(): Promise<void> {
  const bot = new Bot(BOT_TOKEN, {
    ContextConstructor: Cortana
  });
  modules(bot);
  bot.start();
}
start();
