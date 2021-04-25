import { start_msg } from "../media/strings";
import { start_buttons } from "../media/buttons";
import { Telegraf } from "telegraf";

export default function (bot:Telegraf) {
  bot.on('left_chat_member', (ctx)=>{
    ctx.reply('Goodbye')
  });
  bot.on('new_chat_members', (ctx)=>{
    ctx.reply('Wellcome')
  })
}
