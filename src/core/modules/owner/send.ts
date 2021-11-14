import { Cortana } from '@context';
import { log } from '@libs/messages';

export async function sendCmd(ctx: Cortana) {
  try {
    const { params } = ctx;
    const match = params[0].match(/d+/);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: 'sendCmd()' });
  }
}
