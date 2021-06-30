"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greetingStatus = exports.setGreetins = exports.sendGreetings = exports.getPrefs = exports.welcomeOwner = void 0;
const database_1 = require("../../database");
const config_1 = require("../../config");
const lang_1 = require("../../lang");
const messages_1 = require("../libs/messages");
const admin_controller_1 = require("./admin.controller");
async function welcomeOwner(ctx, user) {
    const _ = lang_1.getLang(ctx.chat);
    let { message_id: id } = await ctx.replyWithMarkdown(`\`${_.welcomeModule.ownerProcess[0]}\``);
    try {
        messages_1.editMessage(ctx, id, `\`${_.welcomeModule.ownerProcess[1]}\``);
        await admin_controller_1.promoteUser(ctx, config_1._bot, user);
        messages_1.editMessage(ctx, id, `\`${_.welcomeModule.ownerProcess[3]}\``);
    }
    catch (error) {
        messages_1.editMessage(ctx, id, `\`${_.welcomeModule.ownerProcess[2]}\``);
    }
}
exports.welcomeOwner = welcomeOwner;
;
function getPrefs(ctx, pref) {
    try {
        return database_1.db(ctx.chat).get(`prefs.${pref}`).value();
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getPrefs = getPrefs;
;
function sendGreetings(ctx, member, pref) {
    let { status, message } = getPrefs(ctx, pref);
    if (status == true) {
        return messages_1.sendMsg(ctx, message, undefined, member);
    }
}
exports.sendGreetings = sendGreetings;
function setGreetins(ctx, msg, pref) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        database_1.db(ctx.chat).get(`prefs`).get(pref).assign({ message: msg }).write();
        return ctx.reply(_.welcomeModule.prefSuccess(pref));
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.setGreetins = setGreetins;
function greetingStatus(ctx, stat, pref) {
    const _ = lang_1.getLang(ctx.chat);
    let { status } = database_1.db(ctx.chat).get('prefs').get(pref).value();
    if (status == stat) {
        return ctx.reply(_.welcomeModule.prefRepeat(`${stat ? 'on' : 'off'}`));
    }
    database_1.db(ctx.chat).get(`prefs`).get(pref).assign({ status: stat }).write();
    return ctx.reply(_.welcomeModule.prefSuccess(pref));
}
exports.greetingStatus = greetingStatus;
