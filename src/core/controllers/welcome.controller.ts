import { Context } from "telegraf";
import { db } from "../../database";
import { _bot, _owner } from "../../config";
import { getLang } from "../../lang";
import { ChatUserI, NoteI, OwnerI, WelcomeI } from "../interfaces";
import { editMessage, generateLog, sendMsg } from "../libs/messages";
import { promoteUser } from "./admin.controller";

export async function welcomeOwner(ctx: Context, user: OwnerI|ChatUserI) {
	try {
		const _ = getLang(ctx.chat);
		let { message_id: id } = await ctx.replyWithMarkdown(
			`\`${_.welcomeModule.ownerProcess[0]}\``,
		);
		try {
			editMessage(ctx, id, `\`${_.welcomeModule.ownerProcess[1]}\``);
			await promoteUser(ctx, _bot, user);
			editMessage(ctx, id, `\`${_.welcomeModule.ownerProcess[3]}\``);
		} catch (error) {
			editMessage(ctx, id, `\`${_.welcomeModule.ownerProcess[2]}\``);
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "setSudo", __filename);
	}
}

export function getPrefs(ctx: Context, pref: "welcome" | "goodbye"): WelcomeI {
	try {
		return db(ctx.chat).get(`prefs.${pref}`).value();
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "setSudo", __filename);
	}
}

export function sendGreetings(
	ctx: Context,
	member: ChatUserI,
	pref: "welcome" | "goodbye",
) {
	try {
		let { status, message } = getPrefs(ctx, pref);
		if (status == true) {
			if(message.text){
				message.content = message.text
				message.type = 'text'
			}
			return sendMsg(ctx, message, ctx.chat.id, member);
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "setSudo", __filename);
	}
}

export function setGreetins(
	ctx: Context,
	msg: NoteI,
	pref: "welcome" | "goodbye",
) {
	const _ = getLang(ctx.chat);
	try {
		db(ctx.chat).get(`prefs`).get(pref).assign({ message: msg }).write();
		return ctx.reply(_.welcomeModule.prefSuccess(pref));
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "setSudo", __filename);
	}
}
export function greetingStatus(
	ctx: Context,
	stat: boolean,
	pref: "welcome" | "goodbye",
) {
	try {
		const _ = getLang(ctx.chat);
		let { status } = db(ctx.chat).get("prefs").get(pref).value();
		if (status == stat) {
			return ctx.reply(
				_.welcomeModule.prefRepeat(`${stat ? "on" : "off"}`),
			);
		}
		db(ctx.chat).get(`prefs`).get(pref).assign({ status: stat }).write();
		return ctx.reply(_.welcomeModule.prefSuccess(pref));
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "setSudo", __filename);
	}
}
