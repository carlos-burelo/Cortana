import { Context } from 'telegraf';
import { errorHandler } from '../libs/messages';
import { exec } from 'child_process';
import { promisify } from 'util';
const sh = promisify(exec);
import axios from 'axios';
import { lang } from '../../database';

export async function exectBash(ctx: Context, cmd: string) {
  try {
    const { nodeModule: _ } = await lang(ctx);
    if (cmd.includes('sudo') || cmd.includes('rm')) {
      return ctx.reply(_.cmdDenied);
    }
    const { stderr, stdout } = await sh(cmd);
    if (stderr) {
      return ctx.reply(stderr);
    }
    return ctx.reply(stdout);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'exectBash()', l });
  }
}
export async function fetch(ctx: Context, url: string) {
  try {
    const _ = await lang(ctx);
    const res = await axios.get(url);
    if (res.data.length >= 4000) {
      return ctx.reply(_.nodeModule.limitResponse);
    } else {
      let response: string = JSON.stringify(res.data);
      return ctx.replyWithHTML(`<code>${response}</code>`);
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'fetch()', l });
  }
}
