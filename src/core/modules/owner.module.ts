import { Telegraf } from "telegraf";
import { _owner } from "../../config";
import { getDatabases } from "../../database";
import { getLang } from "../../lang";
import {
	delSudo,
	getGroups,
	getSudos,
	sendMessageTo,
	setSudo,
} from "../controllers/owner.controller";
import { ChatUserI, DatabaseI } from "../interfaces";
import { generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/send", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			let user: ChatUserI;
			let msg: any;
			let id: number;
			user = ctx.message.from;
			id = parseInt(ctx.message.text.split(" ")[1]);
			if (isNaN(id)) {
				return ctx.reply(_.ownerModule.invalidID);
			}
			if (ctx.message.reply_to_message) {
				msg = ctx.message.reply_to_message;
			} else {
				msg = {
					type: "text",
					content: ctx.message.text.replace(`/send ${id}`, "").trim(),
				};
			}
			await sendMessageTo(ctx, user, msg, id);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/send", __filename);
		}
	});
	bot.command("/eco", async (ctx) => {
		try {
			let user: ChatUserI;
			let msg: any;
			user = ctx.message.from;
			if (ctx.message.reply_to_message) {
				msg = ctx.message.reply_to_message;
			} else {
				msg = {
					type: "text",
					content: ctx.message.text.replace(`/eco`, "").trim(),
				};
			}
			let dbs: DatabaseI[] = getDatabases();
			try {
				dbs.map(async (db) => {
					await sendMessageTo(ctx, user, msg, parseInt(db.id));
				});
			} catch (error) {
				ctx.reply(error.toString());
			}
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/eco", __filename);
		}
	});
	bot.command("/groups", async (ctx) => {
		try {
			let id: number = ctx.from.id;
			getGroups(ctx, id);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/groups", __filename);
		}
	});
	bot.command(["/sudolist", "/sudos"], async (ctx) => {
		try {
			getSudos(ctx);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/sudos | /sudolitst", __filename);
		}
	});
	bot.command("/sudo", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			if (!ctx.message.reply_to_message) {
				return ctx.reply(_.global.pleaseReplyMsg);
			}
			if (ctx.from.id !== _owner.id) {
				return ctx.reply(_.global.permissionsDenied);
			}
			let user = ctx.message.reply_to_message.from;
			let arg: string = ctx.message.text.split(" ")[1];
			if (!arg) {
				return ctx.reply(_.global.notArguments);
			}
			if (arg == "--rm") {
				return delSudo(ctx, user);
			}
			setSudo(ctx, user, arg);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/sudo", __filename);
		}
	});
	bot.command('/ctx', async (ctx) => {
		console.log(JSON.stringify(ctx))
	});
}
