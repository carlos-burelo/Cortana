import "dotenv/config";
import { Telegraf } from "telegraf";
import modules from "./bot";
import { connect } from "./database";
const bot = new Telegraf(process.env.TOKEN);

async function init() {
  await connect();
  modules(bot);

  bot.launch().then(() => {
    console.clear();
    console.log("Bot started");
  });
}

init();
