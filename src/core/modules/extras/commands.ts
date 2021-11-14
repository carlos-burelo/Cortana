import { rootDir } from '@config';
import { Cortana } from '@context';
import { log } from '@libs/messages';
import { readdirSync } from 'fs';
import { join } from 'path';

export async function commandsCmd(ctx: Cortana) {
  try {
    const modules = readdirSync(join(rootDir, 'core', 'modules'));
    let commandsText = '';
    const allCommands = modules
      .map((m) => {
        const commands = readdirSync(join(rootDir, 'core', 'modules', m));
        return commands
          .map((c) => c.replace('.ts', ''))
          .filter((c) => c !== 'index')
          .toString();
      })
      .forEach((c) => {
        commandsText += c.replace(/,/g, ' ') + '\n';
      });
    console.log(commandsText);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: 'commandsCmd()' });
  }
}
