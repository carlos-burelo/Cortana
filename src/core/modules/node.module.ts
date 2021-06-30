import { Telegraf } from "telegraf";
import os from "os";

export default function (bot: Telegraf) {
  bot.command("/os", async (ctx) => {
    ctx.replyWithHTML(
      `<b>Platform:</b>  <i>${os.platform()}</i>\n` +
        `<b>Type:</b>  <i>${os.type()}</i>\n` +
        `<b>Arch:</b>  <i>${os.arch()}</i>\n` +
        `<b>Release:</b>  <i>${os.release()}</i>\n` +
        `<b>Total Memory</b>  <i>${Math.round(
          os.totalmem() / 1024 / 1024 / 1024
        ).toString()} GB</i>\n` +
        `<b>Username:</b>  <i>${os.userInfo().username}</i>\n`
    );
  });
}
