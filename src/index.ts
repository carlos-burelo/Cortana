import { Bot } from 'grammy';
import { BOT_TOKEN } from './config';
import { modules } from './bot';
import app from './app';
import { Cortana, errorHandler } from './context';

/**
 * Start the bot
 * @return {Promise<void>}
 */
export async function start(): Promise<void> {
  const bot = new Bot(BOT_TOKEN, {
    ContextConstructor: Cortana,
  });
  bot.use(async (ctx, next) => {
    const isAllow = await ctx.login(ctx.chat.id);
    if (isAllow) return next();
    else return ctx.signIn();
  });
  modules(bot);
  errorHandler(bot);
  app.listen(4000);
  console.clear();
  bot.start();
}
start();
