import "dotenv/config";
import { Telegraf } from "telegraf";
import modules from "./modules";
const bot = new Telegraf(process.env.TOKEN);

async function init() {
	modules(bot);
	bot.launch().then(() => {
		console.clear();
		console.log("Bot started");
	});
}
init();
