import { help_array } from "./components/help.component";
import { help_msg } from "../media/strings";
import { Telegraf } from "telegraf";
import {help_buttons,back_button,} from "../media/buttons";

export default function(bot:Telegraf) {
  
  let modules_array = [];
  help_array.forEach((e) => {
    modules_array.push(e.name);
  });
  bot.command("/help", async(ctx) => {
    let module:any = ctx.update.message.text.split(" ");
    module = module[1];
    if (!module) {
      ctx.reply(help_msg, help_buttons)
    } else {
      const found = help_array.find((m) => m.name == module);
      ctx.reply(`${found.content}`, back_button);
    }
  });
  bot.action(modules_array, (ctx) => {
    let currrentMessage = ctx.update.callback_query.message.message_id;
    ctx.deleteMessage(currrentMessage);
    const module = ctx.match[0];
    const found = help_array.find((m) => m.name == module);
    ctx.reply(`${found.content}`, back_button);
  });
  bot.action("back", (ctx) => {
    let currrentMessage = ctx.update.callback_query.message.message_id;
    ctx.deleteMessage(currrentMessage)
    ctx.reply(help_msg, help_buttons)
  });
}