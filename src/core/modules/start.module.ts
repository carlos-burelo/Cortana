import { Telegraf } from "telegraf";
import { db } from "../../database";
import { getLang } from "../../lang";
import { createButtons, extractButtons } from "../libs/buttons";
import { startButtons } from "../shared/buttons.component";

export default function (bot: Telegraf) {
	bot.start(async (ctx) => {
		let _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			db(ctx.message.from).value();
			ctx.reply(_.startModule.message, startButtons);
		} else {
			db(ctx.chat).value();
			ctx.reply(_.startModule.message, startButtons);
		}
	});
	bot.command("/lang", async (ctx) => {
		const _ = getLang(ctx.chat);
		let lang: "es" | "en" | string = ctx.message.text.split(" ")[1];
		if (lang == "en" || lang == "es") {
			let current: string = `${
				lang == "es" ? "Español 🇲🇽" : lang == "en" ? "English 🇺🇸" : "en"
			}`;
			db(ctx.chat).assign({ lang: lang }).write();
			return ctx.reply(_.global.setLanguageSucces(current));
		} else {
			return ctx.reply(_.global.codeLangError);
		}
	});
	bot.command("/r", async (ctx) => {
		const { text, buttons } = extractButtons(
			ctx.message.text.replace("/r", "").trim(),
		);
		ctx.replyWithMarkdown(text, {
			reply_markup: createButtons(buttons, 2),
		});
	});
}
