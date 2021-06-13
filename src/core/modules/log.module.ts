import { Telegraf } from "telegraf";

export default function (bot: Telegraf) {
  bot.command("/log", async (ctx) => {
    ctx.telegram.sendMessage("@cortanalog", "hola");
  });
}
