import { getLang } from "../../lang";
import { Telegraf } from "telegraf";
import { ChatMember } from "typegram";
import { _owner } from "../../config";
import {
	decideDemote,
	decidePromote,
	getAdminList,
	getBackup,
	getChatPerms,
	getUserPerms,
	pinMessage,
	promoteMe,
	unPinMessage,
} from "../controllers/admin.controller";
import { generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/promote", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			if (!ctx.message.reply_to_message) {
				return ctx.reply(_.global.pleaseReplyMsg);
			}
			let emisor: ChatMember = await ctx.getChatMember(
				ctx.message.from.id,
			);
			let receptor: ChatMember = await ctx.getChatMember(
				ctx.message.reply_to_message.from.id,
			);
			await decidePromote(ctx, emisor, receptor);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/promote", __filename);
		}
	});
	bot.command("/demote", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			if (!ctx.message.reply_to_message) {
				return ctx.reply(_.global.pleaseReplyMsg);
			}
			let emisor: ChatMember = await ctx.getChatMember(
				ctx.message.from.id,
			);
			let receptor: ChatMember = await ctx.getChatMember(
				ctx.message.reply_to_message.from.id,
			);
			await decideDemote(ctx, emisor, receptor);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/demote", __filename);
		}
	});
	bot.command("/promoteme", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			if (ctx.message.from.id !== _owner.id) {
				return ctx.reply(_.global.onlyOwner);
			}
			await promoteMe(ctx);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/promoteme", __filename);
		}
	});
	bot.command(["/admins", "/adminlist"], async (ctx) => {
		try {
			await getAdminList(ctx);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/admins | /adminlist", __filename);
		}
	});
	bot.command("/pin", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			let msgId: number;
			let arg: "-s" | string;
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			if (!ctx.message.reply_to_message) {
				msgId = ctx.message.message_id;
			}
			msgId = ctx.message.reply_to_message.message_id;
			if (ctx.message.text.split(" ")[1] == "-s") {
				arg = ctx.message.text.split(" ")[1];
			}
			pinMessage(ctx, msgId, arg);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/pin", __filename);
		}
	});
	bot.command("/unpin", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			let msgId: number;
			let arg: "--all" | string;
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			if (!ctx.message.reply_to_message && arg !== "--all") {
				return ctx.reply(_.adminMoodule.unPinSuggestion);
			}
			msgId = ctx.message.reply_to_message.message_id;
			await unPinMessage(ctx, msgId);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/unpin", __filename);
		}
	});
	bot.command("/link", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			let { invite_link, title }: any = await ctx.getChat();
			ctx.replyWithMarkdown(`[${title}](${invite_link})\n`, {
				disable_web_page_preview: false,
				allow_sending_without_reply: true,
			});
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/link", __filename);
		}
	});
	bot.command("/perms", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			if (ctx.chat.type == "private") {
				return ctx.reply(_.global.noPrivateChats);
			}
			if (!ctx.message.reply_to_message) {
				let { permissions: p, title }: any = await ctx.getChat();
				await getChatPerms(ctx, p, title);
			} else {
				let id = ctx.message.reply_to_message.from.id;
				await getUserPerms(ctx, id);
			}
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/perms", __filename);
		}
	});
	bot.command("/setperms", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			try {
				ctx.setChatPermissions({
					can_add_web_page_previews: true,
					can_change_info: true,
					can_invite_users: true,
					can_pin_messages: true,
					can_send_media_messages: true,
					can_send_messages: true,
					can_send_other_messages: true,
					can_send_polls: true,
				});
				return ctx.reply(_.permissions.setPermsSuccess);
			} catch (error) {
				return ctx.reply(_.permissions.setPermsError);
			}
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "setSudo", __filename);
		}
	});
	bot.command('/backup', async (ctx) => {
		try {
			getBackup(ctx)
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/backup", __filename);
		}	
	});

}
