import { Cortana } from '@context';
import { log, md } from '@libs/messages';
import { getBio } from '@sql/bio.sql';

export async function bioCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    const { reply_to_message: msg } = ctx.msg;
    if (!msg) return ctx.reply(_.global.replyMissing);
    const {
      from: { id: userId, first_name },
    } = ctx.message.reply_to_message;
    const bio = await getBio(ctx.chat.id, userId);
    if (!bio) return ctx.reply('No bio found');
    const text = `*${first_name || 'User'} Bio:*\n${md(bio.text)}`;
    return ctx.replyWithMarkdown(text);
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'bioCmd()' });
  }
}
