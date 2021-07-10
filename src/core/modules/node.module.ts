import { Telegraf } from "telegraf";
import os from "os";
import { generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/os", async (ctx) => {
		try {
			ctx.replyWithHTML(
				`<b>Platform:</b>  <i>${os.platform()}</i>\n` +
					`<b>Type:</b>  <i>${os.type()}</i>\n` +
					`<b>Arch:</b>  <i>${os.arch()}</i>\n` +
					`<b>Release:</b>  <i>${os.release()}</i>\n` +
					`<b>Total Memory</b>  <i>${Math.round(
						os.totalmem() / 1024 / 1024 / 1024,
					).toString()} GB</i>\n` +
					`<b>Username:</b>  <i>${os.userInfo().username}</i>\n`,
			);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/os", __filename);
		}
	});
}
