import { Telegraf } from "telegraf";

export default function (bot: Telegraf) {
  bot.command("/afk", async (ctx) => {
    ctx.reply("Export * as AfkModule");
  });
}
