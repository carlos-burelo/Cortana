import { Context } from "telegraf";
import { ChatMember } from "telegraf/typings/core/types/typegram";
import { _bot, _owner } from "../../config";
import { db } from "../../database";
import { getLang } from "../../lang";
import { BioI, ChatUserI } from "../interfaces";
import { generateLog } from "../libs/messages";

export async function getBio(ctx: Context, B: ChatUserI) {
	try {
		const _ = getLang(ctx.chat);
		if (db(ctx.chat).get("bios").find({ id: B.id }).value() == undefined) {
			return ctx.reply(_.bioModule.notFound(B.first_name));
		} else {
			let i = db(ctx.chat).get("bios").find({ id: B.id }).value();
			return ctx.reply(`${i.first_name}:\n${i.bio}`, {
				parse_mode: "Markdown",
			});
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "getBio", __filename);
	}
}
export async function decideBio(
	ctx: Context,
	A: ChatMember,
	B: ChatMember,
	Bio: BioI,
) {
	try {
		const _ = getLang(ctx.chat);
		if (A.status == "member") {
			return ctx.reply(_.global.permissionsDenied);
		}
		if (B.user.id == _owner.id) {
			return ctx.reply(_.global.permissionsDenied);
		}
		if (A.user.id !== _owner.id && B.user.id == _bot.id) {
			return ctx.reply(_.global.permissionsDenied);
		}
		let id: number = Bio.id;
		if (db(ctx.chat).get("bios").find({ id: id }).value() == undefined) {
			await setBio(ctx, Bio);
		} else {
			await updateBio(ctx, Bio);
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "decideBio", __filename);
	}
}
export async function setBio(ctx: Context, Bio: BioI) {
	const _ = getLang(ctx.chat);
	try {
		db(ctx.chat).get("bios").push(Bio).write();
		return ctx.reply(_.bioModule.setBioSuccess);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "setBio", __filename);
	}
}
export async function updateBio(ctx: Context, Bio: BioI) {
	const _ = getLang(ctx.chat);
	try {
		db(ctx.chat).get("bios").find({ id: Bio.id }).assign(Bio).write();
		return ctx.reply(_.bioModule.updateBioSuccess);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "updateBio", __filename);
	}
}
export async function delBio(ctx: Context, A: ChatMember, B: ChatMember) {
	const _ = getLang(ctx.chat);
	try {
		if (A.status == "member") {
			return ctx.reply(_.global.permissionsDenied);
		}
		let i = db(ctx.chat).get("bios").find({ id: B.user.id }).value();
		if (i == undefined) {
			return ctx.reply(_.bioModule.notFound(B.user.first_name));
		}
		db(ctx.chat).get("bios").remove({ id: B.user.id }).write();
		return ctx.reply(_.bioModule.deleteBioSuccess);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "delBio", __filename);
	}
}
