import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { enviromentConfig } from './app';
import { modules } from './bot';
const bot = new Telegraf(process.env.TOKEN);

async function init() {
  enviromentConfig();
  modules(bot);
  if (process.env.NODE_ENV === 'production') {
    await bot.launch({
      webhook: {
        domain: process.env.URL,
        port: parseInt(process.env.PORT || '3000')
      }
    });
  } else {
    await bot.launch();
  }
  console.clear();
  console.log(
    '[Bot is running]----------------------------------------------------------------------------------'
  );
}
init();
