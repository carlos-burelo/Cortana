import { connect, db } from "../../database";
import { SudoI, ChatUserI } from "../interfaces/index";
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { Context } from "telegraf";
import { sudoPerms } from "../guards/sudo.guard";
import { Message } from "telegraf/typings/core/types/typegram";
import { mainDir, owner } from "../../config";
import { detectFormat } from "../libs/type.detect";
import { images } from "../shared/images";

export async function getGroupsFromDB(
  ctx: Context,
  id: number
): Promise<Message.TextMessage> {
  try {
    if (sudoPerms(id)) {
      let dbs: string[] = await readdirSync(resolve(mainDir, "databases"), {
        encoding: "utf-8",
      });
      let text: string = "Grupos registrados\n\n";
      dbs.forEach((bd) => {
        if (bd !== "main" && bd.includes("-")) {
          let data: any = readFileSync(
            `${resolve(mainDir, "databases")}/${bd}`,
            {
              encoding: "utf-8",
            }
          );
          data = JSON.parse(data);
          text += `<b>Name:</b><i>${data.title}</i>\n`;
          text += `<b>id:</b><code>${data.id}</code>\n\n`;
        }
      });
      return ctx.reply(text, {
        parse_mode: "HTML",
      });
    } else {
      return ctx.reply("No tienes acceso a este comando");
    }
  } catch (error) {
    return ctx.reply(error.toString());
  }
}

export async function sendMessage(
  ctx,
  id: number,
  account: number,
  message: string
) {
  let perms: boolean = await sudoPerms(id);
  if (perms == true) {
    if (ctx.message.reply_to_message) {
      let msg = await detectFormat(ctx.message.reply_to_message);
      await sendMethod(ctx, account, msg);
    } else {
      try {
        ctx.telegram.sendMessage(account, message);
      } catch (error) {
        ctx.reply(error.toString());
      }
    }
  } else {
    ctx.reply("Esta cuenta no tiene acceso a este comando");
  }
}

export async function sendMethod(ctx: Context, account, msg) {
  switch (msg.type) {
    case "sticker":
      ctx.telegram.sendSticker(account, msg.source);
      break;
    case "photo":
      ctx.telegram.sendPhoto(account, msg.source);
      break;
    case "video":
      ctx.telegram.sendVideo(account, msg.source);
      break;
    case "audio":
      ctx.telegram.sendAudio(account, msg.source);
      break;
    case "voice":
      ctx.telegram.sendVoice(account, msg.source);
      break;
    case "document":
      ctx.telegram.sendDocument(account, msg.source);
      break;
    default:
      ctx.telegram.sendMessage(account, msg.source);
      break;
  }
}

// COMMANDS FOR SUDOS
export async function getSudo(id: number) {
  const find = db({ id: "main" }).get("sudos").find({ id: id }).value();
  if (find !== undefined) {
    return find;
  } else {
    return undefined;
  }
}
export async function getSudos(ctx: Context) {
  const sudos: SudoI[] = db({ id: "main" }).get("sudos").value();
  if (sudos.length == 0) {
    ctx.reply("No hay sudos por el momento");
  } else {
    let sudolist: string = "Sudos \n\n";
    sudos.forEach((sudo) => {
      if (sudo.id !== owner.id) {
        sudolist += `• ${sudo.first_name} | ${sudo.role}\n`;
      }
    });
    ctx.reply(sudolist);
  }
}
export async function addOrUpdateSudo(ctx: Context, sudo: SudoI) {
  if (sudo.role == undefined) {
    let roleDefault = await rol(sudo.range);
    sudo.role = roleDefault;
  }
  if ((await getSudo(sudo.id)) == undefined) {
    await connect({ id: "main" });
    db({ id: "main" }).get("sudos").push(sudo).write();
    await setCustomName(ctx, sudo.id, sudo.role);
    ctx.reply(`${sudo.first_name} ha sido promovido a ${sudo.role}`);
  } else {
    await connect({ id: "main" });
    // let sudo1 = db({id:'main'}).chain().get('sudos').ass
    // .assign()
    // .get('sudos').find({id: sudo.id}).assign(sudo).write()
    // let s = sudo1.assign(sudo)
    // db({id:'main'}).get('sudos').remove({id: sudo.id}).write()
    // db({id:'main'}).get('sudos').push(sudo).write()
    // await setCustomName(ctx, sudo.id, sudo.role)
    // ctx.reply(`${sudo.first_name} ha sido promovido a ${sudo.role}`)
  }
}
export async function deleteSudo(ctx: Context, user: ChatUserI) {
  try {
    await connect({ id: "main" });
    if ((await getSudo(user.id)) == undefined) {
      ctx.reply(`${user.first_name} no esta registrado como Sudo.`);
    } else {
      db({ id: "main" }).get("sudos").remove({ id: user.id }).write();
      ctx.replyWithPhoto(images.demoted);
    }
  } catch (error) {
    ctx.reply(error.toString());
  }
}
//Extra functions

export async function rol(range: number): Promise<string> {
  let role: string;
  switch (range) {
    case 0:
      role = "Owner";
      break;
    case 1:
      role = "Sudo";
      break;
    case 2:
      role = "Admin";
      break;
    case 3:
      role = "Mod";
      break;
    default:
      role = "No rank";
      break;
  }
  return role;
}

export async function setCustomName(ctx: Context, id: number, title: string) {
  try {
    ctx.setChatAdministratorCustomTitle(id, title);
  } catch (error) {
    console.log(error);
  }
}
