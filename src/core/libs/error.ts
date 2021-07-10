import { Context } from "telegraf";
import { getLang } from "../../lang";
import { ChatUserI } from "../interfaces";

export function catchErrors(ctx: Context, error: string, user?: ChatUserI) {
	const _ = getLang(ctx.chat);
	let HandleErrors = {
		"400: Bad Request: can't promote self":
			_.helpers.noAutoAction("promote"),
	};
	if (error == HandleErrors[error]) {
		return ctx.reply(HandleErrors[error]);
	} else {
		return ctx.telegram.sendMessage(process.env.CHANELID, error);
	}
}
