"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBanMessage = exports.setUnBan = exports.setBan = exports.decideUnBan = exports.decideBan = void 0;
const config_1 = require("../../config");
const lang_1 = require("../../lang");
const validators_1 = require("../libs/validators");
const database_1 = require("../../database");
async function decideBan(ctx, emit, recep) {
    try {
        const _ = lang_1.getLang(ctx.chat);
        if (recep.user.id == config_1._bot.id) {
            return ctx.reply(_.global.preventBot);
        }
        if (recep.user.id == config_1._owner.id && emit.user.id == config_1._owner.id) {
            return ctx.reply(_.global.preventOwner);
        }
        if (recep.user.id == config_1._owner.id) {
            return ctx.reply(_.global.permissionsDenied);
        }
        if (emit.status !== "creator" && recep.status == "creator") {
            return ctx.reply(_.global.permissionsDenied);
        }
        if (emit.user.id !== config_1._owner.id && recep.user.id == config_1._bot.id) {
            return ctx.reply(_.global.permissionsDenied);
        }
        if (emit.user.id == config_1._owner.id) {
            await setBan(ctx, emit, recep);
        }
        if (validators_1.isSudo(recep.user.id)) {
            return ctx.reply(_.global.preventSudo(recep.user.first_name));
        }
        if (emit.user.id == recep.user.id) {
            return ctx.reply(_.helpers.noYourAutoAction("ban"));
        }
        if (emit.status == "member" && recep.status == "administrator") {
            return ctx.reply(_.helpers.memberActionAdmin("ban"));
        }
        if (emit.status == "administrator" && recep.status == "administrator") {
            return ctx.reply(_.helpers.adminActionAdmin("ban"));
        }
        if (emit.status == "administrator" && recep.status == "creator") {
            return ctx.reply(_.helpers.anyActionCreator("ban"));
        }
        if (emit.status == "member" && recep.status == "creator") {
            return ctx.reply(_.helpers.anyActionCreator("ban"));
        }
        await setBan(ctx, emit, recep);
    }
    catch (error) {
        return ctx.reply(error.toString());
    }
}
exports.decideBan = decideBan;
async function decideUnBan(ctx, emit, recep) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        if (recep.user.id == config_1._bot.id) {
            return ctx.reply(_.global.preventBot);
        }
        if (recep.user.id == config_1._owner.id) {
            return ctx.reply(_.global.preventOwner);
        }
        if (emit.user.id == config_1._owner.id) {
            await setUnBan(ctx, emit, recep);
        }
        if (emit.status == "member") {
            return ctx.reply(_.global.permissionsDenied);
        }
        await setUnBan(ctx, emit, recep);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.decideUnBan = decideUnBan;
async function setBan(ctx, A, B) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        await ctx.kickChatMember(B.user.id);
        return ctx.reply(_.helpers.anyActionSucces("banned", A.user.first_name, B.user.first_name));
    }
    catch (error) {
        return ctx.reply(error.toString());
    }
}
exports.setBan = setBan;
async function setUnBan(ctx, A, B) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        await ctx.unbanChatMember(B.user.id, {
            only_if_banned: true,
        });
        return ctx.reply(_.banModule.unBanSuccess);
    }
    catch (error) {
        return ctx.reply(error.toString());
    }
}
exports.setUnBan = setUnBan;
async function setBanMessage(ctx, message) {
    try {
        const { banModule: _ } = lang_1.getLang(ctx.chat);
        database_1.db(ctx.chat).get(`prefs`).unset("banPrefs").write();
        database_1.db(ctx.chat).get("prefs").assign({ banPrefs: message }).write();
        return ctx.reply(_.setBanSuccess);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.setBanMessage = setBanMessage;
