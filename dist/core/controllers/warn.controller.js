"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeWarn = exports.getWarnInfo = exports.setWarn = exports.getWarn = void 0;
const config_1 = require("../../config");
const database_1 = require("../../database");
const lang_1 = require("../../lang");
function getWarn(ctx, id) {
    let user = database_1.db(ctx.chat).get("warns").find({ id: id }).value();
    if (!user || user == undefined) {
        return undefined;
    }
    else {
        return user;
    }
}
exports.getWarn = getWarn;
function setWarn(ctx, A, B, reason) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        if (B.status == "creator") {
            return ctx.reply(_.helpers.anyActionCreator("warn"));
        }
        if (B.user.id == config_1._bot.id) {
            return ctx.reply(_.global.preventBot);
        }
        if (B.user.id == config_1._owner.id) {
            return ctx.reply(_.global.preventOwner);
        }
        if (A.status == "member" && B.status == "administrator") {
            return ctx.reply(_.helpers.memberActionAdmin("warn"));
        }
        let user = getWarn(ctx, B.user.id);
        if (user !== undefined) {
            if (user.count < 2) {
                database_1.db(ctx.chat)
                    .get("warns")
                    .find({ id: user.id })
                    .assign({ count: user.count + 1 })
                    .write();
                database_1.db(ctx.chat)
                    .get("warns")
                    .find({ id: user.id })
                    .get("reasons")
                    .push(reason)
                    .write();
                return ctx.reply("Ultima advertencia");
            }
            if (user.count == 2) {
                return ctx.reply("Por ahora no puedo banear, por ahora...");
            }
        }
        else {
            let warnedUser = {
                id: B.user.id,
                count: 1,
                username: B.user.username,
                first_name: B.user.first_name,
                reasons: [reason],
            };
            database_1.db(ctx.chat).get("warns").push(warnedUser).write();
            return ctx.reply("Primera advertencia");
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.setWarn = setWarn;
function getWarnInfo(ctx, B) {
    const _ = lang_1.getLang(ctx.chat);
    let user = getWarn(ctx, B.id);
    if (user !== undefined) {
        let text = _.warnModule.warnInfo(user);
        user.reasons.map((r, i) => (text += `<b>${i + 1}</b> - ${r}\n`));
        return ctx.replyWithHTML(text);
    }
    else {
        return ctx.reply(_.warnModule.noWarns(B.user.first_name));
    }
}
exports.getWarnInfo = getWarnInfo;
function removeWarn(ctx, A, B) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        if (A.status == "member") {
            return ctx.reply(_.global.permissionsDenied);
        }
        let user = getWarn(ctx, B.user.id);
        if (user !== undefined) {
            if (user.count == 1) {
                database_1.db(ctx.chat).get("warns").remove({ id: user.id }).write();
                return ctx.reply(_.warnModule.allWarnsRemoved);
            }
            else {
                database_1.db(ctx.chat)
                    .get("warns")
                    .find({ id: user.id })
                    .assign({ count: user.count - 1 })
                    .write();
                return ctx.reply(_.warnModule.warnRemoved);
            }
        }
        else {
            return ctx.reply(_.warnModule.noWarns(B.user.first_name));
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.removeWarn = removeWarn;
