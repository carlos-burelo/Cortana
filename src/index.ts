import { Bot } from 'grammy';
import { modules } from './bot';
import { BOT_TOKEN, app } from './config';
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
  console.log('Bot alive')
  bot.start();
}
start();
