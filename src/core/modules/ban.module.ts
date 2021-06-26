import { getLang } from "../../lang";
import { Telegraf } from "telegraf";
import { ChatMember } from "telegraf/typings/core/types/typegram";
import {
	decideBan,
	decideUnBan,
	setBanMessage,
} from "../controllers/ban.controller";
import { detectMsgFormat } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/ban", async (ctx) => {
		const _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			return ctx.reply(_.global.noPrivateChats);
		}
		if (!ctx.message.reply_to_message) {
			return ctx.reply(_.global.pleaseReplyMsg);
		}
		const A: ChatMember = await ctx.getChatMember(ctx.message.from.id);
		const B: ChatMember = await ctx.getChatMember(
			ctx.message.reply_to_message.from.id,
		);
		await decideBan(ctx, A, B);
	});
	bot.command("/unban", async (ctx) => {
		const _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			return ctx.reply(_.global.noPrivateChats);
		}
		if (!ctx.message.reply_to_message) {
			return ctx.reply(_.global.pleaseReplyMsg);
		}
		const A: ChatMember = await ctx.getChatMember(ctx.message.from.id);
		const B: ChatMember = await ctx.getChatMember(
			ctx.message.reply_to_message.from.id,
		);
		await decideUnBan(ctx, A, B);
	});
	bot.command("/setban", async (ctx) => {
		const _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			return ctx.reply(_.global.noPrivateChats);
		}
		if (!ctx.message.reply_to_message) {
			return ctx.reply(_.global.pleaseReplyMsg);
		}
		let msg = await detectMsgFormat(ctx.message.reply_to_message);
		await setBanMessage(ctx, msg);
	});
}
