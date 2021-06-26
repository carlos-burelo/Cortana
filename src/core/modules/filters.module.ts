import { Telegraf } from "telegraf";
import { FilterI } from "../interfaces";
import { db } from "../../database";
import { getLang } from "../../lang";
import {
	getFilter,
	getFilters,
	setFilter,
	stopFilter,
} from "../controllers/fiters.controller";
import { detectMsgFormat, sendMsg } from "../libs/messages";

export default async function (bot: Telegraf) {
	bot.command("/filter", async (ctx) => {
		const _ = getLang(ctx.chat);
		let word: string[] | string = ctx.message.text.match(/![^\s]+/gi);
		if (!word) {
			ctx.reply(_.filterModule.noFilterKey);
			return;
		}
		word = word[0].replace(/!/g, "");
		if (!ctx.message.reply_to_message) {
			let text: string = ctx.message.text;
			let regex: RegExp = /(\".*?")/gi;
			let match: string[];
			let filters: string[] = [];
			while ((match = regex.exec(text)) !== null) {
				filters.push(match[1].replace(/"/g, ""));
			}
			if (filters.length == 0) {
				ctx.reply(_.filterModule.setRespFilter);
				return;
			}
			let newFilter: FilterI = {
				id: word,
				type: "text",
				strings: filters,
			};
			await setFilter(ctx, newFilter);
		} else {
			let { content, type } = await detectMsgFormat(
				ctx.message.reply_to_message,
			);
			let newFilter: FilterI = {
				id: word,
				type,
				content,
			};
			await setFilter(ctx, newFilter);
		}
	});
	bot.command("/filterinfo", async (ctx) => {
		const _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			return ctx.reply(_.global.noPrivateChats);
		}
		let filter: string = ctx.message.text
			.replace(/\/filterinfo/, "")
			.trim();
		await getFilter(ctx, filter);
	});
	bot.command("/filters", async (ctx) => {
		const _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			return ctx.reply(_.global.noPrivateChats);
		}
		await getFilters(ctx);
	});
	bot.hears(/^[\w]+/gi, async (ctx) => {
		if (ctx.chat.type !== "private") {
			let text: string = ctx.message.text;
			let filters = db(ctx.chat).get("filters").value();
			if (filters !== undefined) {
				filters.forEach(async (a) => {
					if (text.toLowerCase().includes(a.id.toLowerCase())) {
						if (a.strings) {
							ctx.reply(
								a.strings[
									Math.floor(Math.random() * a.strings.length)
								],
							);
						} else {
							await sendMsg(ctx, a);
						}
					}
				});
			}
		}
	});
	bot.command("/stop", async (ctx) => {
		const _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			return ctx.reply(_.global.noPrivateChats);
		}
		let filter: string = ctx.message.text.split(" ")[1];
		stopFilter(ctx, filter);
	});
}
