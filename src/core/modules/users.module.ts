import { getGroupInfo, getInfo } from "../controllers/users.controller";
import { Telegraf } from "telegraf";
import { editMessage } from "../libs/messages";
import { getLang } from "../../lang";

export default function (bot: Telegraf) {
  bot.command("/info", async (ctx) => {
    if (ctx.chat.type == "private") {
      if (!ctx.message.reply_to_message) {
        ctx.replyWithHTML(getInfo(ctx,await ctx.getChat()));
      } else {
        ctx.replyWithHTML(getInfo(ctx,ctx.message.reply_to_message.from));
      }
    } else {
      if (!ctx.message.reply_to_message) {
        ctx.replyWithHTML(getGroupInfo(ctx,await ctx.getChat()));
      } else {
        ctx.replyWithHTML(getInfo(ctx,ctx.message.reply_to_message.from));
      }
    }
  });
  bot.command("/id", async (ctx) => {
      const {usersModule:_} = getLang(ctx.chat)
    if (ctx.chat.type == "private") {
      if (!ctx.message.reply_to_message) {
        ctx.replyWithMarkdown(_.youId(ctx.message.from.id));
      } else {
        ctx.replyWithMarkdown(_.myId(ctx.message.reply_to_message.from.id));
      }
    } else {
      if (!ctx.message.reply_to_message) {
        ctx.replyWithMarkdown(_.groupId(ctx.chat.id));
      } else {
        let msg = ctx.message.reply_to_message.from;
        ctx.replyWithMarkdown(_.yourId(msg.first_name, msg.id));
      }
    }
  });
}
