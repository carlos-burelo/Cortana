import { Cortana } from '@context';
import { log } from '@libs/messages';
import { buttonBuilder } from '@libs/buttons';

export async function helpmoduleCmd(ctx: Cortana) {
  try {
    const module: string = ctx.callbackQuery.data;
    const { modules: _, utils: u } = await ctx.lang();
    const { content } = _.find((i) => i.callback_data === module);
    ctx.editMessageText(content, {
      parse_mode: 'HTML',
      reply_markup: buttonBuilder(u.backBtn),
    });
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'helpmoduleCmd()' });
  }
}
