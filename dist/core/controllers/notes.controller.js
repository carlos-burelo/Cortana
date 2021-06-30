"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.addOrUpdateNote = exports.getNotes = exports.getNote = void 0;
const database_1 = require("../../database");
const lang_1 = require("../../lang");
const messages_1 = require("../libs/messages");
async function getNote(ctx, noteId) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        let a = database_1.db(ctx.chat).get("notes").find({ id: noteId }).value();
        if (a == undefined) {
            return ctx.reply(_.notesModule.noteNotFound);
        }
        return messages_1.sendMsg(ctx, a);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getNote = getNote;
async function getNotes(ctx) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        const notes = database_1.db(ctx.chat).get("notes").value();
        if (notes.length == 0) {
            return ctx.reply(_.notesModule.notesNotFound);
        }
        else {
            const chat = await ctx.getChat();
            let title = "";
            if (chat.type == "private") {
                title = _.notesModule.personalNotes;
            }
            else {
                title = _.notesModule.publicNotes(chat.title);
            }
            let notas = "";
            notas += `${title}\n\n`;
            notes.map((note, i) => {
                let indice1 = i + 1;
                let indice = indice1 <= 9 ? `0${indice1}` : `${indice1}`;
                notas += `*${indice} - *\`#|${note.id}\`\n`;
            });
            notas += _.notesModule.noteSuggest;
            return ctx.reply(notas, { parse_mode: "Markdown" });
        }
    }
    catch (error) {
        return ctx.reply(error.toString());
    }
}
exports.getNotes = getNotes;
async function addOrUpdateNote(ctx, note) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        if (database_1.db(ctx.chat).get("notes").find({ id: note.id }).value() !==
            undefined) {
            await database_1.db(ctx.chat).get("notes").remove({ id: note.id }).write();
            database_1.db(ctx.chat).get("notes").push(note).write();
            return ctx.replyWithMarkdown(_.notesModule.updateNote(note.id));
        }
        else {
            database_1.db(ctx.chat).get("notes").push(note).write();
            return ctx.replyWithMarkdown(_.notesModule.noteAdded(note.id));
        }
    }
    catch (error) {
        return ctx.reply(error.toString());
    }
}
exports.addOrUpdateNote = addOrUpdateNote;
async function deleteNote(ctx, noteId) {
    const _ = lang_1.getLang(ctx.chat);
    let a = database_1.db(ctx.chat).get("notes").find({ id: noteId }).value();
    if (!a == undefined) {
        return ctx.reply(_.notesModule.noteNotFound);
    }
    else {
        await database_1.db(ctx.chat).get("notes").remove({ id: noteId }).write();
        return ctx.replyWithMarkdown(_.notesModule.deleteNote(noteId));
    }
}
exports.deleteNote = deleteNote;
