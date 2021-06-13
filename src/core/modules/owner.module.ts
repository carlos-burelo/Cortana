import { Telegraf } from "telegraf";
import {
  add_or_update_sudo,
  getGroupsFromDB,
  get_groups,
  get_sudos,
  sendMessage,
} from "../controllers/owner.controller";
import { owner } from "../../config";
import { getDatabases } from "../../database";
import { detectFormat } from "../libs/type.detect";
import { sudoPerms } from "../guards/sudo.guard";

export default function (bot: Telegraf) {
  bot.command("/groups", async (ctx) => {
    if (ctx.chat.type !== "private") {
      await getGroupsFromDB(ctx, ctx.message.from.id);
      return;
    }
    await getGroupsFromDB(ctx, ctx.chat.id);
    // if (perms == true) {
    //   try {
    //     let groups = await get_groups();
    //     let text = "Grupos disponibles\n\n";
    //     groups.dbs.forEach((d) => {
    //       text += `<b>Name:</b><i>${d.title}</i>\n`;
    //       text += `<b>id:</b><code>${d.id}</code>\n\n`;
    //     });
    //     ctx.replyWithHTML(text);
    //   } catch (error) {
    //     ctx.reply(error.toString());
    //   }
    // } else {
    //   ctx.reply("Esta cuenta no tiene acceso a este comando");
    // }
  });
  bot.command("/send", async (ctx) => {
    if (ctx.chat.type !== "private") {
      let account: number = parseInt(ctx.message.text.split(" ")[1]);
      let message: string = ctx.message.text.replace(`/send ${account} `, "");
      let id: number = ctx.message.from.id;
      await sendMessage(ctx, id, account, message);
    } else {
      let account: number = parseInt(ctx.message.text.split(" ")[1]);
      let message: string = ctx.message.text.replace(`/send ${account} `, "");
      let id: number = ctx.chat.id;
      await sendMessage(ctx, id, account, message);
    }
  });
  bot.command("/eco", async (ctx) => {
    try {
      let perms = await sudoPerms(ctx.chat.id);
      let msg = ctx.message.text.replace("/eco ", "");
      if (perms == true) {
        if (msg.length == 0 || msg.includes("/eco")) {
          ctx.reply("Escriba algun mensaje");
          return;
        }
        let dbs: number[] = await getDatabases();
        dbs.forEach((a) => {
          bot.telegram.sendMessage(a, msg);
        });
      }
    } catch (error) {
      ctx.reply(error.toString());
    }
  });
  bot.command(["/sudolist", "/sudos"], async (ctx) => {
    ctx.reply(await get_sudos());
  });
  bot.command("/sudo", async (ctx) => {
    let emisor = ctx.update.message.from;
    let user: any = ctx.update.message.reply_to_message;
    if (!user || user == undefined) {
      ctx.reply("No detecto usuario a promover");
      return;
    }
    user = user.from;
    let arg: number = parseInt(ctx.message.text.split(" ")[1]);
    let role: string = ctx.message.text.split(" ")[2];
    if (!arg || arg == NaN) {
      ctx.reply("No detecto argumentos");
      return;
    }
    if (emisor.id == owner.id) {
      ctx.reply(await add_or_update_sudo(ctx, user, arg, role));
    } else {
      ctx.reply("Solo el propietario puede agregar sudo users");
    }
  });
  bot.command("/e", async (ctx) => {
    let numeros: number[] = [123456789, 246824682, 1357913579];
    let numero = parseInt(ctx.message.text.replace("/e ", ""));
    if (numeros.includes(numero)) {
      ctx.reply("Si existe");
      return;
    }
    ctx.reply("No existe");
  });
}
