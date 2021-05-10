import { add_or_update_bio, delete_bio, get_bio } from "../controllers/bios.controller";
import { Telegraf } from "telegraf";
import { UserI } from "../interfaces/modules";
import { AccountI, BioI } from "../interfaces/controllers";
import { owner, _bot } from "../config";
import { stickers } from "../shared/stickers";

export default function (bot: Telegraf) {
  bot.command('/bio', async (ctx) => {
    let account_id = ctx.chat.id.toString();
    try {
      if (ctx.chat.type == 'private') {// @ Si esta en un chat privado
        ctx.reply('Este comando solo funciona en grupos');
        return;
      };
      if (!ctx.update.message.reply_to_message) {// @ Si no existe mensage
        ctx.reply('Responda al mensaje del usuario');
        return;
      };
      if (ctx.chat.type == 'supergroup' && ctx.update.message.reply_to_message) {// @supergrupo y mensage de respuesta
        let user: UserI = ctx.update.message.reply_to_message.from;
        const bio: string = await get_bio(account_id, user);
        ctx.reply(bio);
        return
      };
    } catch (error) {
      ctx.reply('Error en bios.module.ts');
    };
  });
  bot.command("/setbio", async (ctx) => {
    const account = ctx.chat
    const user: any = ctx.message.reply_to_message.from
    const { message_id } = ctx.message;
    const data: AccountI = {
      user: user,
      account: account
    }
    let bio: BioI = {
      id: `${user.id}`,
      user: `${user.first_name}`,
      text: '',
    }
    try {
      if (ctx.chat.type == 'private') {
        ctx.reply('Este comando solo funciona en grupos');
        return;
      };
      if (!ctx.update.message.reply_to_message) {// @ Si no existe mensage
        ctx.reply('Responda al mensaje del usuario');
        return;
      };
      if (ctx.chat.type == 'supergroup' && ctx.update.message.reply_to_message) {// @supergrupo y mensage de respuesta
        let content = ctx.update.message.text.split(' ');
        if (!content[1]) {
          ctx.reply('No detecto contenido para agregar');
          return;
        }
        let text = ctx.update.message.text.replace('/setbio', '').replace(' ', '')
        text = text.replace(/["]/g, "'")
        let emisor = ctx.update.message.from
        let receptor = ctx.update.message.reply_to_message.from
        if (emisor.id == receptor.id) { // Evita la autobografia
          ctx.reply('No puedes crear tu propia biografia', { reply_to_message_id: message_id });
          return;
        }
        if (emisor.id == owner.id && receptor.id == _bot.id) { // Da acceso al dueño
          bio.text = text
          const res = await add_or_update_bio(data, bio)
          ctx.reply(res, { reply_to_message_id: message_id })
          return;
        };
        if (receptor.id == _bot.id) { // Protege al bot
          ctx.reply('No cuentas con los permisos necesarios', { reply_to_message_id: message_id });
          return;
        };
        if (receptor.id == owner.id) { // Proteje al dueño
          ctx.replyWithSticker(stickers.no_access);
          return;
        };
        bio.text = text
        const res = await add_or_update_bio(data, bio)
        ctx.reply(res, { reply_to_message_id: message_id })

      };
    } catch (error) {
      ctx.reply('Error en bios.module.ts')
    }
  });
  bot.command("/delbio", async (ctx) => {
    try {
      if (ctx.chat.type == 'supergroup') {
        if (ctx.update.message.reply_to_message) {
          let emisor = ctx.update.message.from
          let receptor: any = ctx.update.message.reply_to_message.from;
          if (emisor.id == receptor.id) {
            ctx.reply('No puedes borrar tu propia biografia');
            return;
          }
          let chat_id = ctx.chat.id.toString()
          const res = await delete_bio(chat_id, receptor.id.toString())
          ctx.reply(res)
        } else {
          ctx.reply('No detecto al usuario');
          return;
        }
      } else {
        ctx.reply('Este comando solo funciona en grupos');
        return;
      }
    } catch (error) {
      ctx.reply('Error en bio.module.ts')
    }
  });
}