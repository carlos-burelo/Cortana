"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const database_1 = require("../../database");
const lang_1 = require("../../lang");
const owner_controller_1 = require("../controllers/owner.controller");
function default_1(bot) {
    bot.command("/send", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        let user;
        let msg;
        let id;
        user = ctx.message.from;
        id = parseInt(ctx.message.text.split(' ')[1]);
        if (isNaN(id)) {
            return ctx.reply(_.ownerModule.invalidID);
        }
        if (ctx.message.reply_to_message) {
            msg = ctx.message.reply_to_message;
        }
        else {
            msg = {
                type: 'text',
                content: ctx.message.text.replace(`/send ${id}`, '').trim()
            };
        }
        await owner_controller_1.sendMessageTo(ctx, user, msg, id);
    });
    bot.command('/eco', async (ctx) => {
        let user;
        let msg;
        user = ctx.message.from;
        if (ctx.message.reply_to_message) {
            msg = ctx.message.reply_to_message;
        }
        else {
            msg = {
                type: 'text',
                content: ctx.message.text.replace(`/eco`, '').trim()
            };
        }
        let dbs = database_1.getDatabases();
        try {
            dbs.map(async (db) => {
                await owner_controller_1.sendMessageTo(ctx, user, msg, parseInt(db.id));
            });
        }
        catch (error) {
            ctx.reply(error.toString());
        }
    });
    bot.command('/groups', async (ctx) => {
        let id = ctx.from.id;
        owner_controller_1.getGroups(ctx, id);
    });
    bot.command(["/sudolist", "/sudos"], async (ctx) => {
        owner_controller_1.getSudos(ctx);
    });
    bot.command('/sudo', async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        if (!ctx.message.reply_to_message) {
            return ctx.reply(_.global.pleaseReplyMsg);
        }
        if (ctx.from.id !== config_1._owner.id) {
            return ctx.reply(_.global.permissionsDenied);
        }
        let user = ctx.message.reply_to_message.from;
        let arg = ctx.message.text.split(' ')[1];
        if (!arg) {
            return ctx.reply(_.global.notArguments);
        }
        if (arg == '--rm') {
            return owner_controller_1.delSudo(ctx, user);
        }
        owner_controller_1.setSudo(ctx, user, arg);
    });
}
exports.default = default_1;
