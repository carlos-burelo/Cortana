import { ApisI, BotI, DatabaseI, OwnerI } from "./core/interfaces/index";
import { resolve } from "path";
import { Chat } from "telegraf/typings/core/types/typegram";

export const mainDir = __dirname;
export const downloadDir = `${resolve(__dirname, "assets", "downloads")}`;

export const owner: OwnerI = {
  id: 823410643,
  username: "CarlosBurelo",
  first_name: "Carlos",
};

export const _bot: BotI = {
  id: 1317616064,
  username: "AssistantCortana_bot",
  first_name: "Cortana",
  repository: "https://github.com/carlos-burelo/CortanaTs",
};

export const api_urls: ApisI = {
  monoschinos: process.env.API_MONOSCHINOS,
  magisk: "https://raw.githubusercontent.com/topjohnwu/magisk_files/master",
  github: "https://api.github.com",
  samsung: "http://fota-cloud-dn.ospserver.net/firmware",
  twrp: "https://eu.dl.twrp.me",
};

export async function makeDBSchema(a: DatabaseI): Promise<DatabaseI> {
  if (a.type == "supergroup" || a.type == "group") {
    const GroupSchema: DatabaseI = {
      id: a.id,
      title: a.title,
      username: a.username,
      type: a.type,
      rules: {
        content: "",
        status: true,
      },
      bios: [],
      notes: [],
      warns: [],
      filters: [],
      prefs: {
        welcome: {
          status: true,
          message: "Bienvenido {first_name}",
          type: "text",
        },
        goodbye: {
          status: true,
          message: "Bienvenido {first_name}",
          type: "text",
        },
      },
    };
    return GroupSchema;
  } else {
    const UserSchema: DatabaseI = {
      id: a.id,
      first_name: a.first_name,
      username: a.username,
      type: a.type,
      // bios: [],
      notes: [],
      // warns: [],
      // filters: [],
      prefs: {
        welcome: {
          status: true,
          message: "Bienvenido {first_name}",
          type: "text",
        },
        goodbye: {
          status: true,
          message: "Bienvenido {first_name}",
          type: "text",
        },
      },
    };
    return UserSchema;
  }
}
