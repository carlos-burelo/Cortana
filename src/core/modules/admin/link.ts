import { Cortana } from '@context';
import { log } from '@libs/messages';

export async function linkCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    if (ctx.chat.type == 'private') return ctx.reply(_.global.noPrivateChat);
    let { invite_link, title } = (await ctx.getChat()) as any;
    return ctx.replyWithMarkdown(`[${title}](${invite_link})\n`, {
      disable_web_page_preview: false,
      allow_sending_without_reply: true,
    });
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: 'linkCmd()' });
  }
}
