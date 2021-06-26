import { getLang } from "../../lang";
import { Telegraf } from "telegraf";
import { ChatMember } from "typegram";
import { _owner } from "../../config";
import {
	decideDemote,
	decidePromote,
	getAdminList,
	getChatPerms,
	getUserPerms,
	pinMessage,
	promoteMe,
	unPinMessage,
} from "../controllers/admin.controller";

export default function (bot: Telegraf) {
	bot.command("/promote", async (ctx) => {
		const _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			return ctx.reply(_.global.noPrivateChats);
		}
		if (!ctx.message.reply_to_message) {
			return ctx.reply(_.global.pleaseReplyMsg);
		}
		let emisor: ChatMember = await ctx.getChatMember(ctx.message.from.id);
		let receptor: ChatMember = await ctx.getChatMember(
			ctx.message.reply_to_message.from.id,
		);
		await decidePromote(ctx, emisor, receptor);
	});
	bot.command("/demote", async (ctx) => {
		const _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			return ctx.reply(_.global.noPrivateChats);
		}
		if (!ctx.message.reply_to_message) {
			return ctx.reply(_.global.pleaseReplyMsg);
		}
		let emisor: ChatMember = await ctx.getChatMember(ctx.message.from.id);
		let receptor: ChatMember = await ctx.getChatMember(
			ctx.message.reply_to_message.from.id,
		);
		await decideDemote(ctx, emisor, receptor);
	});
	bot.command("/promoteme", async (ctx) => {
		const _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			return ctx.reply(_.global.noPrivateChats);
		}
		if (ctx.message.from.id !== _owner.id) {
			return ctx.reply(_.global.onlyOwner);
		}
		await promoteMe(ctx);
	});
	bot.command("/admins", async (ctx) => {
		await getAdminList(ctx);
	});
	bot.command("/pin", async (ctx) => {
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
	});
	bot.command("/unpin", async (ctx) => {
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
	});
	bot.command("/link", async (ctx) => {
		const _ = getLang(ctx.chat);
		if (ctx.chat.type == "private") {
			return ctx.reply(_.global.noPrivateChats);
		}
		let { invite_link, title }: any = await ctx.getChat();
		ctx.replyWithMarkdown(`[${title}](${invite_link})\n`, {
			disable_web_page_preview: false,
			allow_sending_without_reply: true,
		});
	});
	bot.command("/perms", async (ctx) => {
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
	});
	bot.command("/setperms", async (ctx) => {
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
	});
}
