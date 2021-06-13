import translate from "@vitalets/google-translate-api";
import { Telegraf } from "telegraf";

export default function (bot: Telegraf) {
  bot.command("/tr", async (ctx) => {
    if (ctx.update.message.reply_to_message) {
      let context: string = ctx.message.text
        .replace("/tr", "")
        .replace(" ", "");
      let lang = context.split(" ")[0];
      let { text }: any = ctx.update.message.reply_to_message;
      const { text: text_tr } = await translate(text, { to: lang });
      const { message_id } = ctx.message;
      if (text_tr.length !== 0) {
        ctx.reply(text_tr, { reply_to_message_id: message_id });
        return;
      } else {
        ctx.reply("La traduccion ha fallado", {
          reply_to_message_id: message_id,
        });
        return;
      }
    } else {
      let context: string = ctx.message.text
        .replace("/tr", "")
        .replace(" ", "");
      let lang: string = context.split(" ")[0];
      let langs: string[] = ["en", "es"];
      if (langs.includes(lang) == false) {
        ctx.reply("Codigo de idioma inconrrecto");
        return;
      }
      let txt: string = context.replace(lang, "").replace(" ", "");
      try {
        const { text } = await translate(txt, { to: lang || "es" });
        ctx.reply(text);
      } catch (e) {
        ctx.reply("Codigo de idioma inconrrecto");
      }
    }
  });
}
