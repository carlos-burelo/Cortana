import { AccountModelI } from "interfaces/database";
import lowdb from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";

let data:any;

export async function createConection() {
  const adapter = new FileAsync('./src/db.json');
  data = await lowdb(adapter)
  data.defaults({ accounts:[], banned:[], sudo:[]}).write();
  console.log('DB is connected')
}
export const getDB = () => data;

export async function checkCollection(collection: string): Promise<boolean> {
  const res = await getDB().has(`${collection}`).value()
  return res
}
export async function checkAccount(id: string): Promise<boolean> {
  const res = await getDB()
    .get("accounts")
    .find({ id: id })
    .value()
  if (res !== undefined) {
    return true
  } else {
    return false
  }
}
export async function create_account(account:AccountModelI) {
  await getDB().get('accounts').push(account).write()
};