"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../database");
const lang_1 = require("../../lang");
const buttons_1 = require("../libs/buttons");
const buttons_component_1 = require("../shared/buttons.component");
function default_1(bot) {
    bot.start(async (ctx) => {
        let _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            database_1.db(ctx.message.from).value();
            ctx.reply(_.startModule.message, buttons_component_1.startButtons);
        }
        else {
            database_1.db(ctx.chat).value();
            ctx.reply(_.startModule.message, buttons_component_1.startButtons);
        }
    });
    bot.command("/lang", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        let lang = ctx.message.text.split(" ")[1];
        if (lang == "en" || lang == "es") {
            let current = `${lang == "es" ? "Español 🇲🇽" : lang == "en" ? "English 🇺🇸" : "en"}`;
            database_1.db(ctx.chat).assign({ lang: lang }).write();
            return ctx.reply(_.global.setLanguageSucces(current));
        }
        else {
            return ctx.reply(_.global.codeLangError);
        }
    });
    bot.command("/r", async (ctx) => {
        const { text, buttons } = buttons_1.extractButtons(ctx.message.text.replace("/r", "").trim());
        ctx.replyWithMarkdown(text, {
            reply_markup: buttons_1.createButtons(buttons, 2),
        });
    });
}
exports.default = default_1;
