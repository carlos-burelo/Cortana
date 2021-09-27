import { TWRP_API } from '../../../config';
import { Cortana } from '../../../context';
import { log } from '../../libs/messages';
import { twrpScrapping } from '../../libs/scraping';

export async function twrpCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    if (!ctx.params[0]) return ctx.reply(_.android.noDeviceFound);
    const data: any[] = await twrpScrapping(ctx.params[0]);
    let message: string = `*TWRP for ${ctx.params[0].toUpperCase()}\n\n*`;
    data.forEach((i) => {
      message += `\n`;
      message += _.utils.title(i.name).replace(/_/g, '\\_');
      message += _.utils.size(i.date);
      message += _.utils.link(i.name, `${TWRP_API + i.url}`);
    });
    return ctx.replyWithMarkdown(message);
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'twrpCmd()' });
  }
}

export const twrpHelp = `Help for *twrp* command`;
