import { Telegraf } from "telegraf";
import { getLang } from "../../lang";
import { translateText } from "../controllers/translator.controller";
import { generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/tr", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			let text: string;
			let lang: string;
			if (!ctx.message.reply_to_message) {
				text = ctx.message.text.replace(/\/tr|\/tl/, "").trim();
				if (text.length >= 200) {
					return ctx.reply(_.trasnlatorModule.limit);
				}
				lang = text.split("")[0];
				if (lang.length > 2) {
					return ctx.reply(_.global.codeLangError);
				}
				text = text.replace(lang, "").trim();
			} else {
				lang = ctx.message.text.replace(/\/tr|\/tl/, "").trim();
				if (lang.length > 2) {
					return ctx.reply(_.global.codeLangError);
				}
				let { text: text2 }: any = ctx.update.message.reply_to_message;
				if (text2 >= 200) {
					return ctx.reply(_.trasnlatorModule.limit);
				}
				text = text2;
			}
			await translateText(ctx, lang, text);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/tr", __filename);
		}
	});
}
