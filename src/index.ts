import 'dotenv/config'
import { Telegraf } from "telegraf";
const bot = new Telegraf(process.env.TOKEN);
import all_modules from "./bot";
import { connect } from "./database";

async function init() {
    await connect()
    all_modules(bot);
    bot.launch();
    console.clear();
    console.log('Bot started')
}
init();