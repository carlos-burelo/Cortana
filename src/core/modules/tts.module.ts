import { getTTS } from "../controllers/texttospeach.controller";
import { Telegraf } from "telegraf";

export default function (bot: Telegraf) {
  bot.command("/tts", async (ctx) => {
    if (!ctx.message.reply_to_message) {
      let lang: string = ctx.message.text.split(" ")[1];
      let message: string = ctx.message.text.replace("/tts " + lang, "");
      if (message.length >= 200) {
        ctx.reply("El mensaje supera los 200 caracteres");
        return;
      }
      let speach = await getTTS(message, lang);
      ctx.replyWithVoice(
        { url: speach },
        {
          allow_sending_without_reply: true,
        }
      );
      return;
    } else {
      let { text }: any = ctx.message.reply_to_message;
      let lang = text.split(" ")[1];
      let message: string = ctx.message.text;
      if (message.length >= 200) {
        ctx.reply("El mensaje supera los 200 caracteres");
        return;
      }
      let speach = await getTTS(message, lang);
      ctx.replyWithVoice(
        { url: speach },
        {
          allow_sending_without_reply: true,
        }
      );
      return;
    }
  });
}
