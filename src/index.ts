import { Bot } from 'grammy';
import { BOT_TOKEN } from '@config';
import { modules } from '@bot';
import { Cortana } from '@context';

/**
 * Start the bot
 * @return {Promise<void>}
 */
export async function start(): Promise<void> {
  const bot = new Bot(BOT_TOKEN, {
    ContextConstructor: Cortana,
  });
  modules(bot);
  bot.use(async (ctx, next) => {
    const isAllow = await ctx.login(ctx.chat.id);
    if (isAllow) return next();
    else return ctx.signIn();
  });
  bot.start();
  console.clear();
  console.log('Bot is runing');
}
start();
