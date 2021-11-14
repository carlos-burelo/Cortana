import { Cortana } from '@context';
import { buttonBuilder } from '@libs/buttons';
import { log } from '@libs/messages';
import { fwScrapping } from '@libs/scraping';

export async function fwCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    const match: string[] = ctx.params;
    if (!match[0]) return ctx.replyWithMarkdown(_.android.noModel);
    if (!match[1]) return ctx.replyWithMarkdown(_.android.noCsc);
    let temp = match[0].match(/SM-/gi);
    let model: string;
    if (temp !== null) model = temp[0].replace(/SM-/gi, '').toUpperCase();
    else model = match[0].toUpperCase();
    let csc = match[1].toUpperCase();
    const data = await fwScrapping(csc, model);
    if (!data) return ctx.reply(_.android.noDeviceFound);
    const { build, mask, pda, phone, btns } = data;
    return ctx.replyWithMarkdown(_.android.fwTemplate(model, csc, pda, phone, build, mask), {
      reply_markup: buttonBuilder(btns),
    });
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: 'fwCmd()' });
  }
}
