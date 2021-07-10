import "dotenv/config";
import { Telegraf } from "telegraf";
import { checkDirs } from "./config";
import modules from "./modules";
const bot = new Telegraf(process.env.TOKEN);
async function init() {
	modules(bot);
	checkDirs();
	if (process.env.NODE_ENV === 'prod') {
		await bot.launch({
			webhook: {
				domain: process.env.URL,
				port: parseInt(process.env.PORT || '3000')
			}
		})
	} else {
		await bot.launch()
	}
	console.clear();
	console.log("Bot started");
}
init();
