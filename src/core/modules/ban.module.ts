import { getLang } from "../../lang";
import { Telegraf } from "telegraf";
import { ChatMember } from "telegraf/typings/core/types/typegram";
import {
	decideBan,
	decideUnBan,
	setBanMessage,
} from "../controllers/ban.controller";
import { detectMsgFormat, generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/ban", async (ctx) => {
		try {
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
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/ban", __filename);
		}
	});
	bot.command("/unban", async (ctx) => {
		try {
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
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/unban", __filename);
		}
	});
	bot.command("/setban", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			if (!ctx.message.reply_to_message) {
				return ctx.reply(_.global.pleaseReplyMsg);
			}
			let msg = detectMsgFormat(ctx.message.reply_to_message);
			await setBanMessage(ctx, msg);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/setban", __filename);
		}
	});
}
