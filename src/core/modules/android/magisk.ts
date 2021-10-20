import axios from 'axios';
import { MAGISK_API } from '@config';
import { Cortana } from '@context';
import { log } from '@libs/messages';

export async function magiskCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    const {
      data: { magisk: s },
    } = await axios.get(`${MAGISK_API}/stable.json`);
    const {
      data: { magisk: c },
    } = await axios.get(`${MAGISK_API}/canary.json`);
    const message = _.android.magiskTemplate(s, c);
    return ctx.replyWithMarkdown(message);
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'magiskCmd()' });
  }
}
