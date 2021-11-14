import { canBan } from '@guards/ban.guard';
import { Cortana } from '@context';
import { log } from '@libs/messages';
import { ChatMember } from 'grammy/out/platform';

export async function banCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    if (ctx.chat.type == 'private') return ctx.reply(_.global.noPrivateChat);
    if (!ctx.message.reply_to_message) return ctx.reply(_.global.replyMissing);
    const A: ChatMember = await ctx.getChatMember(ctx.message.from.id);
    const B: ChatMember = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
    if (canBan(ctx, A, B)) {
      // ctx.banChatMember(B.user.id);
      // ctx.kickChatMember(ctx.message.reply_to_message.from.id);
      ctx.reply('This user has been banned (test)');
    }
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: 'banCmd()' });
  }
}
