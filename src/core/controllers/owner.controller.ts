import { Context } from "telegraf";
import { _owner } from "../../config";
import { db, getDatabases } from "../../database";
import { getLang } from "../../lang";
import { ChatUserI, DatabaseI, SudoI } from "../interfaces";
import { detectMsgFormat, sendMsg } from "../libs/messages";
import { isSudo } from "../libs/validators";

export async function sendMessageTo(ctx: Context, user: ChatUserI, msg: any, id: number) {
    try {
        if (user.id == _owner.id) {
            let message = await detectMsgFormat(msg);
            await sendMsg(ctx, message, id);
        }
        if (isSudo(user.id)) {
            let message = await detectMsgFormat(msg);
            await sendMsg(ctx, message, id);
        }
    } catch (error) {
        ctx.reply(error.toString())
    }
};

export async function getGroups(ctx: Context, id: number) {
    try {
        if (id == _owner.id || isSudo(id)) {
            let dbs: DatabaseI[] = getDatabases();
            let text = '<b>Groups in db</b>\n\n';

            await Promise.all(dbs.map(async db => {
                    let group: any = await ctx.telegram.getChat(db.id);
                    text += `<b>Id:</b>  <code>${group.id}</code>\n`
                    text += `<b>title:</b>  <b>${group.title}</b>\n`
                    if (!group.username) {
                        text += `<b>Invite link:</b>  <a href="${group.invite_link}">@${group.title}</a>\n\n`
                    } else {
                        text += `<b>Account:</b>  <b>@${group.username}</b>\n\n`
                    }
                    
            }))
            return await ctx.replyWithHTML(text)
            
        }
        
    } catch (error) {
        ctx.reply(error.toString())
    }
};

export function getSudos(ctx:Context) {
    const _ = getLang(ctx.chat)
    try {
        let sudos = db().get('sudos').value();
        if(sudos.length == 0){
            return ctx.reply(_.ownerModule.noSudos)
        }
        let text:string = '<b>Sudos</b>\n\n';
        sudos.map(a=>{
            text += `<b>id:</b><code>${a.id}</code>\n`
            text += `<b>Name:</b><i>${a.first_name}</i>\n`
            text += `<b>Username:</b><i>@${a.username}</i>\n`
            text += `<b>Role:</b><i>${a.role}</i>\n\n`
        })
        return ctx.replyWithHTML(text)
    } catch (error) {
        ctx.reply(error.toString())
    }
}
export function setSudo(ctx: Context, user:ChatUserI, role:string) {
    const _ = getLang(ctx.chat)
    try {
        let sudo = db().get('sudos').find({id: user.id}).value()
        let sudoI:SudoI={
            id:user.id,
            first_name: user.first_name,
            role: role,
            username: user.username
        }
        if(!sudo || sudo == undefined){
            db().get('sudos').push(sudoI).write()
            return ctx.reply(_.ownerModule.sudoAdd(user.first_name))
        } else{
            db().get('sudos').find({id: sudo.id}).assign(sudoI).write()
            return ctx.reply(_.ownerModule.sudoUpdate(user.first_name))
        }
    } catch (error) {
        ctx.reply(error.toString())
    }
}
export function delSudo(ctx: Context, user:ChatUserI) {
    const _ = getLang(ctx.chat)
    try {
        let sudo = db().get('sudos').find({id: user.id}).value()
        if(!sudo || sudo == undefined){
            return ctx.reply(_.ownerModule.noSudo(user.first_name))
        }
        db().get('sudos').remove({id: user.id}).write()
        return ctx.reply(_.ownerModule.delSudo(user.first_name))
    } catch (error) {
        ctx.reply(error.toString())
    }
}