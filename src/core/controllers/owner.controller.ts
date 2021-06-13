import { db } from "../../database";
import { SudoI, ChatUserI } from "../interfaces/index";
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { Context } from "telegraf";
import { sudoPerms } from "../guards/sudo.guard";
import { Message } from "telegraf/typings/core/types/typegram";
import { mainDir } from "../../config";
import { detectFormat } from "../libs/type.detect";

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

export async function sendMethod(ctx:Context, account, msg) {
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

export async function get_sudos(): Promise<string> {
  const sudos: SudoI[] = await db().get("sudos").value();
  if (sudos.length == 0) {
    return "Aun no hay Sudo Users";
  } else {
    let sudolist: string = "◼️ Sudo list\n\n";
    sudos.forEach((sudo) => {
      sudolist += `• ${sudo.first_name} | ${sudo.role}\n`;
    });
    return sudolist;
  }
}

export async function add_or_update_sudo(
  ctx: Context,
  user: ChatUserI,
  range: number,
  role: string
) {
  const res = await get_sudo(user.id);
  if (res !== false) {
    const msg = await update_sudos(ctx, user, range, role);
    return msg;
  } else {
    const msg = await add_sudos(ctx, user, range, role);
    return msg;
  }
}
export async function add_sudos(ctx, user: ChatUserI, range: number, role) {
  let sudo: SudoI = {
    id: user.id,
    first_name: user.first_name,
    username: user.username,
    range: range,
    role: `${!role ? await rol(range) : role}`,
  };
  try {
    await ctx.setChatAdministratorCustomTitle(
      user.id,
      `${!role ? await rol(range) : role}`
    );
  } catch (error) {
    return `${user.first_name} primero debe ser administrador`;
  }
  await db().get("sudos").push(sudo).write();
  return `${user.first_name} ha sido promovido a ${sudo.role}`;
}
export async function update_sudos(ctx, user: ChatUserI, range: number, role) {
  let sudo: SudoI = {
    id: user.id,
    first_name: user.first_name,
    username: user.username,
    range: range,
    role: `${!role ? await rol(range) : role}`,
  };
  try {
    await ctx.setChatAdministratorCustomTitle(
      user.id,
      `${!role ? await rol(range) : role}`
    );
  } catch (error) {
    return `${user.first_name} primero debe ser administrador`;
  }
  await db().get("bios").find({ id: user.id }).assign(sudo).write();
  return `${user.first_name} ha sido promovido a ${sudo.role}`;
}
export async function get_sudo(id: number) {
  const sudos: SudoI[] = await db().get("sudos").value();
  let found = sudos.find((sudo) => sudo.id == id);
  if (found !== undefined) {
    return found;
  } else {
    return false;
  }
}
export async function get_groups() {
  try {
    let dbs: any[] = await readdirSync("./src/databases", {
      encoding: "utf-8",
    });
    let new_dbs = [];
    dbs.forEach((bd) => {
      if (bd !== "main" && bd.includes("-")) {
        let data: any = readFileSync(`./src/databases/${bd}`, {
          encoding: "utf-8",
        });
        data = JSON.parse(data);
        let db = {
          id: parseInt(data.id),
          title: data.title,
        };
        new_dbs.push(db);
      }
    });
    return { pass: true, dbs: new_dbs };
  } catch (error) {
    return { pass: false, dbs: [] };
  }
}

//Extra functions

export async function rol(range): Promise<string> {
  let role;
  range == 1
    ? (role = "Sudo")
    : range == 2
    ? (role = "Manager")
    : range == 3
    ? (role = "Moderador")
    : (role = "Sin rango");
  return role;
}
