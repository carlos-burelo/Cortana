import { AccountModelI } from "interfaces/database";
import lowdb from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";

let data: any;

export async function connect() {
  const adapter = new FileAsync('./src/db.json');
  data = await lowdb(adapter)
  data.defaults({ accounts: [], banned: [], sudos: [] }).write();
}
export const db = () => data;

export async function check_account(id: (string | number)): Promise<boolean> {
  const res = await db()
    .get("accounts")
    .find({ id: id })
    .value()
  if (res !== undefined) {
    return true
  } else {
    return false
  }
};
export async function create_account(account: AccountModelI) {
  if (account.type == "private") {
    let accountModel = {
      id: account.id.toString(),
      title: account.title,
      account: account.account,
      type: account.type,
      notes: [],
      prefs: {
      }
    }
    await db().get('accounts').push(accountModel).write()
  } else {
    let accountModel = {
      id: account.id.toString(),
      title: account.title,
      account: account.account,
      type: account.type,
      notes: [],
      bios: [],
      prefs: {
        welcome: {
          status: false,
          message: 'Empy'
        },
        goodbye: {
          status: false,
          message: 'empy'
        }
      }
    }
    await db().get('accounts').push(accountModel).write()
  }
};