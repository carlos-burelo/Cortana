"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const welcome_controller_1 = require("../controllers/welcome.controller");
const config_1 = require("../../config");
const lang_1 = require("../../lang");
const messages_1 = require("../libs/messages");
function default_1(bot) {
    bot.on("new_chat_members", async (ctx) => {
        let { message: { new_chat_member: member } } = ctx.update;
        if (member.id == config_1._owner.id) {
            return welcome_controller_1.welcomeOwner(ctx, config_1._owner);
        }
        return welcome_controller_1.sendGreetings(ctx, member, 'welcome');
    });
    bot.command('/welcome', async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == 'private') {
            return ctx.reply(_.global.noPrivateChats);
        }
        let msg = ctx.message.text.replace(/\/welcome/, '').trim();
        if (msg == 'on') {
            return welcome_controller_1.greetingStatus(ctx, true, 'welcome');
        }
        if (msg == 'off') {
            return welcome_controller_1.greetingStatus(ctx, false, 'welcome');
        }
        if (ctx.message.reply_to_message) {
            let reply = ctx.message.reply_to_message;
            let msg = await messages_1.detectMsgFormat(reply);
            return welcome_controller_1.setGreetins(ctx, msg, 'welcome');
        }
    });
    bot.on("left_chat_member", async (ctx) => {
        let { message: { left_chat_member: member } } = ctx.update;
        return welcome_controller_1.sendGreetings(ctx, member, 'goodbye');
    });
    bot.command('/goodbye', async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (ctx.chat.type == 'private') {
            return ctx.reply(_.global.noPrivateChats);
        }
        let msg = ctx.message.text.replace(/\/goodbye/, '').trim();
        if (msg == 'on') {
            return welcome_controller_1.greetingStatus(ctx, true, 'goodbye');
        }
        if (msg == 'off') {
            return welcome_controller_1.greetingStatus(ctx, false, 'goodbye');
        }
        if (ctx.message.reply_to_message) {
            let reply = ctx.message.reply_to_message;
            let msg = await messages_1.detectMsgFormat(reply);
            return welcome_controller_1.setGreetins(ctx, msg, 'goodbye');
        }
    });
}
exports.default = default_1;
