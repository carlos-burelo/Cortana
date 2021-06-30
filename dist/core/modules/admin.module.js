"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("../../lang");
const config_1 = require("../../config");
const admin_controller_1 = require("../controllers/admin.controller");
function default_1(bot) {
    bot.command("/promote", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message) {
            return ctx.reply(_.global.pleaseReplyMsg);
        }
        let emisor = await ctx.getChatMember(ctx.message.from.id);
        let receptor = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
        await admin_controller_1.decidePromote(ctx, emisor, receptor);
    });
    bot.command("/demote", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message) {
            return ctx.reply(_.global.pleaseReplyMsg);
        }
        let emisor = await ctx.getChatMember(ctx.message.from.id);
        let receptor = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
        await admin_controller_1.decideDemote(ctx, emisor, receptor);
    });
    bot.command("/promoteme", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (ctx.message.from.id !== config_1._owner.id) {
            return ctx.reply(_.global.onlyOwner);
        }
        await admin_controller_1.promoteMe(ctx);
    });
    bot.command(["/admins", "/adminlist"], async (ctx) => {
        await admin_controller_1.getAdminList(ctx);
    });
    bot.command("/pin", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        let msgId;
        let arg;
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message) {
            msgId = ctx.message.message_id;
        }
        msgId = ctx.message.reply_to_message.message_id;
        if (ctx.message.text.split(" ")[1] == "-s") {
            arg = ctx.message.text.split(" ")[1];
        }
        admin_controller_1.pinMessage(ctx, msgId, arg);
    });
    bot.command("/unpin", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        let msgId;
        let arg;
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message && arg !== "--all") {
            return ctx.reply(_.adminMoodule.unPinSuggestion);
        }
        msgId = ctx.message.reply_to_message.message_id;
        await admin_controller_1.unPinMessage(ctx, msgId);
    });
    bot.command("/link", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        let { invite_link, title } = await ctx.getChat();
        ctx.replyWithMarkdown(`[${title}](${invite_link})\n`, {
            disable_web_page_preview: false,
            allow_sending_without_reply: true,
        });
    });
    bot.command("/perms", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == "private") {
            return ctx.reply(_.global.noPrivateChats);
        }
        if (!ctx.message.reply_to_message) {
            let { permissions: p, title } = await ctx.getChat();
            await admin_controller_1.getChatPerms(ctx, p, title);
        }
        else {
            let id = ctx.message.reply_to_message.from.id;
            await admin_controller_1.getUserPerms(ctx, id);
        }
    });
    bot.command("/setperms", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        try {
            ctx.setChatPermissions({
                can_add_web_page_previews: true,
                can_change_info: true,
                can_invite_users: true,
                can_pin_messages: true,
                can_send_media_messages: true,
                can_send_messages: true,
                can_send_other_messages: true,
                can_send_polls: true,
            });
            return ctx.reply(_.permissions.setPermsSuccess);
        }
        catch (error) {
            return ctx.reply(_.permissions.setPermsError);
        }
    });
}
exports.default = default_1;
