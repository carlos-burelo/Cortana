import { HelpI } from "core/interfaces";
import { Markup, Telegraf } from "telegraf";
import { help_array } from "../components/help.component";
import { callbackButtons } from "../libs/markup.buttons";
import { help_msg, mdhelp_string, mdhelp_text } from "../shared/strings";

export default function (bot: Telegraf) {
  bot.command("/help", async (ctx) => {
    let sorts_buttons: HelpI[] = help_array.sort((a, b) =>
      a.text.localeCompare(b.text)
    );
    let extra = callbackButtons(sorts_buttons, 3);
    ctx.replyWithMarkdown(help_msg, extra);
  });
  let modules_array = [];
  help_array.forEach((e) => {
    modules_array.push(e.callback);
  });
  bot.action(modules_array, async (ctx) => {
    let currrentMessage: number = ctx.update.callback_query.message.message_id;
    ctx.deleteMessage(currrentMessage);
    const module: string = ctx.match[0];
    const found: HelpI = help_array.find((m) => m.callback == module);
    let back_button = Markup.inlineKeyboard([
      Markup.button.callback("Atras", "back"),
    ]);
    ctx.reply(`${found.content}`, back_button);
  });
  bot.action("back", async (ctx) => {
    let currrentMessage: number = ctx.update.callback_query.message.message_id;
    ctx.deleteMessage(currrentMessage);
    let extra = callbackButtons(help_array, 3);
    ctx.replyWithMarkdown(help_msg, extra);
  });
  bot.command("/mdhelp", async (ctx) => {
    ctx.replyWithMarkdown(mdhelp_string);
    ctx.reply(mdhelp_text);
  });
}
