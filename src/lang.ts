import { Context } from "telegraf";
import { Chat } from "telegraf/typings/core/types/typegram";
import { DatabaseI, LangI } from "./core/interfaces";
import { en, es } from "./core/lang";
import { db } from "./database";

export function setLang(ctx: Context, lang: LangI) {
	try {
		const _ = getLang(ctx.chat);
		let current = db(ctx.chat).get("lang").value();
		if (lang == current) {
			return ctx.reply(_.global.sameLanguage(lang));
		}
		db(ctx.chat).assign({ lang: lang }).write();
		return ctx.reply(_.global.setLanguageSucces(lang));
	} catch (error) {}
}
export function getLang(chat: DatabaseI | Chat) {
	let lang: LangI | any = db(chat).get("lang").value();
	if (lang == "es") {
		return es;
	} else {
		return en;
	}
}
