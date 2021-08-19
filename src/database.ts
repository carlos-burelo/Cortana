import { existsSync, readdirSync, readFileSync } from 'fs';
import Lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';
import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { databasesDir, OWNER_ID } from './config';
import * as langs from './core/locales';
import _ from './core/locales/en';
import { DBModel, LangI, MainDB, SudoI } from './core/types';
import { LanguageI } from './core/types/locales';

let data: LowdbSync<DBModel>;
let data2: LowdbSync<MainDB>;
export const noAccess = `*${_.global.noUsePerms}*`;
/**
 * @type {DBModel}
 * @interface DBModel
 * @param {DBModel} [database]
 */
export function connect(database?: DBModel) {
  const dbPath: string = resolve(databasesDir, `${database.id}.json`);
  let schema: DBModel;
  if (existsSync(dbPath) == false) {
    schema = makeDBSchema(database);
  }
  const adapter = new FileSync<DBModel>(dbPath);
  data = Lowdb(adapter);
  data.defaults(schema).write();
}
export function db(database?: any): LowdbSync<DBModel> {
  connect(database);
  return data;
}
export function mainConnect() {
  const dbPath: string = resolve(databasesDir, `main.json`);
  let schema: MainDB = {
    whitelist: [OWNER_ID],
    sudos: [],
    gbanned: []
  };
  const adapter = new FileSync<MainDB>(dbPath);
  data2 = Lowdb(adapter);
  return data2.defaults(schema).write();
}
export function main() {
  mainConnect();
  return data2;
}
/**
 * It obtains the id of the group and verifies that
 * it exists in the global database and returns the verification.
 * @param {Context} ctx
 * @return {number | undefined}
 */
export function isAllowed(ctx: Context): number | undefined {
  const { id } = ctx.chat;
  const db: number[] = mainConnect().whitelist;
  return db.find((a: number) => a == id);
}
/**
 * It reads the files in the "databases" folder, reads their content
 * and for each file it creates an object and returns an array with
 * the generated objects.
 * @return {DBModel[]}
 */
export function getDatabases(): DBModel[] | undefined {
  try {
    let dbPath: string[] = readdirSync(databasesDir, {
      encoding: 'utf-8'
    });
    let groups: string[] = dbPath.filter((a) => a.includes('-'));
    let databases: DBModel[] = groups.map((a) => {
      return JSON.parse(
        readFileSync(`${databasesDir}/${a}`, {
          encoding: 'utf-8'
        })
      );
    });
    return databases;
  } catch (error) {
    return undefined;
  }
}
/**
 * Obtains an object derived from the telegraph context with the chat
 * information, and creates a model in the database depending on the
 * type of account.
 * @param {DBModel} a
 * @return {DBModel}
 */
export function makeDBSchema(a: DBModel): DBModel {
  if (a.type == 'supergroup' || a.type == 'group') {
    return {
      id: a.id,
      language_code: !a.language_code ? 'en' : a.language_code,
      title: a.title,
      username: a.username,
      type: a.type,
      rules: {
        content: '',
        status: true
      },
      bios: [],
      notes: [],
      warns: [],
      filters: [],
      prefs: {
        welcome: {
          status: true,
          message: {
            text: 'Bienvenido {first_name}',
            type: 'text'
          }
        },
        goodbye: {
          status: true,
          message: {
            text: 'Hasta pronto {first_name}',
            type: 'text'
          }
        },
        ban: {
          status: false,
          message: {
            content: 'User banned',
            type: 'text'
          }
        },
        spam: {
          status: false,
          sanction: 'off',
          message: {
            type: 'text',
            content: 'Spam Detect'
          }
        },
        warn: {
          status: false,
          sanction: 'off',
          message: {
            type: 'text',
            content: 'User Warned'
          }
        },
        flood: {
          status: false,
          sanction: 'off',
          message: {
            type: 'text',
            content: 'User Warned'
          }
        },
        block: {
          status: false,
          sanction: 'off',
          message: {
            type: 'text',
            content: 'User Warned'
          }
        }
      },
      blacklist: []
    };
  } else {
    return {
      id: a.id,
      language_code: 'es',
      first_name: a.first_name,
      username: a.username,
      type: a.type,
      notes: []
    };
  }
}
/**
 * Gets the id of the user and makes a query to the global database and
 * returns the result of the query as a Boolean type
 * @param {number} id
 * @return {boolean}
 */
export function isSudo(id: number): boolean {
  let sudos: SudoI[] = db().get('sudos').value();
  if (sudos == undefined || sudos.length == 0) {
    return false;
  }
  let found = sudos.find((sudo) => sudo.id == id);
  if (found == undefined) {
    return false;
  }
  return true;
}
/**
 * It receives the context to make a search in the database of the current
 * language based on the id, compares the requested language with the one
 * already established to validate if it is already established or can be
 * updated and returns a confirmation message if the language was
 * established , otherwise nothing returns.
 * @param {Context} ctx
 * @param {LangI} lang2
 * @return {Promise<Message.TextMessage>}
 */
export async function setLang(ctx: Context, lang2: LangI): Promise<Message.TextMessage> {
  try {
    const _ = lang(ctx);
    let current = db(ctx.chat).get('lang').value();
    if (lang2 == current) {
      return ctx.reply(_.global.sameLanguage(lang2));
    }
    db(ctx.chat).assign({ lang: lang2 }).write();
    return ctx.reply(_.global.setLanguageSucces(lang2));
  } catch (error) {
    return undefined;
  }
}

/**
 * It makes a query in the corresponding database of the chat and obtains
 * the value of the property "language_code" to import the object
 * corresponding to the requested language.
 * @param  {Context|any} ctx
 */
export function lang(ctx: Context | string): LanguageI {
  let lang: string;
  if (typeof ctx == 'string') {
    lang = ctx;
  } else {
    lang = db(ctx.chat).get('language_code').value();
  }
  return langs.default[lang];
}
