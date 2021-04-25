import { Telegraf } from "telegraf";
import { StickerInterface } from "./models/stickers";

export default function (bot:Telegraf<any>) {
  bot.command("/stickerid", (ctx) => {
    let { sticker }:StickerInterface =ctx.message.reply_to_message
    ctx.replyWithHTML(
      `<code>${sticker.file_id}</code>`
    );
  });
}
