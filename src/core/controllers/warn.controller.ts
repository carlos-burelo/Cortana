import { Context } from "telegraf";
import { ChatMember } from "typegram";
import { _bot, _owner } from "../../config";
import { db } from "../../database";
import { getLang } from "../../lang";
import { ChatUserI, WarnI } from "../interfaces";

export function getWarn(ctx: Context, id: number): WarnI | undefined {
	let user = db(ctx.chat).get("warns").find({ id: id }).value();
	if (!user || user == undefined) {
		return undefined;
	} else {
		return user;
	}
}
export function setWarn(
	ctx: Context,
	A: ChatMember,
	B: ChatMember,
	reason: string,
) {
	const _ = getLang(ctx.chat);
	try {
		if (B.status == "creator") {
			return ctx.reply(_.helpers.anyActionCreator("warn"));
		}
		if (B.user.id == _bot.id) {
			return ctx.reply(_.global.preventBot);
		}
		if (B.user.id == _owner.id) {
			return ctx.reply(_.global.preventOwner);
		}
		if (A.status == "member" && B.status == "administrator") {
			return ctx.reply(_.helpers.memberActionAdmin("warn"));
		}
		let user: WarnI | any = getWarn(ctx, B.user.id);
		if (user !== undefined) {
			if (user.count < 2) {
				db(ctx.chat)
					.get("warns")
					.find({ id: user.id })
					.assign({ count: user.count + 1 })
					.write();
				db(ctx.chat)
					.get("warns")
					.find({ id: user.id })
					.get("reasons")
					.push(reason)
					.write();
				return ctx.reply("Ultima advertencia");
			}
			if (user.count == 2) {
				return ctx.reply("Por ahora no puedo banear, por ahora...");
			}
		} else {
			let warnedUser: WarnI = {
				id: B.user.id,
				count: 1,
				username: B.user.username,
				first_name: B.user.first_name,
				reasons: [reason],
			};
			db(ctx.chat).get("warns").push(warnedUser).write();
			return ctx.reply("Primera advertencia");
		}
	} catch (error) {
		ctx.reply(error.toString());
	}
}
export function getWarnInfo(ctx: Context, B: ChatUserI) {
	const _ = getLang(ctx.chat);
	let user: WarnI = getWarn(ctx, B.id);
	if (user !== undefined) {
		let text = _.warnModule.warnInfo(user);
		user.reasons.map((r, i) => (text += `<b>${i + 1}</b> - ${r}\n`));
		return ctx.replyWithHTML(text);
	} else {
		return ctx.reply(_.warnModule.noWarns(B.user.first_name));
	}
}
export function removeWarn(ctx: Context, A: ChatMember, B: ChatMember) {
	const _ = getLang(ctx.chat);
	try {
		if (A.status == "member") {
			return ctx.reply(_.global.permissionsDenied);
		}
		let user: WarnI = getWarn(ctx, B.user.id);
		if (user !== undefined) {
			if (user.count == 1) {
				db(ctx.chat).get("warns").remove({ id: user.id }).write();
				return ctx.reply(_.warnModule.allWarnsRemoved);
			} else {
				db(ctx.chat)
					.get("warns")
					.find({ id: user.id })
					.assign({ count: user.count - 1 })
					.write();
				return ctx.reply(_.warnModule.warnRemoved);
			}
		} else {
			return ctx.reply(_.warnModule.noWarns(B.user.first_name));
		}
	} catch (error) {
		ctx.reply(error.toString());
	}
}
