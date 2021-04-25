import { Telegraf } from "telegraf";
import { botConfig, owner } from "../config";
import { ownerAlert } from "../media/stickers";
import { chatInterface } from "./models/chat";

export default function(bot: Telegraf<any>) {
  bot.command("/adminlist", async(ctx) => {
    if (ctx.update.message.chat.type == "supergroup") {
      let admins = await ctx.getChatAdministrators();
      let adminlist = [];
      admins.forEach(a => {
        let admin = {
          name: a.user.first_name,
          status: a.status
        };
        adminlist.push(admin);
      });
      let Creator = adminlist.filter(a => a.status == 'creator');
      let onlyAdmin = adminlist.filter(a => a.status !== 'creator');
      let lista_admins = "";
      lista_admins += `<b>◼️ Propietario</b>\n`;
      lista_admins += `${Creator[0].name}\n\n`;
      lista_admins += `<b>◻️ Administradores</b>\n`;
      onlyAdmin.forEach(function(c, i) {
        let indice1 = i + 1;
        let indice = indice1 <= 9 ? `0${indice1}` : `${indice1}`;
        lista_admins += `<b>${indice}</b> - ${c.name}\n`;
      });
      ctx.replyWithHTML(lista_admins);
    } else {
      ctx.reply("No estas en un grupo");
    }
  });
  bot.command('/promote', async(ctx) => {
    if (!ctx.update.message.reply_to_message) {
      ctx.reply('No detecto al usuario para promover')
    } else {
      if (ctx.update.message.chat.type == "private") {
        ctx.reply('El comando /promote no esta disponible en chats privados');
      } else {
        let { from: emisor } = ctx.update.message
        let { from: receptor } = ctx.update.message.reply_to_message
        const userA = await ctx.getChatMember(emisor.id);
        const userB = await ctx.getChatMember(receptor.id);
        if (userA.status == 'member' && userB.status == 'administrator') {
          ctx.reply('Un miembro no puede promover a un administrador')
          return;
        };
        if (userA.status == 'administrator' && userB.status == 'administrator') {
          ctx.reply('Un administrador no puede promover a otro administrador')
          return;
        };
        if (userA.status == 'member' || userA.status == 'administrator' && userB.status == 'creator') {
          ctx.replyWithSticker(ownerAlert)
          return;
        };
        if (emisor.id == receptor.id) {
          ctx.reply('No te puedes promover a ti mismo');
          return;
        };
        if (
          userA.status == 'administrator' && userB.status == 'member' ||
          userA.status == 'creator' && userB.status == 'member' ||
          userA.user.id == owner.id
        ) {
          try {
            await ctx.promoteChatMember(
              ctx.update.message.reply_to_message.from.id, {
                can_change_info: true,
                can_delete_messages: true,
                can_invite_users: true,
                can_pin_messages: true,
                can_promote_members: true,
                can_restrict_members: true,
              }
            );
            ctx.reply(`${emisor.first_name} promovio a ${receptor.first_name}`);
          } catch (err) {
            ctx.reply(`No se pudo promover a ${receptor.first_name}`);
          }
          return;
        };
      }
    }
  });
  bot.command('/demote', async(ctx) => {
    if (!ctx.update.message.reply_to_message) {
      ctx.reply('No detecto al usuario para promover')
    } else {
      let { from: emisor } = ctx.update.message
      let { from: receptor } = ctx.update.message.reply_to_message
      const userA = await ctx.getChatMember(emisor.id);
      const userB = await ctx.getChatMember(receptor.id);
      if (receptor.id == botConfig.id) {
        ctx.reply('No puedes degradar al bot');
        return;
      }
      if (userA.status == 'member' && userB.status == 'administrator') {
        ctx.reply('Un miembro no puede degradar a un administrador')
        return;
      };
      if (userA.status == 'administrator' && userB.status == 'administrator') {
        ctx.reply('Un administrador no puede degradar a otro administrador')
        return;
      };
      if (userA.status == 'member' || userA.status == 'administrator' && userB.status == 'creator') {
        ctx.replyWithSticker(ownerAlert)
        return;
      };
      if (emisor.id == receptor.id) {
        ctx.reply('No te puedes degradar a ti mismo');
        return;
      };
      if (
        userA.status == 'administrator' && userB.status == 'member' ||
        userA.status == 'creator' && userB.status == 'member' ||
        userA.user.id == owner.id) {
        try {
          await ctx.promoteChatMember(
            receptor.id, {
              can_change_info: false,
              can_post_messages: false,
              can_edit_messages: false,
              can_delete_messages: false,
              can_invite_users: false,
              can_restrict_members: false,
              can_pin_messages: false,
              can_promote_members: false,
            }
          );
          ctx.reply(`${emisor.first_name} degrado a ${receptor.first_name}`);
        } catch (e) {
          ctx.reply(`No se pudo degradar a ${receptor.first_name}`);
        };
        return;
      };
    }
  });
  bot.command("/pin", async(ctx) => {
    if (ctx.update.message.chat.type == "supergroup") {
      if (ctx.message.reply_to_message) {
        ctx.pinChatMessage(ctx.message.reply_to_message.message_id);
        ctx.reply("📌 Mensage anclado");
      } else {
        let ctx_text = ctx.update.message.text.replace('/add', '').replace(' ', '');
        if (ctx_text == '') {
          ctx.reply('Agrege un nombre para la nota');
          return;
        }
        let pin_name = ctx_text.split(' ');
        let nombre = pin_name[0];
        if (pin_name[1] == undefined) {
          const { message_id } = ctx.update.message.reply_to_message
          ctx.reply('Agrege contenido a la nota' , { reply_to_message_id: message_id });
          return;
        }
        let contenido = ctx_text.replace(`${nombre}`, '').replace(' ', '')
        let { message_id } = await ctx.reply(contenido);
        ctx.pinChatMessage(message_id)
      }
    } else {
      ctx.reply("No puedo anclar mensages aqui");
    }
  });
  bot.command("/unpin", async(ctx) => {
    try {
      await ctx.unpinAllChatMessages()
      ctx.reply("mensages desanclados");
    } catch (error) {
      ctx.reply("No nay nada anclado");
    }
  });
  bot.command("/link", async(ctx) => {
    if (ctx.update.message.chat.type == "supergroup") {
      const { invite_link, title }:chatInterface = await ctx.getChat()
      ctx.replyWithMarkdown(`[${title}](${invite_link})`)
    } else {
      ctx.reply("Solo puedo obtener enlaces en grupos");
    }
  });
}