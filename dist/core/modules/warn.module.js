"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("../../lang");
const warn_controller_1 = require("../controllers/warn.controller");
function default_1(bot) {
    bot.command("/warn", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message) {
            return ctx.reply(_.global.pleaseReplyMsg);
        }
        let arg = ctx.message.text.split(" ")[1];
        const A = await ctx.getChatMember(ctx.message.from.id);
        const B = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
        if (arg == "--info") {
            return warn_controller_1.getWarnInfo(ctx, ctx.message.reply_to_message.from);
        }
        if (arg == "--rm") {
            return warn_controller_1.removeWarn(ctx, A, B);
        }
        let reason = ctx.message.text.replace(/\/warn/, "").trim();
        if (!reason || reason.length == 0) {
            return ctx.reply(_.warnModule.reason);
        }
        warn_controller_1.setWarn(ctx, A, B, reason);
    });
}
exports.default = default_1;
