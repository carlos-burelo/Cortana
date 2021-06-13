import { getAccess } from "../guards/admin.guard";
import { Telegraf } from "telegraf";
import { ChatMember } from "telegraf/typings/core/types/typegram";

export default function (bot: Telegraf) {
  bot.command("/ban", async (ctx) => {
    if (!ctx.update.message.reply_to_message) {
      ctx.reply("No detecto al usuario para banear");
    } else {
      try {
        const emisor: ChatMember = await ctx.getChatMember(
          ctx.update.message.from.id
        );
        const receptor: ChatMember = await ctx.getChatMember(
          ctx.update.message.reply_to_message.from.id
        );
        let operation: string[] = ["banear", "baneado"];
        let { message, status } = await getAccess(emisor, receptor, operation);
        if (status == true) {
          try {
            ctx.kickChatMember(receptor.user.id);
            ctx.reply(message);
          } catch (error) {
            ctx.reply("No se pudo banear a " + receptor.user.first_name);
          }
        } else {
          ctx.reply(message);
        }
      } catch (error2) {
        ctx.reply(error2.toString());
        return;
      }
    }
  });
  bot.command("/unban", async (ctx) => {
    if (!ctx.update.message.reply_to_message) {
      ctx.reply("No detecto al usuario para desbanear");
    } else {
      try {
        const emisor: ChatMember = await ctx.getChatMember(
          ctx.update.message.from.id
        );
        const receptor: ChatMember = await ctx.getChatMember(
          ctx.update.message.reply_to_message.from.id
        );
        let operation: string[] = ["desbanear", "desbaneado"];
        let { message, status } = await getAccess(emisor, receptor, operation);
        if (status == true) {
          try {
            ctx.unbanChatMember(receptor.user.id, { only_if_banned: true });
            ctx.reply(message);
          } catch (error) {
            ctx.reply("No se pudo desbanear a " + receptor.user.first_name);
          }
        } else {
          ctx.reply(message);
        }
      } catch (error2) {
        ctx.reply(error2.toString());
        return;
      }
    }
  });
}
