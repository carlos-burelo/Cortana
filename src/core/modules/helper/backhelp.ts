import { Cortana } from '../../../context';
import { buttonBuilder } from '../../libs/buttons';
import { log } from '../../libs/messages';

export async function backhelpCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    let btns = _.modules.sort((a, b) => (a.text < b.text ? -1 : 1));
    ctx.editMessageText(_.help.msg, {
      reply_markup: buttonBuilder(btns, 3),
    });
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'backhelpCmd()' });
  }
}

export const backhelpHelp = `Help for *backhelp* command`;
