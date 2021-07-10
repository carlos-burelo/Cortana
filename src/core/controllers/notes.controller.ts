import { Context } from "telegraf";
import { db } from "../../database";
import { getLang } from "../../lang";
import { NoteI } from "../interfaces";
import { generateLog, sendMsg } from "../libs/messages";

export async function getNote(ctx: Context, noteId: string) {
	const _ = getLang(ctx.chat);
	try {
		let a = db(ctx.chat).get("notes").find({ id: noteId }).value();
		if (a == undefined) {
			return ctx.reply(_.notesModule.noteNotFound);
		}
		return sendMsg(ctx, a);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "getNote", __filename);
	}
}
export async function getNotes(ctx: Context) {
	const _ = getLang(ctx.chat);
	try {
		const notes = db(ctx.chat).get("notes").value();
		if (notes.length == 0) {
			return ctx.reply(_.notesModule.notesNotFound);
		} else {
			const chat = await ctx.getChat();
			let title: string = "";
			if (chat.type == "private") {
				title = _.notesModule.personalNotes;
			} else {
				title = _.notesModule.publicNotes(chat.title);
			}
			let notas: string = "";
			notas += `${title}\n\n`;
			notes.map((note, i) => {
				let indice1 = i + 1;
				let indice = indice1 <= 9 ? `0${indice1}` : `${indice1}`;
				notas += `*${indice} - *\`#${note.id}\`\n`;
			});
			notas += _.notesModule.noteSuggest;
			return ctx.reply(notas, { parse_mode: "Markdown" });
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "getNotes", __filename);
	}
}
export async function addOrUpdateNote(ctx: Context, note: NoteI) {
	const _ = getLang(ctx.chat);
	try {
		if (
			db(ctx.chat).get("notes").find({ id: note.id }).value() !==
			undefined
		) {
			await db(ctx.chat).get("notes").remove({ id: note.id }).write();
			db(ctx.chat).get("notes").push(note).write();
			return ctx.replyWithMarkdown(_.notesModule.updateNote(note.id));
		} else {
			db(ctx.chat).get("notes").push(note).write();
			return ctx.replyWithMarkdown(_.notesModule.noteAdded(note.id));
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "addOrUpdateNote", __filename);
	}
}
export async function deleteNote(ctx: Context, noteId: string) {
	try {
		const _ = getLang(ctx.chat);
		let a: NoteI = db(ctx.chat).get("notes").find({ id: noteId }).value();
		if (!a == undefined) {
			return ctx.reply(_.notesModule.noteNotFound);
		} else {
			await db(ctx.chat).get("notes").remove({ id: noteId }).write();
			return ctx.replyWithMarkdown(_.notesModule.deleteNote(noteId));
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "deleteNote", __filename);
	}
}
