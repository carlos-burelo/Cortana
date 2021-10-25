import { Cortana } from '../../../context';
import { log } from '../../libs/messages';
import { exec } from 'child_process';
import { promisify } from 'util';

export async function bashCmd(ctx: Cortana) {
  try {
    const cmd = ctx.params.join(' ');
    // const  = await ctx.lang()
    const sh = promisify(exec);
    if (cmd.includes('sudo') || cmd.includes('rm')) {
      return ctx.reply('No sudo perms');
    }
    const { stderr, stdout } = await sh(cmd);
    if (stderr) return ctx.reply(stderr);

    return ctx.reply(stdout);
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'bashCmd()' });
  }
}
