import { Telegraf } from "telegraf";
import {
    greetingStatus,
    sendGreetings,
  setGreetins,
  welcomeOwner,
} from "../controllers/welcome.controller";
import { _owner, _bot } from "../../config";
import { ChatUserI } from "../interfaces";
import { getLang } from "../../lang";
import { detectMsgFormat } from "../libs/messages";

export default function (bot: Telegraf) {
  bot.on("new_chat_members", async (ctx) => {
    let {message:{new_chat_member:member}}:ChatUserI|any = ctx.update
    if(member.id == _owner.id){
        return welcomeOwner(ctx, _owner)
    }
    return sendGreetings(ctx, member, 'welcome')
  });
  bot.command('/welcome', async (ctx) => {
      const _ = getLang(ctx.chat)
      if(ctx.chat.type == 'private'){
        return ctx.reply(_.global.noPrivateChats)
      }
      let msg = ctx.message.text.replace(/\/welcome/, '').trim()
      if(msg == 'on'){ return greetingStatus(ctx, true, 'welcome')}
      if(msg == 'off'){ return greetingStatus(ctx, false, 'welcome')}
      if(ctx.message.reply_to_message){
          let reply = ctx.message.reply_to_message
          let msg = await detectMsgFormat(reply);
        return setGreetins(ctx, msg, 'welcome')
      }
  });
  bot.on("left_chat_member", async (ctx) => {
    let {message:{left_chat_member:member}}:ChatUserI|any = ctx.update
    return sendGreetings(ctx, member, 'goodbye')
  });
  bot.command('/goodbye', async (ctx) => {
      const _ = getLang(ctx.chat)
      if(ctx.chat.type == 'private'){
        return ctx.reply(_.global.noPrivateChats)
      }
      let msg = ctx.message.text.replace(/\/goodbye/, '').trim()
      if(msg == 'on'){ return greetingStatus(ctx, true, 'goodbye')}
      if(msg == 'off'){ return greetingStatus(ctx, false, 'goodbye')}
      if(ctx.message.reply_to_message){
          let reply = ctx.message.reply_to_message
          let msg = await detectMsgFormat(reply);
        return setGreetins(ctx, msg, 'goodbye')
      }
  });
}
