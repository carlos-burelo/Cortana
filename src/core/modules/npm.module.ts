import { Telegraf } from "telegraf";
import { getModule, searchModule } from "../controllers/npm.controller";
import { generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/npm", async (ctx) => {
		try {
			if (ctx.message.text.includes("?")) {
				let query: string = ctx.message.text
					.replace("/npm?", "")
					.trim();
				return await searchModule(ctx, query);
			} else {
				let query = ctx.message.text.replace("/npm", "").trim();
				return await getModule(ctx, query);
			}
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/npm", __filename);
		}
	});
}
