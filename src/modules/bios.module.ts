import axios from "axios";
import { owner, botConfig } from "../config"
import { createOrUpdateBio, deleteBio, getBio } from "./components/bios.controller";
import { ownerAlert } from "../media/stickers";
import { IbioModel } from "interfaces/bios.interface";
import { Telegraf } from "telegraf";
import { Iuser } from "interfaces/user.interface";

export default function(bot:Telegraf) {

  bot.command("/bio", async(ctx) => {
    try {
      if (ctx.chat.type == 'supergroup') {
        if (ctx.update.message.reply_to_message) {
          let receptor:Iuser = ctx.update.message.reply_to_message.from;
          const result = await getBio(receptor);
          ctx.reply(result)
        } else {
          ctx.reply('No detecto al usuario');
          return;
        }
      } else {
        ctx.reply('Este comando solo funciona en grupos');
        return;
      }
    } catch (error) {
      ctx.reply('Error')
    }
  });
  bot.command("/setbio", async(ctx) => {
    const { message_id } = ctx.message;
    if (ctx.chat.type !== 'supergroup') {
      ctx.reply('Este comando solo funciona en grupos')
    } else {
      try {
        let content = ctx.update.message.text.split(' ');
        if (!content[1]) {
          ctx.reply('No detecto contenido para agregar');
          return;
        }
        if (!ctx.update.message.reply_to_message) {
          ctx.reply('No detecto a un usuario');
          return;
        }
        let text = ctx.update.message.text.replace('/setbio', '').replace(' ', '')
        let emisor = ctx.update.message.from
        let receptor = ctx.update.message.reply_to_message.from
        let bioObject:IbioModel = {
          id: receptor.id.toString(),
          user: receptor.first_name.toString(),
          text: text.replace(/["]/g, "'")
        };
        if (emisor.id == receptor.id) { // Evita la autobografia
          ctx.reply('No puedes crear tu propia biografia', { reply_to_message_id: message_id });
          return;
        }
        if (emisor.id == owner.id && receptor.id == botConfig.id) { // Da acceso al dueño
          const res = await axios.get(`${owner.db}/bios/${receptor.id}`);
          const result = await createOrUpdateBio(res, bioObject, receptor);
          ctx.reply(result)
          return;
        };
        if (receptor.id == botConfig.id) { // Protege al bot
          ctx.reply('No cuentas con los permisos necesarios', { reply_to_message_id: message_id });
          return;
        };
        if (receptor.id == owner.id) { // Proteje al dueño
          ctx.replyWithSticker(ownerAlert);
          return;
        };

        const res = await axios.get(`${owner.db}/bios/${receptor.id}`); // Busca si existe la biografia
        const result = await createOrUpdateBio(res, bioObject, receptor);
        ctx.reply(result);
        return;
      } catch (e) {
        ctx.reply('Error de modulo')
      }
    }
  });
  bot.command("/delbio", async(ctx) => {
    try {
      if (ctx.chat.type == 'supergroup') {
        if (ctx.update.message.reply_to_message) {
          let emisor = ctx.update.message.from
          let receptor:Iuser = ctx.update.message.reply_to_message.from;
          if (emisor.id == receptor.id) {
            ctx.reply('No puedes borrar tu propia biografia');
            return;
          }
          const result = await deleteBio(receptor.id);
          ctx.reply(result)
        } else {
          ctx.reply('No detecto al usuario');
          return;
        }
      } else {
        ctx.reply('Este comando solo funciona en grupos');
        return;
      }
    } catch (error) {
      ctx.reply('Error')
    }
  });
}