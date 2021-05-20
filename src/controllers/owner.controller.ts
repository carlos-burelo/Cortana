import { connect, db } from "../database";
import { owner } from "../config";
import { SudoI, UserI } from "../interfaces/controllers";
import fs from "fs";

export async function get_perms(account): Promise<any> {
  try {
    if (account.id == owner.id) {
      console.log("pass owner");
      let dbs: any[] = await fs.readdirSync("./src/databases", {
        encoding: "utf-8",
      });
      let new_dbs = [];
      dbs.forEach((bd) => {
        if (bd !== "main" && bd.includes("-")) {
          bd = bd.replace(".json", "");
          bd = parseInt(bd);
          new_dbs.push(bd);
        }
      });
      return { pass: true, dbs: new_dbs };
    }
    let sudos: any[] = await db().get("sudos").value();
    if (account.id !== owner.id) {
      let pass = sudos.find((sudo) => sudo.id == account.id);
      if (pass.range == 1) {
        let dbs: any[] = await fs.readdirSync("./src/databases", {
          encoding: "utf-8",
        });
        let new_dbs = [];
        dbs.forEach((bd) => {
          if (bd !== "main" && bd.includes("-")) {
            bd = bd.replace(".json", "");
            bd = parseInt(bd);
            new_dbs.push(bd);
          }
        });
        return { pass: true, dbs: new_dbs };
      }
    } else {
      console.log("Not have permissions");
      return false;
    }
  } catch (error) {
    console.log(error.toString());
    return { pass: false, dbs: [] };
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
  ctx,
  user: UserI,
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
export async function add_sudos(ctx, user: UserI, range: number, role) {
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
export async function update_sudos(ctx, user: UserI, range: number, role) {
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
  await db().get("sudos").find({ id: sudo.id }).assign(sudo).write();
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
  //
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
    : (role = "Null");
  return role;
}
