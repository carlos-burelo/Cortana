import axios from "axios";
import { owner, botConfig } from "../config"
import { createOrUpdateBio, deleteBio, getBio } from "./components/bios.controller";
import { ownerAlert } from "../media/stickers";

export default function(bot) {
  bot.command("/info", (ctx) => {
    let type = '';
    ctx.update.message.reply_to_message ? type == 'supergroup' : type == 'private'
    if (ctx.update.message.reply_to_message) {
      let from = ctx.update.message.reply_to_message.from;
      let first_name = from.first_name;
      let username = from.username;
      let last_name = from.last_name;
      let id = from.id;
      let data = "";
      data += `Informacion del usuario\n\n`;
      data += `<b>Id:</b> <code>${id}</code> \n`;
      data += `<b>First name</b> ${first_name}\n`;
      if (ctx.message.from.last_name) {
        data += `<b>Last name:</b> ${last_name}\n\n`;
      }
      data += `<b>User name:</b>  @${username}\n\n`;
      if (id == owner.id) {
        data += "Este sujeto es mi creador";
      }
      ctx.replyWithHTML(data);
      return;
    }
    if (ctx.update.message.chat.type == "supergroup") {
      let type = ctx.message.chat.type;
      let username = ctx.message.chat.username;
      let id = ctx.message.chat.id;
      let data = "";
      data += `Informacion del Grupo\n\n`;
      data += `<b>Id:</b> <code>${id}</code> \n`;
      data += `<b>User name:</b>  @${username}\n`;
      data += `<b>Type: </b> ${type}\n`;
      ctx.replyWithHTML(data);
    }
    if (ctx.update.message.chat.type == "private") {
      let first_name = ctx.message.from.first_name;
      let username = ctx.message.from.username;
      let last_name = ctx.message.from.last_name;
      let id = ctx.message.from.id;
      let data = "";
      data += `Informacion del usuario\n\n`;
      data += `<b>Id:</b> <code>${id}</code> \n`;
      data += `<b>First name</b> ${first_name}\n`;
      if (ctx.message.from.last_name) {
        data += `<b>Last name:</b> ${last_name}\n\n`;
      }
      data += `<b>User name:</b>  @${username}\n\n`;
      if (id == owner.id) {
        data += "Este sujeto es mi creador";
      }
      ctx.replyWithHTML(data);
    }
  });
  bot.command("/id", (ctx) => {
    if (ctx.update.message.reply_to_message) {
      const id = ctx.update.message.reply_to_message.from.id;
      const USER = ctx.update.message.reply_to_message.from.first_name;
      ctx.replyWithHTML(`El Id de ${USER} es : <code>${id}</code>`);
    } else {
      const id = ctx.message.chat.id;
      if (ctx.message.chat.type == "supergroup") {
        ctx.replyWithHTML(`El Id del grupo es: ${id}`);
      }
      if (ctx.message.chat.type == "private") {
        ctx.replyWithHTML(`Tu id es: ${id}`);
      }
    }
  });
  bot.command("/bio", async(ctx) => {
    try {
      if (ctx.chat.type == 'supergroup') {
        if (ctx.update.message.reply_to_message) {
          let receptor = ctx.update.message.reply_to_message.from;
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
        let bioObject = {
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
      } catch (e) {}
    }
  });
  bot.command("/delbio", async(ctx) => {
    try {
      if (ctx.chat.type == 'supergroup') {
        if (ctx.update.message.reply_to_message) {
          let emisor = ctx.update.message.from
          let receptor = ctx.update.message.reply_to_message.from;
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
  bot.command('/me', async(ctx) => {
    try {
      const id = ctx.update.message.from.id;
      let res = await axios.get(`${owner.db}/bios/${id}`);
      if (res.data == '') {
        ctx.reply('Biografia vacia');
        return
      }
      const { message_id } = ctx.message;
      ctx.reply(res.data.text, { reply_to_message_id: message_id })
      return;
    } catch (error) {
      ctx.reply('No cuentas con una biografia')
    }
  });
}