import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import path from "path";
import fs from "fs";
import { AccountModelI } from "./interfaces/database";

let data;
export const dir = path.join(__dirname, "databases");

const main_db = {
  id: "main",
  sudos: [],
  gbanned: [],
  federation: [],
};

export const connect = (dba?) => {
  !dba ? (dba = main_db) : dba;
  const dbPath = path.join(dir, `${dba.id}.json`);
  const adapter = new FileSync(dbPath);
  data = low(adapter);
  data.defaults(dba).write();
};

export const db = (database?) => data;

export async function check_account(id: string): Promise<boolean> {
  return await fs.existsSync(path.join(dir, `${id}.json`));
}
export async function create_account(account) {
  let new_account: AccountModelI = {
    id: account.id,
    title: account.title,
    username: account.account,
    type: account.type,
    notes: [],
  };
  if (account.type == "supergroup") {
    (new_account.bios = []),
      (new_account.prefs = {
        welcome: {
          status: true,
          type: "text",
          source: "Bienvenido {first_name}",
        },
        goodbye: {
          status: true,
          type: "text",
          source: "Hasta pronto {first_name}",
        },
      });
  }
  await connect(new_account);
}
