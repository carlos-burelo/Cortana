"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSticker = exports.kangSticker = exports.getCurrency = exports.getIdFromFile = void 0;
const axios_1 = __importDefault(require("axios"));
const path_1 = require("path");
const fs_1 = require("fs");
const config_1 = require("../../config");
const lang_1 = require("../../lang");
const files_1 = require("../libs/files");
const messages_1 = require("../libs/messages");
async function getIdFromFile(ctx) {
    try {
        const _ = lang_1.getLang(ctx.chat);
        let reply = ctx.message.reply_to_message;
        let { content, type } = await messages_1.detectMsgFormat(reply);
        if (type == 'text') {
            return ctx.reply(_.global.errorInFormat);
        }
        let formated = `*Type:* _${type}_\n\n` +
            `*Id:* \`${content}\``;
        return ctx.replyWithMarkdown(formated);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getIdFromFile = getIdFromFile;
;
async function getCurrency(ctx, orig, dest, base) {
    try {
        try {
            const res = await axios_1.default.get(config_1._apis.currency({ orig, dest }));
            let response = res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
            let current_date = Math.round(response * base);
            ctx.replyWithMarkdown(`${base} ${orig} = ${current_date.toString()} ${dest}`, { reply_to_message_id: ctx.message.message_id });
        }
        catch (error) {
            ctx.reply("Datos inconrrectos");
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getCurrency = getCurrency;
;
async function kangSticker(ctx, user, reply, emoji) {
    const { extrasModule: _ } = lang_1.getLang(ctx.chat);
    try {
        let packNumber = 1;
        let packName = `${user.first_name}_v${packNumber}_by_${config_1._bot.username}`;
        let PackTitle = `${user.first_name} Kang Pack V${packNumber}`;
        let fileId = reply.content;
        let maxStickers = 120;
        let existPack;
        let isAnimated = false;
        try {
            let pack = await ctx.getStickerSet(packName);
            if (pack.stickers.length == maxStickers) {
                packName = `${user.first_name}_v${packNumber++}_by_${config_1._bot.username}`;
            }
            else {
                existPack = pack;
            }
        }
        catch (e) {
            existPack = undefined;
        }
        if (reply.is_animated == true) {
            isAnimated = true;
        }
        let fileName;
        let defaultEmoji = '👻';
        if (emoji) {
            defaultEmoji = emoji;
        }
        const { message_id: id } = await ctx.replyWithMarkdown(_[0]);
        let { href: fileUrl } = await ctx.telegram.getFileLink(fileId);
        if (isAnimated == false) {
            fileName = `${user.id}-kangsticker.png`;
        }
        else {
            fileName = `${user.id}-kangsticker.tgs`;
        }
        if (isAnimated == true) {
            return await messages_1.editMessage(ctx, id, _.kangFormatError);
        }
        let fileDir = path_1.resolve(config_1.mainDir, "assets", "downloads", fileName);
        await messages_1.editMessage(ctx, id, _[1]);
        await files_1.downloadFile(fileUrl, fileDir);
        if (reply.type == 'photo') {
            await messages_1.editMessage(ctx, id, _[2]);
            let image = await files_1.resizeImage(fileDir);
            await image.writeAsync(fileDir);
        }
        await messages_1.editMessage(ctx, id, _[3]);
        if (existPack) {
            await ctx.addStickerToSet(packName, {
                png_sticker: { source: fileDir },
                emojis: defaultEmoji
            }).catch(e => {
                return ctx.reply(_.errorAddPack);
            });
        }
        else {
            await ctx.createNewStickerSet(packName, PackTitle, {
                png_sticker: { source: fileDir },
                emojis: defaultEmoji
            }).catch(e => {
                return ctx.reply(_.errorCreatePack);
            });
        }
        fs_1.unlinkSync(fileDir);
        return messages_1.editMessage(ctx, id, _.finish(packName));
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.kangSticker = kangSticker;
;
async function deleteSticker(ctx, id) {
    try {
        const _ = lang_1.getLang(ctx.chat);
        await ctx.deleteStickerFromSet(id);
        return ctx.reply(_.extrasModule.deleteSticker);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.deleteSticker = deleteSticker;
;
