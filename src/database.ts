import low, { LowdbSync } from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { resolve } from "path";
import { readdirSync, existsSync, mkdirSync } from "fs";
import { mainDir, makeDBSchema } from "./config";
import { DatabaseI } from "core/interfaces";

let data: LowdbSync<DatabaseI>;
export const dir = resolve(__dirname, "databases");

const main_db = {
  id: "main",
  sudos: [],
  gbanned: [],
  federation: [],
};

export const connect = async (dba?) => {
  !dba ? (dba = main_db) : dba;
  if (existsSync(dir) == false) {
    mkdirSync(dir);
  }
  const dbPath = resolve(dir, `${dba.id}.json`);
  const adapter = new FileSync<DatabaseI>(dbPath);
  data = low(adapter);
  data.defaults(dba).write();
};

export const db = (database?) => data;

export async function checkAccount(id: string): Promise<boolean> {
  return existsSync(resolve(dir, `${id}.json`));
}
export async function createAccount(account) {
  let newAccount = await makeDBSchema(account);
  await connect(newAccount);
}
export async function getDatabases(): Promise<number[]> {
  try {
    let res: any[] = readdirSync(resolve(mainDir, "databases"), {
      encoding: "utf-8",
    });
    let dbs: number[] = [];
    res.forEach((bd) => {
      if (bd !== "main" && bd.includes("-")) {
        bd = bd.replace(".json", "");
        bd = parseInt(bd);
        dbs.push(bd);
      }
    });
    return dbs;
  } catch (error) {
    return [];
  }
}
