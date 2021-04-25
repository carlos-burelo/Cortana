import 'dotenv/config'
import { Telegraf } from "telegraf";
const bot = new Telegraf(process.env.TOKEN);
import allmodules from "./bot";


allmodules(bot);
bot.launch();
console.log('-------------------------- Bot Works')
