"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notes_controller_1 = require("../controllers/notes.controller");
const messages_1 = require("../libs/messages");
function default_1(bot) {
    bot.command("/notes", async (ctx) => {
        await notes_controller_1.getNotes(ctx);
    });
    bot.hears(/#[^\s]+/, async (ctx) => {
        let noteId = ctx.message.text.replace(/#/, "");
        let arg = noteId.split(" ")[1];
        if (arg && arg == "--rm") {
            noteId = noteId.split(" ")[0];
            return await notes_controller_1.deleteNote(ctx, noteId);
        }
        await notes_controller_1.getNote(ctx, noteId);
    });
    bot.command(["/add", "/save"], async (ctx) => {
        if (ctx.message.reply_to_message) {
            let id = ctx.message.text
                .replace(/\/add|\/save/, "")
                .trim()
                .split(" ")[0];
            if (id.length < 1) {
                ctx.reply("Ingrese un nombre para la nota");
                return;
            }
            let note = await messages_1.detectMsgFormat(ctx.message.reply_to_message, id);
            await notes_controller_1.addOrUpdateNote(ctx, note);
        }
        else {
            let id = ctx.message.text
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
            let note = { id, text };
            await notes_controller_1.addOrUpdateNote(ctx, note);
        }
    });
}
exports.default = default_1;
