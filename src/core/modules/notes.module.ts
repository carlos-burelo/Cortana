import {
  getOrUpdateNote,
  deleteNote,
  getNote,
  getNotes,
} from "../controllers/notes.controller";
import { Telegraf } from "telegraf";
import { NoteI } from "../interfaces/index";
import { getButtonsFromString, textToButtons } from "../libs/detect.buttons";
import { urlButtons } from "../libs/markup.buttons";
import { detectFormat, FormatI, parseVars } from "../libs/type.detect";
import { Chat, ReplyMessage } from "telegraf/typings/core/types/typegram";

export default async function (bot: Telegraf) {
  bot.command("/notes", async (ctx) => {
    let account = ctx.chat;
    const res = await getNotes(ctx, account);
    ctx.replyWithHTML(res);
  });
  bot.hears(/#[^\s]+/, async (ctx) => {
    let notename: string = ctx.message.text.replace("#", "");
    let account: Chat = ctx.chat;
    await getNote(ctx, account, notename);
  });
  bot.command(["/add", "/save"], async (ctx) => {
    let account: Chat = ctx.chat;
    if (ctx.message.reply_to_message) {
      let name: string = ctx.update.message.text.split(" ")[1];
      if (name == undefined) {
        ctx.reply("Escriba un nombre para la nota");
        return;
      }
      let reply_mesage: ReplyMessage = ctx.update.message.reply_to_message;
      let resp: FormatI = await detectFormat(reply_mesage);
      let note: NoteI = {
        id: name,
        type: resp.type,
        content: resp.source,
      };
      const res = await getOrUpdateNote(ctx, account, note);
      ctx.reply(res);
    } else {
      let name: string = ctx.update.message.text.split(" ")[1];
    }
  });
  bot.command("/del", async (ctx) => {
    let account: Chat = ctx.chat;
    let note: string = ctx.message.text.split(" ")[1];
    ctx.reply(await deleteNote(account, note));
  });
  bot.command("/n", async (ctx) => {
    let text: string = ctx.message.text;
    let { buttons, found } = await getButtonsFromString(text);
    text = text.replace("/n", "");
    buttons.forEach((a) => {
      text = text.replace(`[${a}]`, "");
    });
    if (found == true) {
      let btns = await textToButtons(buttons);
      if (btns.length == 0) {
        ctx.replyWithMarkdown("*Error:* Urls invalidas");
        return;
      }
      let b = await urlButtons(btns, 1);
      let buttons_keyboard = b.reply_markup.inline_keyboard;
      ctx.replyWithMarkdown(text, {
        disable_web_page_preview: true,
        reply_markup: { inline_keyboard: buttons_keyboard },
      });
    }
  });
  bot.command("/x", async (ctx) => {
    let text = `{first_name}, {username}, {id} {last_name}`;
    await parseVars(ctx.message.from, text);
  });
  bot.command("/y", async (ctx) => {
    let text = ctx.message.text;
    console.log(text.replace(/\/y /g, "replaced"));
  });
}
