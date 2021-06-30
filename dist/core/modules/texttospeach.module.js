"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const texttospeach_controller_1 = require("../controllers/texttospeach.controller");
function default_1(bot) {
    bot.command("/tts", async (ctx) => {
        if (!ctx.message.reply_to_message) {
            let lang = ctx.message.text.split(" ")[1];
            let message = ctx.message.text.replace("/tts " + lang, "");
            if (message.length >= 200) {
                ctx.reply("El mensaje supera los 200 caracteres");
                return;
            }
            let speach = await texttospeach_controller_1.getTTS(message, lang);
            ctx.replyWithVoice({ url: speach }, {
                allow_sending_without_reply: true,
            });
            return;
        }
        else {
            let { text } = ctx.message.reply_to_message;
            let lang = text.split(" ")[1];
            let message = ctx.message.text;
            if (message.length >= 200) {
                ctx.reply("El mensaje supera los 200 caracteres");
                return;
            }
            let speach = await texttospeach_controller_1.getTTS(message, lang);
            ctx.replyWithVoice({ url: speach }, {
                allow_sending_without_reply: true,
                duration: 1000,
            });
            return;
        }
    });
}
exports.default = default_1;
