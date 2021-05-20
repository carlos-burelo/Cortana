import {
  add_or_update_note,
  delete_note,
  detect_format,
  FormatI,
  get_note,
  get_notes,
} from "../controllers/notes.controller";
import { Telegraf } from "telegraf";
import { NoteI } from "../interfaces/controllers";

export default function (bot: Telegraf) {
  bot.command("/notes", async (ctx) => {
    let account = ctx.chat;
    const res = await get_notes(ctx, account);
    ctx.replyWithHTML(res);
  });
  bot.command("/get", async (ctx) => {
    let account = ctx.chat;
    let notename = ctx.message.text.split(" ")[1];
    await get_note(ctx, account, notename);
  });
  bot.command(["/add", "/save"], async (ctx) => {
    let account = ctx.chat;

    if (ctx.message.reply_to_message) {
      //Respondiendo al mensaje
      let name = ctx.update.message.text.split(" ")[1];
      let reply_mesage = ctx.update.message.reply_to_message;

      if (name == undefined) {
        ctx.reply("❗ No se detecto un nombre");
        return;
      }
      let resp: FormatI = await detect_format(reply_mesage);
      let note: NoteI = {
        id: name,
        type: resp.tipo,
        content: resp.source,
      };
      const res = await add_or_update_note(ctx, account, note);
      ctx.reply(res);
    }
  });
  bot.command("/del", async (ctx) => {
    let account = ctx.chat;
    let note = ctx.message.text.split(" ")[1];
    ctx.reply(await delete_note(account, note));
  });
}
