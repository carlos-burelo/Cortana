"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("../../lang");
const bios_controller_1 = require("../controllers/bios.controller");
function default_1(bot) {
    bot.command("/bio", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message) {
            return ctx.reply(_.global.pleaseReplyMsg);
        }
        let arg = ctx.message.text.split(" ")[1];
        if (arg && arg == "--rm") {
            let A = await ctx.getChatMember(ctx.message.from.id);
            let B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
            await bios_controller_1.delBio(ctx, A, B);
        }
        await bios_controller_1.getBio(ctx, ctx.message.reply_to_message.from);
    });
    bot.command("/setbio", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message) {
            return ctx.reply(_.global.pleaseReplyMsg);
        }
        let text = ctx.message.text.replace(/\/setbio/g, "").trim();
        if (text.length < 1) {
            return ctx.reply(_.bioModule.emptyBiography);
        }
        let Bio = {
            id: ctx.message.reply_to_message.from.id,
            bio: text,
            first_name: ctx.message.reply_to_message.from.first_name,
        };
        const A = await ctx.getChatMember(ctx.message.from.id);
        const B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
        await bios_controller_1.decideBio(ctx, A, B, Bio);
    });
}
exports.default = default_1;
