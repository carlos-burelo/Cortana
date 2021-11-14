import { Bot } from 'grammy';
import { BOT_TOKEN } from './config';
import { modules } from './bot';
import app from './app';
import { Cortana, errorHandler } from './context';

/**
 * Start the bot
 * @return {Promise<void>}
 */
// console.clear();
export async function start(): Promise<void> {
  // initialize bot with new instance of Bot class and token
  const bot = new Bot(BOT_TOKEN, {
    ContextConstructor: Cortana,
  });
  // register modules and load them into bot
  modules(bot);
  // load middleware for login
  bot.use(async (ctx, next) => {
    const isAllow = await ctx.login(ctx.chat.id);
    if (isAllow) return next();
    else return ctx.signIn();
  });
  // load middleware for error handling
  errorHandler(bot);
  //start server for static files
  app.listen(3000);
  // start bot

  bot.start();
  console.log('Bot is runing');
}
start();
