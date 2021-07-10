import { Telegraf } from "telegraf";
import { getLang } from "../../lang";
import { decideBio, delBio, getBio } from "../controllers/bios.controller";
import { BioI } from "../interfaces";
import { generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/bio", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			if (!ctx.message.reply_to_message) {
				return ctx.reply(_.global.pleaseReplyMsg);
			}
			let arg: string = ctx.message.text.split(" ")[1];
			if (arg && arg == "--rm") {
				let A = await ctx.getChatMember(ctx.message.from.id);
				let B = await ctx.getChatMember(
					ctx.message.reply_to_message.from.id,
				);
				await delBio(ctx, A, B);
			}
			await getBio(ctx, ctx.message.reply_to_message.from);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/bio", __filename);
		}
	});
	bot.command("/setbio", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			if (!ctx.message.reply_to_message) {
				return ctx.reply(_.global.pleaseReplyMsg);
			}
			let text = ctx.message.text.replace(/\/setbio/g, "").trim();
			if (text.length < 1) {
				return ctx.reply(_.bioModule.emptyBiography);
			}
			let Bio: BioI = {
				id: ctx.message.reply_to_message.from.id,
				bio: text,
				first_name: ctx.message.reply_to_message.from.first_name,
			};
			const A = await ctx.getChatMember(ctx.message.from.id);
			const B = await ctx.getChatMember(
				ctx.message.reply_to_message.from.id,
			);
			await decideBio(ctx, A, B, Bio);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/setbio", __filename);
		}
	});
}
