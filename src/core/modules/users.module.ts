import { getGroupInfo, getInfo } from "../controllers/users.controller";
import { connect, db } from "../../database";
import { Telegraf } from "telegraf";

export default function (bot: Telegraf) {
  bot.command("/info", async (ctx) => {
    if (ctx.chat.type == "private") {
      if (!ctx.message.reply_to_message) {
        ctx.replyWithHTML(await getInfo(await ctx.getChat()));
      } else {
        ctx.replyWithHTML(await getInfo(ctx.message.reply_to_message.from));
      }
    } else {
      if (!ctx.message.reply_to_message) {
        ctx.replyWithHTML(await getGroupInfo(await ctx.getChat()));
      } else {
        ctx.replyWithHTML(await getInfo(ctx.message.reply_to_message.from));
      }
    }
  });
  bot.command("/id", async (ctx) => {
    if (ctx.chat.type == "private") {
      if (!ctx.message.reply_to_message) {
        ctx.replyWithMarkdown(`Tu ID es: \`${ctx.message.from.id}\``);
      } else {
        ctx.replyWithMarkdown(
          `Mi ID es: \`${ctx.message.reply_to_message.from.id}\``
        );
      }
    } else {
      if (!ctx.message.reply_to_message) {
        ctx.replyWithMarkdown(`El ID del grupo es: \`${ctx.chat.id}\``);
      } else {
        let msg = ctx.message.reply_to_message.from;
        ctx.replyWithMarkdown(`El ID de ${msg.first_name} es: \`${msg.id}\``);
      }
    }
  });
}
