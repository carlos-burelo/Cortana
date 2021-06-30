"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delSudo = exports.setSudo = exports.getSudos = exports.getGroups = exports.sendMessageTo = void 0;
const config_1 = require("../../config");
const database_1 = require("../../database");
const lang_1 = require("../../lang");
const messages_1 = require("../libs/messages");
const validators_1 = require("../libs/validators");
async function sendMessageTo(ctx, user, msg, id) {
    try {
        if (user.id == config_1._owner.id) {
            let message = await messages_1.detectMsgFormat(msg);
            await messages_1.sendMsg(ctx, message, id);
        }
        if (validators_1.isSudo(user.id)) {
            let message = await messages_1.detectMsgFormat(msg);
            await messages_1.sendMsg(ctx, message, id);
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.sendMessageTo = sendMessageTo;
;
async function getGroups(ctx, id) {
    try {
        if (id == config_1._owner.id || validators_1.isSudo(id)) {
            let dbs = database_1.getDatabases();
            let text = '<b>Groups in db</b>\n\n';
            await Promise.all(dbs.map(async (db) => {
                let group = await ctx.telegram.getChat(db.id);
                text += `<b>Id:</b>  <code>${group.id}</code>\n`;
                text += `<b>title:</b>  <b>${group.title}</b>\n`;
                if (!group.username) {
                    text += `<b>Invite link:</b>  <a href="${group.invite_link}">@${group.title}</a>\n\n`;
                }
                else {
                    text += `<b>Account:</b>  <b>@${group.username}</b>\n\n`;
                }
            }));
            return await ctx.replyWithHTML(text);
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getGroups = getGroups;
;
function getSudos(ctx) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        let sudos = database_1.db().get('sudos').value();
        if (sudos.length == 0) {
            return ctx.reply(_.ownerModule.noSudos);
        }
        let text = '<b>Sudos</b>\n\n';
        sudos.map(a => {
            text += `<b>id:</b><code>${a.id}</code>\n`;
            text += `<b>Name:</b><i>${a.first_name}</i>\n`;
            text += `<b>Username:</b><i>@${a.username}</i>\n`;
            text += `<b>Role:</b><i>${a.role}</i>\n\n`;
        });
        return ctx.replyWithHTML(text);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getSudos = getSudos;
function setSudo(ctx, user, role) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        let sudo = database_1.db().get('sudos').find({ id: user.id }).value();
        let sudoI = {
            id: user.id,
            first_name: user.first_name,
            role: role,
            username: user.username
        };
        if (!sudo || sudo == undefined) {
            database_1.db().get('sudos').push(sudoI).write();
            return ctx.reply(_.ownerModule.sudoAdd(user.first_name));
        }
        else {
            database_1.db().get('sudos').find({ id: sudo.id }).assign(sudoI).write();
            return ctx.reply(_.ownerModule.sudoUpdate(user.first_name));
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.setSudo = setSudo;
function delSudo(ctx, user) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        let sudo = database_1.db().get('sudos').find({ id: user.id }).value();
        if (!sudo || sudo == undefined) {
            return ctx.reply(_.ownerModule.noSudo(user.first_name));
        }
        database_1.db().get('sudos').remove({ id: user.id }).write();
        return ctx.reply(_.ownerModule.delSudo(user.first_name));
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.delSudo = delSudo;
