import { help_array } from "../components/help.component";
import { help_msg } from "../shared/strings";
import { Markup, Telegraf } from "telegraf";
import { callback_buttons } from "../libs/markup.buttons";

export default function (bot: Telegraf) {
  bot.command('/help', async (ctx) => {
    let sorts_buttons = help_array.sort((a, b) => a.text.localeCompare(b.text))
    let extra = callback_buttons(sorts_buttons, 3)
    ctx.replyWithMarkdown(help_msg, extra);
  });
  let modules_array = [];
  help_array.forEach((e) => {
    modules_array.push(e.callback);
  });
  bot.action(modules_array, async (ctx) => {
    let currrentMessage = ctx.update.callback_query.message.message_id;
    ctx.deleteMessage(currrentMessage);
    const module = ctx.match[0];
    const found = help_array.find((m) => m.callback == module);
    let back_button = Markup.inlineKeyboard([Markup.button.callback("Atras", "back")]);
    ctx.reply(`${found.content}`, back_button);

  });
  bot.action("back", async (ctx) => {
    let currrentMessage = ctx.update.callback_query.message.message_id;
    ctx.deleteMessage(currrentMessage)
    let extra = callback_buttons(help_array, 3)
    ctx.replyWithMarkdown(help_msg, extra);
  });
}