import { Telegraf } from "telegraf";
import {
	addOrUpdateNote,
	deleteNote,
	getNote,
	getNotes,
} from "../controllers/notes.controller";
import { NoteI } from "../interfaces";
import { detectMsgFormat, generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	bot.command("/notes", async (ctx) => {
		try {
			await getNotes(ctx);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/notes", __filename);
		}
	});
	bot.hears(/^#[^\s]+/, async (ctx) => {
		try {
			let noteId: string = ctx.message.text.replace(/#/, "");
			let arg: string = noteId.split(" ")[1];
			if (arg && arg == "--rm") {
				noteId = noteId.split(" ")[0];
				return await deleteNote(ctx, noteId);
			}
			await getNote(ctx, noteId);
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/regex:note", __filename);
		}
	});
	bot.command(["/add", "/save"], async (ctx) => {
		try {
			if (ctx.message.reply_to_message) {
				let id: string = ctx.message.text
					.replace(/\/add|\/save/, "")
					.trim()
					.split(" ")[0];
				if (id.length < 1) {
					ctx.reply("Ingrese un nombre para la nota");
					return;
				}
				let note: NoteI = detectMsgFormat(
					ctx.message.reply_to_message,
					id,
				);
				await addOrUpdateNote(ctx, note);
				console.log('fgdgdf')
			} else {
				let id: string = ctx.message.text
					.replace(/\/add|\/save/, "")
					.trim()
					.split(" ")[0];
				if (id.length < 1) {
					ctx.reply("Ingrese un nombre para la nota");
					return;
				}
				let text = ctx.message.text
					.replace(/\/add|\/save/, "")
					.trim()
					.replace(id, "")
					.trim();
				if (text.length < 1) {
					ctx.reply("Ingrese el contenido para la nota");
					return;
				}
				let note: NoteI = { id, text };
				console.log(note, id)
				await addOrUpdateNote(ctx, note);
			}
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/add | /save", __filename);
		}
	});
}
