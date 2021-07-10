import { _bot, _owner } from "../../config";
import { Context } from "telegraf";
import { ChatMember } from "telegraf/typings/core/types/typegram";
import { getLang } from "../../lang";
import { isSudo } from "../libs/validators";
import { NoteI } from "../interfaces";
import { db } from "../../database";
import { generateLog } from "../libs/messages";

export async function decideBan(
	ctx: Context,
	emit: ChatMember,
	recep: ChatMember,
) {
	try {
		const _ = getLang(ctx.chat);
		if (recep.user.id == _bot.id) {
			return ctx.reply(_.global.preventBot);
		}
		if (recep.user.id == _owner.id && emit.user.id == _owner.id) {
			return ctx.reply(_.global.preventOwner);
		}
		if (recep.user.id == _owner.id) {
			return ctx.reply(_.global.permissionsDenied);
		}
		if (emit.status !== "creator" && recep.status == "creator") {
			return ctx.reply(_.global.permissionsDenied);
		}
		if (emit.user.id !== _owner.id && recep.user.id == _bot.id) {
			return ctx.reply(_.global.permissionsDenied);
		}
		if (emit.user.id == _owner.id) {
			await setBan(ctx, emit, recep);
		}
		if (isSudo(recep.user.id)) {
			return ctx.reply(_.global.preventSudo(recep.user.first_name));
		}
		if (emit.user.id == recep.user.id) {
			return ctx.reply(_.helpers.noYourAutoAction("ban"));
		}
		if (emit.status == "member" && recep.status == "administrator") {
			return ctx.reply(_.helpers.memberActionAdmin("ban"));
		}
		if (emit.status == "administrator" && recep.status == "administrator") {
			return ctx.reply(_.helpers.adminActionAdmin("ban"));
		}
		if (emit.status == "administrator" && recep.status == "creator") {
			return ctx.reply(_.helpers.anyActionCreator("ban"));
		}
		if (emit.status == "member" && recep.status == "creator") {
			return ctx.reply(_.helpers.anyActionCreator("ban"));
		}
		await setBan(ctx, emit, recep);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "decideBan", __filename);
	}
}
export async function decideUnBan(
	ctx: Context,
	emit: ChatMember,
	recep: ChatMember,
) {
	const _ = getLang(ctx.chat);
	try {
		if (recep.user.id == _bot.id) {
			return ctx.reply(_.global.preventBot);
		}
		if (recep.user.id == _owner.id) {
			return ctx.reply(_.global.preventOwner);
		}
		if (emit.user.id == _owner.id) {
			await setUnBan(ctx, emit, recep);
		}
		if (emit.status == "member") {
			return ctx.reply(_.global.permissionsDenied);
		}
		await setUnBan(ctx, emit, recep);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "decideUnban", __filename);
	}
}
export async function setBan(ctx: Context, A: ChatMember, B: ChatMember) {
	const _ = getLang(ctx.chat);
	try {
		await ctx.kickChatMember(B.user.id);
		return ctx.reply(
			_.helpers.anyActionSucces(
				"banned",
				A.user.first_name,
				B.user.first_name,
			),
		);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "setBan", __filename);
	}
}
export async function setUnBan(ctx: Context, A: ChatMember, B: ChatMember) {
	const _ = getLang(ctx.chat);
	try {
		await ctx.unbanChatMember(B.user.id, {
			only_if_banned: true,
		});
		return ctx.reply(_.banModule.unBanSuccess);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "setUnBan", __filename);
	}
}
export async function setBanMessage(ctx: Context, message: NoteI) {
	try {
		const { banModule: _ } = getLang(ctx.chat);
		db(ctx.chat).get(`prefs`).unset("banPrefs").write();
		db(ctx.chat).get("prefs").assign({ banPrefs: message }).write();
		return ctx.reply(_.setBanSuccess);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "setBanMessage", __filename);
	}
}
