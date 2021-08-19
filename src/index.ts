import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { BOT_TOKEN, enviroment } from './config';
import { modules } from './bot';

async function init() {
  enviroment();
  const bot = new Telegraf(BOT_TOKEN);
  modules(bot);
  if (process.env.NODE_ENV === 'production') {
    console.clear();
    await bot.launch({
      webhook: {
        domain: process.env.URL,
        port: parseInt(process.env.PORT || '3000')
      }
    });
  } else {
    console.clear();
    await bot.launch();
  }
  console.clear();
  console.log(
    '[Bot is running]----------------------------------------------------------------------------------'
  );
}
init();
