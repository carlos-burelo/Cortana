// import { resolve as join } from 'path';
// import { readdirSync as read } from 'fs';
import { Bot } from 'grammy';
import { Cortana } from './context';
import adminModule from './core/modules/admin';
import androidModule from './core/modules/android';
import biosModule from './core/modules/bios';
import blacklistModule from './core/modules/blacklist';
import extrasModule from './core/modules/extras';
import githubModule from './core/modules/github';
import helperModule from './core/modules/helper';
import startModule from './core/modules/start';
import stickersModule from './core/modules/stickers';


export function modules(bot: Bot<Cortana>) {
  adminModule(bot);
  androidModule(bot);
  biosModule(bot);
  blacklistModule(bot);
  extrasModule(bot);
  githubModule(bot);
  helperModule(bot);
  startModule(bot);
  stickersModule(bot);
}



// /**
//  * Returns modules array founded in
//  * modules folder and import dynamicly
//  * @param {Bot<Cortana>} bot Global Grammy api
//  * @return {Promise<any[]>}
//  */
// export async function modules(bot: Bot<Cortana>): Promise<any[]> {
//   const modulesPath: string = join(__dirname, 'core', 'modules');
//   const modules: string[] = read(modulesPath, 'utf-8');
//   return modules.map(async (module: string) => {
//     const data = await import(join(modulesPath, module));
//     return data.default(bot);
//   });
// }
