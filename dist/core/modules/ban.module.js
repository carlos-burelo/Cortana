"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("../../lang");
const ban_controller_1 = require("../controllers/ban.controller");
const messages_1 = require("../libs/messages");
function default_1(bot) {
    bot.command("/ban", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message) {
            return ctx.reply(_.global.pleaseReplyMsg);
        }
        const A = await ctx.getChatMember(ctx.message.from.id);
        const B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
        await ban_controller_1.decideBan(ctx, A, B);
    });
    bot.command("/unban", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message) {
            return ctx.reply(_.global.pleaseReplyMsg);
        }
        const A = await ctx.getChatMember(ctx.message.from.id);
        const B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
        await ban_controller_1.decideUnBan(ctx, A, B);
    });
    bot.command("/setban", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message) {
            return ctx.reply(_.global.pleaseReplyMsg);
        }
        let msg = await messages_1.detectMsgFormat(ctx.message.reply_to_message);
        await ban_controller_1.setBanMessage(ctx, msg);
    });
}
exports.default = default_1;
