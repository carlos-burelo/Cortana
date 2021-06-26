import { Chat } from "telegraf/typings/core/types/typegram";
import { DatabaseI, LangI } from "./core/interfaces";
import { en, es } from "./core/lang";
import { db } from "./database";

export function setLang(chat: DatabaseI, lang: LangI) {}
export function getLang(chat: DatabaseI | Chat) {
	let lang: LangI | any = db(chat).get("lang").value();
	// if (lang == "es") {
	return es;
	// } else {
	//   return en;
	// }
}
