import { mdhelp_string, mdhelp_text } from "../media/strings";
import { Telegraf } from "telegraf";
import { array_lolis } from "../media/stickers";

export default function (bot:Telegraf) {
  bot.command("/mdhelp", async (ctx) => {
    await ctx.reply(mdhelp_string);
    ctx.reply(mdhelp_text);
  });
  bot.command('/loli', (ctx) => {
    ctx.replyWithSticker(array_lolis[Math.floor(Math.random()*array_lolis.length)])
  });
}