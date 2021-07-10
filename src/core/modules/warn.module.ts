import { Telegraf } from "telegraf";
import { getLang } from "../../lang";
import {
	getWarnInfo,
	removeWarn,
	setWarn,
} from "../controllers/warn.controller";
import { generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/warn", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			if (!ctx.message.reply_to_message) {
				return ctx.reply(_.global.pleaseReplyMsg);
			}
			let arg: string = ctx.message.text.split(" ")[1];
			const A = await ctx.getChatMember(ctx.message.from.id);
			const B = await ctx.getChatMember(
				ctx.message.reply_to_message.from.id,
			);
			if (arg == "--info") {
				return getWarnInfo(ctx, ctx.message.reply_to_message.from);
			}
			if (arg == "--rm") {
				return removeWarn(ctx, A, B);
			}
			let reason: string = ctx.message.text.replace(/\/warn/, "").trim();
			if (!reason || reason.length == 0) {
				return ctx.reply(_.warnModule.reason);
			}
			setWarn(ctx, A, B, reason);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/clone", __filename);
		}
	});
}
