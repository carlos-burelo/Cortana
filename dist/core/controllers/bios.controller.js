"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delBio = exports.updateBio = exports.setBio = exports.decideBio = exports.getBio = void 0;
const config_1 = require("../../config");
const database_1 = require("../../database");
const lang_1 = require("../../lang");
async function getBio(ctx, B) {
    try {
        const _ = lang_1.getLang(ctx.chat);
        if (database_1.db(ctx.chat).get("bios").find({ id: B.id }).value() == undefined) {
            return ctx.reply(_.bioModule.notFound(B.first_name));
        }
        else {
            let i = database_1.db(ctx.chat).get("bios").find({ id: B.id }).value();
            return ctx.reply(`${i.first_name}:\n${i.bio}`, {
                parse_mode: "Markdown",
            });
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getBio = getBio;
async function decideBio(ctx, A, B, Bio) {
    try {
        const _ = lang_1.getLang(ctx.chat);
        if (A.status == "member") {
            return ctx.reply(_.global.permissionsDenied);
        }
        if (B.user.id == config_1._owner.id) {
            return ctx.reply(_.global.permissionsDenied);
        }
        if (A.user.id !== config_1._owner.id && B.user.id == config_1._bot.id) {
            return ctx.reply(_.global.permissionsDenied);
        }
        let id = Bio.id;
        if (database_1.db(ctx.chat).get("bios").find({ id: id }).value() == undefined) {
            await setBio(ctx, Bio);
        }
        else {
            await updateBio(ctx, Bio);
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.decideBio = decideBio;
async function setBio(ctx, Bio) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        database_1.db(ctx.chat).get("bios").push(Bio).write();
        return ctx.reply(_.bioModule.setBioSuccess);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.setBio = setBio;
async function updateBio(ctx, Bio) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        database_1.db(ctx.chat).get("bios").find({ id: Bio.id }).assign(Bio).write();
        return ctx.reply(_.bioModule.updateBioSuccess);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.updateBio = updateBio;
async function delBio(ctx, A, B) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        if (A.status == "member") {
            return ctx.reply(_.global.permissionsDenied);
        }
        let i = database_1.db(ctx.chat).get("bios").find({ id: B.user.id }).value();
        if (i == undefined) {
            return ctx.reply(_.bioModule.notFound(B.user.first_name));
        }
        database_1.db(ctx.chat).get("bios").remove({ id: B.user.id }).write();
        return ctx.reply(_.bioModule.deleteBioSuccess);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.delBio = delBio;
