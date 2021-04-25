import { Telegraf } from "telegraf";
import { owner } from "../config";
import { ownerAlert } from "../media/stickers";

export default function(bot:Telegraf) {
  bot.command('/ban', async(ctx) => {
    if (!ctx.update.message.reply_to_message) {
      ctx.reply('No detecto al usuario para banear')
    } else {
      try {
        let userIdA = ctx.update.message.from.id
        let userIdB = ctx.update.message.reply_to_message.from.id
        const userA = await ctx.getChatMember(userIdA);
        const userB = await ctx.getChatMember(userIdB);
        if (userA.status == 'member' && userB.status == 'administrator') {
          ctx.reply('Un miembro no puede banear a un administrador');
          return;
        };
        if (userA.status == 'administrator' && userB.status == 'administrator') {
          ctx.reply('Un administrador no puede banear a otro administrador');
          return;
        };
        if (userA.status == 'member' || userA.status == 'administrator' && userB.status == 'creator') {
          ctx.replyWithSticker(ownerAlert);
          return;
        };
        if (owner.id == userB.user.id) {
          ctx.replyWithSticker(ownerAlert)
          return;
        }
        if (userA.status == 'administrator' && userB.status == 'member') {
          ctx.reply('Administrador puede banear a miembro');
          const res = await ctx.kickChatMember(userB.user.id);
          if(res == true){
            let User = userB.user
            ctx.reply(`${User.first_name} ha sido baneado.`);
            return;
          } else {
            ctx.reply(`No se pudo banear a ${userA.user.first_name}`);
            return;
          }
        };
      } catch (error2) {
        ctx.reply('try catch error');
        return;
      }
    };

  });
};