import { Cortana } from '../../../context';
import { log } from '../../libs/messages';
import { buttonBuilder } from '../../libs/buttons';

export async function helpCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    let btns = _.modules.sort((a, b) => (a.text < b.text ? -1 : 1));
    ctx.replyWithMarkdown(_.help.msg, {
      reply_markup: buttonBuilder(btns, 3),
    });
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'helpCmd()' });
  }
}

export const helpHelp = `Help for *help* command`;
