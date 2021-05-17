import { get_access } from "../guards/admin.guard";
import { Telegraf } from "telegraf";
import { owner } from "../config";

export default function (bot: Telegraf) {
  bot.command('/ban', async (ctx) => {
    if (!ctx.update.message.reply_to_message) {
      ctx.reply('No detecto al usuario para banear')
    } else {
      try {
        const emisor = await ctx.getChatMember(ctx.update.message.from.id);
        const receptor = await ctx.getChatMember(ctx.update.message.reply_to_message.from.id);
        let operation: string[] = ['banear', 'baneado']
        let { message, status } = await get_access(emisor, receptor, operation)
        if (status == true) {
          try {
            // await ctx.kickChatMember(receptor.user.id);
            ctx.reply('Intento de baneo exitoso')
          } catch (error) {
            ctx.reply('No se pudo banear a '+receptor.user.first_name)
          }
        } else {
          ctx.reply(message)
        }
      } catch (error2) {
        ctx.reply(error2.toString());
        return;
      }
    };

  });
  bot.command('/unban', async (ctx) => {
    if (!ctx.update.message.reply_to_message) {
      ctx.reply('No detecto al usuario para desbanear')
    } else {
      try {
        const emisor = await ctx.getChatMember(ctx.update.message.from.id);
        const receptor = await ctx.getChatMember(ctx.update.message.reply_to_message.from.id);
        let operation: string[] = ['desbanear', 'desbaneado']
        let { message, status } = await get_access(emisor, receptor, operation)
        if (status == true) {
          try {
            // await ctx.kickChatMember(receptor.user.id);
            ctx.reply('Intento de desbaneo exitoso')
          } catch (error) {
            ctx.reply('No se pudo desbanear a '+receptor.user.first_name)
          }
        } else {
          ctx.reply(message)
        }
      } catch (error2) {
        ctx.reply(error2.toString());
        return;
      }
    };

  });
};