import { Telegraf } from 'telegraf';
import { ChatMember } from 'telegraf/typings/core/types/typegram';
import { getLang } from '../../lang';
import { decideUnmute, setMute } from '../controllers/mute.controller';
import { generateLog } from '../libs/messages';

export default function (bot:Telegraf) {
    bot.command('/mute', async (ctx) => {
        try {
            const _ = getLang(ctx.chat);
            if(ctx.chat.type == 'private'){
                return ctx.reply(_.global.noPrivateChats);
            }
            if(!ctx.message.reply_to_message){
                return ctx.reply(_.global.pleaseReplyMsg);
            }
            let A:ChatMember = await ctx.getChatMember(ctx.message.from.id)
            let B:ChatMember = await ctx.getChatMember(ctx.message.reply_to_message.from.id)
            let arg = ctx.message.text.split(' ')[1];
            return setMute(ctx, A,B, arg)
        } catch (error) {
            const [, l, c] = error.stack.match(/(\d+):(\d+)/);
            generateLog(ctx, error, [l, c], "/mute", __filename);
        }
    });
    bot.command('/unmute', async (ctx) => {
        try {
            const _ = getLang(ctx.chat);
            if(ctx.chat.type == 'private'){
                return ctx.reply(_.global.noPrivateChats);
            }
            if(!ctx.message.reply_to_message){
                return ctx.reply(_.global.pleaseReplyMsg);
            }
            let A:ChatMember = await ctx.getChatMember(ctx.message.from.id)
            let B:ChatMember = await ctx.getChatMember(ctx.message.reply_to_message.from.id)
            let arg = ctx.message.text.split(' ')[1];
            return decideUnmute(ctx, A,B, arg)
        } catch (error) {
            const [, l, c] = error.stack.match(/(\d+):(\d+)/);
            generateLog(ctx, error, [l, c], "/unmute", __filename);
        }
    });
}