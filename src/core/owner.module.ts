import { db } from "../database";
import { Telegraf } from "telegraf";
import {
  add_or_update_sudo,
  get_perms,
  get_sudos,
} from "../controllers/owner.controller";
import { owner } from "../config";

export default function (bot: Telegraf) {
  bot.command("/eco", async (ctx) => {
    let { pass, dbs } = await get_perms(ctx.chat);
    if (pass == true) {
      let msg = ctx.message.text.replace("/eco ", "");
      if (msg.length == 0 || msg.includes("/eco")) {
        ctx.reply("Escriba algun mensaje");
        return;
      }
      dbs.forEach((a) => {
        bot.telegram.sendMessage(a, msg);
      });
    } else {
      ctx.reply("Esta cuenta no cuenta con acceso a este comando");
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
}
