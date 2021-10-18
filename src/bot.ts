import { resolve as join } from 'path';
import { readdirSync as read } from 'fs';
import { Bot } from 'grammy';
import { Cortana } from './context';

/**
 * Returns modules array founded in
 * modules folder and import dynamicly
 * @param {Bot<Cortana>} bot Global Grammy api
 * @return {Promise<any[]>}
 */
export async function modules(bot: Bot<Cortana>): Promise<any[]> {
  const modulesPath: string = join(__dirname, 'core', 'modules');
  const modules: string[] = read(modulesPath, 'utf-8');
  return modules.map(async (module: string) => {
    const data = await import(join(modulesPath, module));
    return data.default(bot);
  });
}
