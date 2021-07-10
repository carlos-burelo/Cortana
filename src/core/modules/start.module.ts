import { Telegraf } from "telegraf";
import { db } from "../../database";
import { getLang, setLang } from "../../lang";
import { ButtonI } from "../interfaces";
import { createButtons } from "../libs/buttons";
import { generateLog, getTime } from "../libs/messages";
import { startButtons } from "../shared/buttons.component";

export default function (bot: Telegraf) {
	bot.start(async (ctx) => {
		try {
			let _ = getLang(ctx.chat);
			if (ctx.chat.type == "private") {
				db(ctx.message.from).value();
				ctx.reply(_.startModule.message, startButtons);
			} else {
				db(ctx.chat).value();
				ctx.reply(_.startModule.message, startButtons);
			}
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/clone", __filename);
		}
	});
	bot.command("/lang", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			let lang: "es" | "en" | string = ctx.message.text.split(" ")[1];
			if (lang == "en" || lang == "es") {
				setLang(ctx, lang);
			} else {
				return ctx.reply(_.global.codeLangError);
			}
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/lang", __filename);
		}
	});
	bot.action("set_lang", (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			let langs: ButtonI[] = [
				{ text: "Español 🇲🇽", callback: "lang:es" },
				{ text: "English 🇺🇸", callback: "lang:en" },
			];
			ctx.editMessageText(_.global.langMenu, {
				reply_markup: createButtons(langs, 1),
				parse_mode: "Markdown",
			});
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "set_lang", __filename);
		}
	});
	bot.action(/lang:.+/, (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			let { data }: any = ctx.callbackQuery;
			let lang = data.split(":")[1];
			setLang(ctx, lang);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "lang:", __filename);
		}
	});
	bot.command('/l', async (ctx) => {
		let date = getTime(ctx,ctx.message.text);
	});
}
