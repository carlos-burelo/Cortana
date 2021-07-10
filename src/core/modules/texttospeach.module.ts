import { getTTS } from "../controllers/texttospeach.controller";
import { Telegraf } from "telegraf";
import { generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/tts", async (ctx) => {
		try {
			if (!ctx.message.reply_to_message) {
				let lang: string = ctx.message.text.split(" ")[1];
				let message: string = ctx.message.text.replace(
					"/tts " + lang,
					"",
				);
				if (message.length >= 200) {
					ctx.reply("El mensaje supera los 200 caracteres");
					return;
				}
				let speach = await getTTS(ctx, message, lang);
				ctx.replyWithVoice(
					{ url: speach },
					{
						allow_sending_without_reply: true,
					},
				);
				return;
			} else {
				let { text }: any = ctx.message.reply_to_message;
				let lang = text.split(" ")[1];
				let message: string = ctx.message.text;
				if (message.length >= 200) {
					ctx.reply("El mensaje supera los 200 caracteres");
					return;
				}
				let speach = await getTTS(ctx, message, lang);
				ctx.replyWithVoice(
					{ url: speach },
					{
						allow_sending_without_reply: true,
						duration: 1000,
					},
				);
				return;
			}
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/tts", __filename);
		}
	});
}
