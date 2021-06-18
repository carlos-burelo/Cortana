import {
  addOrUpdateNote,
  deleteNote,
  getNote,
  getNotes,
  sendNote,
} from "../controllers/notes.controller";
import { Telegraf } from "telegraf";
import { NoteI } from "../interfaces";
import { getButtonsFromString, textToButtons } from "../libs/detect.buttons";
import { urlButtons } from "../libs/markup.buttons";
import {
  detectMsgFormat,
  parseVars,
} from "../libs/type.detect";
import { Chat } from "telegraf/typings/core/types/typegram";

export default async function (bot: Telegraf) {
  bot.command("/notes", async (ctx) => {
    let account = ctx.chat;
    const res = await getNotes(ctx, account);
    ctx.replyWithHTML(res);
  });
  bot.hears(/#[^\s]+/, async (ctx) => {
    let notename: string = ctx.message.text.replace("#", "");
    await sendNote(ctx, notename)
  });
  bot.command(["/add", "/save"], async (ctx) => {
    if (ctx.message.reply_to_message) {
      let id:string = ctx.message.text.replace(/\/add|\/save/, '').trim().split(' ')[0];
      if(id.length < 1){
        ctx.reply('Ingrese un nombre para la nota');
        return
      } 
      let note:NoteI = await detectMsgFormat(ctx.message.reply_to_message, id);
      await addOrUpdateNote(ctx, note)
    } else {
      let id:string = ctx.message.text.replace(/\/add|\/save/, '').trim().split(' ')[0];
      if(id.length < 1){
        ctx.reply('Ingrese un nombre para la nota');
        return
      };
      let text = ctx.message.text.replace(/\/add|\/save/, '').trim().replace(id, '').trim()
      if(text.length < 1){
        ctx.reply('Ingrese el contenido para la nota');
        return;
      }
      let note:NoteI = {id,text}
      await addOrUpdateNote(ctx, note)
    }
  });
  bot.command("/del", async (ctx) => {
    let account: Chat = ctx.chat;
    let note: string = ctx.message.text.split(" ")[1];
    // ctx.reply(await deleteNote(account, note));
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
