"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("../../lang");
const translator_controller_1 = require("../controllers/translator.controller");
function default_1(bot) {
    bot.command("/tr", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        let text;
        let lang;
        if (!ctx.message.reply_to_message) {
            text = ctx.message.text.replace(/\/tr|\/tl/, '').trim();
            if (text.length >= 200) {
                return ctx.reply(_.trasnlatorModule.limit);
            }
            lang = text.split('')[0];
            if (lang.length > 2) {
                return ctx.reply(_.global.codeLangError);
            }
            text = text.replace(lang, '').trim();
        }
        else {
            lang = ctx.message.text.replace(/\/tr|\/tl/, '').trim();
            if (lang.length > 2) {
                return ctx.reply(_.global.codeLangError);
            }
            let { text: text2 } = ctx.update.message.reply_to_message;
            if (text2 >= 200) {
                return ctx.reply(_.trasnlatorModule.limit);
            }
            text = text2;
        }
        await translator_controller_1.translateText(ctx, lang, text);
    });
}
exports.default = default_1;
