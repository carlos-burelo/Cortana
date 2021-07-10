import { Context } from "telegraf";
import { ChatMember } from "typegram";
import { _bot, _owner } from "../../config";
import { getLang } from "../../lang";
import { ChatUserI } from "../interfaces";
import { generateLog } from "../libs/messages";
import { isSudo } from "../libs/validators";

export function setMute(ctx:Context, A:ChatMember,B:ChatMember, args?:string) {
    try {
        const _ = getLang(ctx.chat);
		if (B.user.id == _bot.id) {
			return ctx.reply(_.helpers.noAutoAction("mute"));
		}
		if (B.status == "creator") {
			return ctx.reply(_.helpers.anyActionCreator("mute"));
		}
		if (A.user.id == _owner.id) {
            if(!args){
                args = '$messages';
            }
            return muteUser(ctx, B.user, args)
		}
		if (isSudo(B.user.id)) {
			return ctx.reply(_.global.preventSudo(B.user.first_name));
		}
		if (A.user.id == A.user.id) {
			return ctx.reply(_.helpers.noYourAutoAction("mute"));
		}
		if (A.status == "member" && B.status == "administrator") {
			return ctx.reply(_.helpers.memberActionAdmin("mute"));
		}
		if (A.status == "administrator" && B.status == "administrator") {
			return ctx.reply(_.helpers.adminActionAdmin("mute"));
		}
        if(!args){
            args = '$messages';
            return muteUser(ctx, B.user, args)
        }
    } catch (error) {
        const [, l, c] = error.stack.match(/(\d+):(\d+)/);
        generateLog(ctx, error, [l, c], "setMute", __filename);
    }
}
export function decideUnmute(ctx:Context, A:ChatMember,B:ChatMember, args?:string) {
    try {
        const _ = getLang(ctx.chat)
        if (B.user.id == _bot.id) {
            return ctx.reply(_.global.preventBot);
        }
        if (B.user.id == _owner.id) {
            return ctx.reply(_.global.preventOwner);
        }
        if (A.user.id == _owner.id) {
            unMuteUser(ctx, B.user, args)
        }
        if (A.status == "member") {
            return ctx.reply(_.global.permissionsDenied);
        }
        unMuteUser(ctx, B.user, args)
    } catch (error) {
        const [, l, c] = error.stack.match(/(\d+):(\d+)/);
        generateLog(ctx, error, [l, c], "decideUnmute", __filename);
    }
}
export function argEvalue(ctx:Context, arg:string, v:boolean) {
    try {
        switch (arg) {
            case '$all':
            return {
                can_change_info: v,
                can_delete_messages: v,
                can_invite_users: v,
                can_pin_messages: v,
                can_promote_members: v,
                can_restrict_members: v,
                can_manage_chat: v,
            }
            case '$messages':
                return {can_send_messages:v}
            case '$media':
                return {can_send_media_messages:v}
            case '$pin':
               return {can_pin_messages:v}
            default:
                return {can_send_messages:v}
        }
    } catch (error) {
        const [, l, c] = error.stack.match(/(\d+):(\d+)/);
        generateLog(ctx, error, [l, c], "argEvalue", __filename);
    }
}


export function muteUser(ctx:Context,user:ChatUserI, args:string) {
    try {
        let perms = argEvalue(ctx,args,false)
        ctx.restrictChatMember(user.id, {permissions:perms})
    } catch (error) {
        const [, l, c] = error.stack.match(/(\d+):(\d+)/);
        generateLog(ctx, error, [l, c], "muteUser", __filename);
    }
}
export function unMuteUser(ctx:Context,user:ChatUserI, args:string) {
    try {
        let perms = argEvalue(ctx,args, true)
        console.log(perms)
        ctx.restrictChatMember(user.id, {permissions:perms})
    } catch (error) {
        const [, l, c] = error.stack.match(/(\d+):(\d+)/);
        generateLog(ctx, error, [l, c], "muteUser", __filename);
    }
}