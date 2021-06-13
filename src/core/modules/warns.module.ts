import { Telegraf } from "telegraf";

export default function (bot: Telegraf) {
  let filtro: string[] = ["word 1"];

  bot.hears(filtro, async (ctx) => {
    ctx.replyWithSticker(
      "CAACAgEAAxkBAAISNmDChOUmIVdQnarRIPclYvOT7VzLAAIhAQACL_4BRIOqrk_TSuX7HwQ"
    );
    ctx.reply("Advertencia, palabra bloqueada");
  });
}
