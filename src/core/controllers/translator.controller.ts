import translate from "@vitalets/google-translate-api";
import { Context } from "telegraf";

export async function translateText(ctx:Context ,lang:string, txt:string) {
    try {
        const { text } = await translate(txt, { to: lang });
        return ctx.reply(text, {reply_to_message_id: ctx.message.message_id})
    } catch (error) {
        ctx.reply(error.toString())
    }
};