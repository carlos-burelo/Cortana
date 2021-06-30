"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../database");
const lang_1 = require("../../lang");
const fiters_controller_1 = require("../controllers/fiters.controller");
const messages_1 = require("../libs/messages");
async function default_1(bot) {
    bot.command("/filter", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        let word = ctx.message.text.match(/![^\s]+/gi);
        if (!word) {
            ctx.reply(_.filterModule.noFilterKey);
            return;
        }
        word = word[0].replace(/!/g, "");
        if (!ctx.message.reply_to_message) {
            let text = ctx.message.text;
            let regex = /(\".*?")/gi;
            let match;
            let filters = [];
            while ((match = regex.exec(text)) !== null) {
                filters.push(match[1].replace(/"/g, ""));
            }
            if (filters.length == 0) {
                ctx.reply(_.filterModule.setRespFilter);
                return;
            }
            let newFilter = {
                id: word,
                type: "text",
                strings: filters,
            };
            await fiters_controller_1.setFilter(ctx, newFilter);
        }
        else {
            let { content, type } = await messages_1.detectMsgFormat(ctx.message.reply_to_message);
            let newFilter = {
                id: word,
                type,
                content,
            };
            await fiters_controller_1.setFilter(ctx, newFilter);
        }
    });
    bot.command("/filterinfo", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        let filter = ctx.message.text
            .replace(/\/filterinfo/, "")
            .trim();
        await fiters_controller_1.getFilter(ctx, filter);
    });
    bot.command("/filters", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        await fiters_controller_1.getFilters(ctx);
    });
    bot.hears(/^[\w]+/gi, async (ctx) => {
        if (ctx.chat.type !== "private") {
            let text = ctx.message.text;
            let filters = database_1.db(ctx.chat).get("filters").value();
            if (filters !== undefined) {
                filters.forEach(async (a) => {
                    if (text.toLowerCase().includes(a.id.toLowerCase())) {
                        if (a.strings) {
                            ctx.reply(a.strings[Math.floor(Math.random() * a.strings.length)]);
                        }
                        else {
                            await messages_1.sendMsg(ctx, a);
                        }
                    }
                });
            }
        }
    });
    bot.command("/stop", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        let filter = ctx.message.text.split(" ")[1];
        fiters_controller_1.stopFilter(ctx, filter);
    });
}
exports.default = default_1;
