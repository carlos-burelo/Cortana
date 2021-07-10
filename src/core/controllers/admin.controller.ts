import { readdirSync } from "fs";
import { resolve } from "path";
import { Context } from "telegraf";
import { ChatMember } from "telegraf/typings/core/types/typegram";
import { mainDir, _bot, _owner } from "../../config";
import { getLang } from "../../lang";
import { ChatUserI } from "../interfaces";
import { generateLog } from "../libs/messages";
import { isSudo } from "../libs/validators";

export async function decidePromote(
	ctx: Context,
	emit: ChatMember,
	recep: ChatMember,
) {
	try {
		const _ = getLang(ctx.chat);
		if (recep.status == "creator") {
			return ctx.reply(_.helpers.anyActionCreator("promote"));
		}
		if (emit.status == "creator" && recep.user.id == _bot.id) {
			return await promoteUser(ctx, emit.user, recep.user);
		}
		if (emit.user.id == _owner.id) {
			return await promoteUser(ctx, emit.user, recep.user);
		}
		if (emit.user.id == recep.user.id) {
			return ctx.reply(_.helpers.noYourAutoAction("promote"));
		}
		if (emit.status == "member" && recep.status == "administrator") {
			return ctx.reply(_.helpers.memberActionAdmin("promote"));
		}
		if (emit.status == "administrator" && recep.status == "administrator") {
			return ctx.reply(_.helpers.adminActionAdmin("promote"));
		}
		return await promoteUser(ctx, emit.user, recep.user);
	} catch (e) {
		const [, l, c] = e.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, e, [l, c], "decidePromote", __filename);
	}
}
export async function decideDemote(
	ctx: Context,
	emit: ChatMember,
	recep: ChatMember,
) {
	try {
		const _ = getLang(ctx.chat);
		if (recep.user.id == _bot.id) {
			return ctx.reply(_.helpers.noAutoAction("demote"));
		}
		if (recep.status == "creator") {
			return ctx.reply(_.helpers.anyActionCreator("demote"));
		}
		if (emit.user.id == _owner.id) {
			await demoteUser(ctx, emit.user, recep.user);
		}
		if (isSudo(recep.user.id)) {
			return ctx.reply(_.global.preventSudo(recep.user.first_name));
		}
		if (emit.user.id == emit.user.id) {
			return ctx.reply(_.helpers.noYourAutoAction("demote"));
		}
		if (emit.status == "member" && recep.status == "administrator") {
			return ctx.reply(_.helpers.memberActionAdmin("demote"));
		}
		if (emit.status == "administrator" && recep.status == "administrator") {
			return ctx.reply(_.helpers.adminActionAdmin("demote"));
		}
		await demoteUser(ctx, emit.user, recep.user);
	} catch (e) {
		const [, l, c] = e.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, e, [l, c], " decidePromote", __filename);
	}
}
export async function promoteUser(ctx: Context, A: ChatUserI, B: ChatUserI) {
	const _ = getLang(ctx.chat);
	try {
		await ctx.promoteChatMember(B.id, {
			can_change_info: true,
			can_delete_messages: true,
			can_invite_users: true,
			can_pin_messages: true,
			can_promote_members: true,
			can_restrict_members: true,
			can_manage_chat: true,
		});
		return ctx.reply(
			_.helpers.anyActionSucces("promoted", A.first_name, B.first_name),
		);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "promoteUser", __filename);
	}
}
export async function demoteUser(ctx: Context, A: ChatUserI, B: ChatUserI) {
	const _ = getLang(ctx.chat);
	try {
		await ctx.promoteChatMember(B.id, {
			can_change_info: false,
			can_post_messages: false,
			can_edit_messages: false,
			can_delete_messages: false,
			can_invite_users: false,
			can_restrict_members: false,
			can_pin_messages: false,
			can_promote_members: false,
			can_manage_chat: false,
		});
		return ctx.reply(
			_.helpers.anyActionSucces("demote", A.first_name, B.first_name),
		);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "demoteUser", __filename);
	}
}
export async function promoteMe(ctx: Context) {
	try {
		ctx.promoteChatMember(ctx.message.from.id, {
			can_change_info: true,
			can_delete_messages: true,
			can_invite_users: true,
			can_pin_messages: true,
			can_promote_members: true,
			can_restrict_members: true,
			can_manage_chat: true,
		});
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "promoteMe", __filename);
	}
}
// GET ADMIN LIST
export async function getAdminList(ctx: Context) {
	try {
		const _ = getLang(ctx.chat);
		let admins: ChatMember[] = await ctx.getChatAdministrators();
		let adminlist = `*${_.adminMoodule.adminList}*\n\n`;
		admins.map((admin, i) => {
			if (admin.status == "administrator") {
				let name = admin.user.first_name.replace(/[\]\[\(\)_*]/g, "^");
				!name ? (name = "Deleted account") : name;
				adminlist += `• [${name}](tg://user?id=${admin.user.id})\n`;
			}
		});
		ctx.replyWithMarkdown(adminlist);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "getAdminList", __filename);
	}
}
export async function pinMessage(
	ctx: Context,
	message_id: number,
	arg?: "-s" | string,
) {
	try {
		const _ = getLang(ctx.chat);
		ctx.pinChatMessage(message_id, {
			disable_notification: arg == "-s" ? true : false,
		});
		ctx.reply(_.adminMoodule.pinSuccess);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "pinMessage", __filename);
	}
}
export async function unPinMessage(ctx: Context, message_id?: number) {
	try {
		const _ = getLang(ctx.chat);
		if (!message_id) {
			await ctx.unpinAllChatMessages();
			return ctx.reply(_.adminMoodule.unPinAllSuccess);
		} else {
			await ctx.unpinChatMessage(message_id);
			return ctx.reply(_.adminMoodule.unPinSuccess);
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "unPinMessage", __filename);
	}
}
export async function getChatPerms(ctx: Context, p: any, title) {
	try {
		const { permissions: _ } = getLang(ctx.chat);
		let text = `${_.title(title)}\n\n`;
		text += `${_.can_send_messages(p["can_send_messages"])}\n`;
		text += `${_.can_send_media_messages(p["can_send_media_messages"])}\n`;
		text += `${_.can_send_polls(p["can_send_polls"])}\n`;
		text += `${_.can_send_other_messages(p["can_send_other_messages"])}\n`;
		text += `${_.can_add_web_page_previews(
			p["can_add_web_page_previews"],
		)}\n`;
		text += `${_.can_change_info(p["can_change_info"])}\n`;
		text += `${_.can_invite_users(p["can_invite_users"])}\n`;
		text += `${_.can_pin_messages(p["can_pin_messages"])}\n`;
		ctx.replyWithMarkdown(text);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "getChatPerms", __filename);
	}
}
export async function getUserPerms(ctx: Context, userId: number) {
	try {
		let p = await ctx.getChatMember(userId);
		const { permissions: _ } = getLang(ctx.chat);
		let text = `${_.title(p.user.first_name)}\n\n`;
		text += `${_.can_be_edited(p["can_send_messages"])}\n`;
		text += `${_.can_change_info(p["can_change_info"])}\n`;
		text += `${_.can_delete_messages(p["can_delete_messages"])}\n`;
		text += `${_.can_invite_users(p["can_invite_users"])}\n`;
		text += `${_.can_manage_chat(p["can_manage_chat"])}\n`;
		text += `${_.can_manage_voice_chats(p["can_manage_voice_chats"])}\n`;
		text += `${_.can_promote_members(p["can_promote_members"])}\n`;
		text += `${_.can_pin_messages(p["can_pin_messages"])}\n`;
		text += `${_.can_restrict_members(p["can_restrict_members"])}\n`;
		text += `${_.is_anonymous(p["is_anonymous"])}\n`;
		ctx.replyWithMarkdown(text);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "getUserPerms", __filename);
	}
}
export function getBackup(ctx:Context) {
try {
	let id = ctx.chat.id.toString()
	let dir:string[] =readdirSync(resolve(mainDir,'databases'))
	let file:string = dir.find(i => i.includes(id));
	if(file){
		let path:string = resolve(mainDir, 'databases', file);
		let text = `*Backup generated successfuly*\n`;
		return ctx.replyWithDocument(
			{
				source:path
			},
			{
				caption:text, 
				parse_mode:'Markdown',
				disable_content_type_detection:false,
				thumb:'https://icons555.com/images/icons-red/image_icon_data_backup_pic_512x512.png'
			})
	}
} catch (error) {
	const [, l, c] = error.stack.match(/(\d+):(\d+)/);
	generateLog(ctx, error, [l, c], "getBackup", __filename);
}
}