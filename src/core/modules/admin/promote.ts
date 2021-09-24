import { ChatMember } from 'grammy/out/platform';
import { Cortana } from '../../../context';
import { log } from '../../libs/messages';

export async function promoteCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang();
    if (ctx.chat.type == 'private') return ctx.reply(_.global.noPrivateChat);
    if (!ctx.message.reply_to_message) return ctx.reply(_.global.replyMissing);
    const A: ChatMember = await ctx.getChatMember(ctx.msg.from.id);
    const B: ChatMember = await ctx.getChatMember(ctx.msg.reply_to_message.from.id);
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: '' });
  }
}

export const promoteHelp = `Help for *promote* command`;
