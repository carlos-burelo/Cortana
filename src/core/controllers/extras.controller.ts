import axios from "axios";
import { resolve } from "path";
import { unlinkSync } from "fs";
import { Context } from "telegraf";
import { StickerSet } from "telegraf/typings/core/types/typegram";
import { mainDir, _apis, _bot } from "../../config";
import { getLang } from "../../lang";
import { ChatUserI, NoteI } from "../interfaces";
import { downloadFile, resizeImage } from "../libs/files";
import { detectMsgFormat, editMessage } from "../libs/messages";

export async function getIdFromFile(ctx:Context|any) {
    try {
        const _ = getLang(ctx.chat)
        let reply = ctx.message.reply_to_message;
        let { content, type } = await detectMsgFormat(reply);
        if(type == 'text'){
            return ctx.reply(_.global.errorInFormat)
        }
        let formated: string =
          `*Type:* _${type}_\n\n` + 
          `*Id:* \`${content}\``;
        return ctx.replyWithMarkdown(formated);
    } catch (error) {
        ctx.reply(error.toString())
    }
};

export async function getCurrency(ctx:Context, orig:string, dest:string, base:number) {
    try {
        try {
            const res = await axios.get(_apis.currency({orig,dest}));
            let response: number = res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
            let current_date: number = Math.round(response * base);
            ctx.replyWithMarkdown(
              `${base} ${orig} = ${current_date.toString()} ${dest}`,
              { reply_to_message_id: ctx.message.message_id }
            );
          } catch (error) {
            ctx.reply("Datos inconrrectos");
          }
    } catch (error) {
        ctx.reply(error.toString())
    }
};

export async function kangSticker(ctx:Context, user:ChatUserI, reply:NoteI, emoji?:string) {
    const {extrasModule:_} = getLang(ctx.chat)
    try {
        let packNumber:number = 1;
        let packName: string = `${user.first_name}_v${packNumber}_by_${_bot.username}`;
        let PackTitle = `${user.first_name} Kang Pack V${packNumber}`
        let fileId:string = reply.content;
        let maxStickers = 120;
        let existPack:StickerSet;
        let isAnimated:boolean = false;
        try {
            let pack = await ctx.getStickerSet(packName);
            if(pack.stickers.length == maxStickers){
                packName = `${user.first_name}_v${packNumber++}_by_${_bot.username}`;
            } else {
                existPack = pack
            }
        } catch (e) {
            existPack = undefined
        }
        if(reply.is_animated == true){
            isAnimated = true;
        }
        let fileName:string;
        let defaultEmoji:string = '👻';
        if(emoji){
            defaultEmoji = emoji
        }
        const { message_id:id} = await ctx.replyWithMarkdown(_[0])
        let {href:fileUrl}:URL = await ctx.telegram.getFileLink(fileId);
        if(isAnimated == false){
            fileName = `${user.id}-kangsticker.png`;
        } else {
            fileName = `${user.id}-kangsticker.tgs`;
        }
        if(isAnimated == true){
            return await editMessage(ctx, id, _.kangFormatError);
        }
        let fileDir: string = resolve(
            mainDir,
            "assets",
            "downloads",
            fileName
          );
        await editMessage(ctx, id, _[1])
        await downloadFile(fileUrl, fileDir);
        if(reply.type == 'photo'){
            await editMessage(ctx, id, _[2])
            let image = await resizeImage(fileDir);
            await image.writeAsync(fileDir)
        }
        await editMessage(ctx, id, _[3])
        if(existPack){
            await ctx.addStickerToSet(packName, {
                png_sticker: {source: fileDir},
                emojis: defaultEmoji
            }).catch(e=>{
                return ctx.reply(_.errorAddPack);
            })
        } else {
            await ctx.createNewStickerSet(packName, PackTitle, {
                png_sticker: {source: fileDir},
                emojis: defaultEmoji
            }).catch(e=>{
                return ctx.reply(_.errorCreatePack);
            })
        }
        unlinkSync(fileDir);
        return editMessage(ctx, id, _.finish(packName))
    } catch (error) {
        ctx.reply(error.toString())
    }
};

export async function deleteSticker(ctx:Context, id:string) {
    try {
        const _ = getLang(ctx.chat)
        await ctx.deleteStickerFromSet(id);
        return ctx.reply(_.extrasModule.deleteSticker)
    } catch (error) {
        ctx.reply(error.toString())
    }
};