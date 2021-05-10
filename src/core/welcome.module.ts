import { Telegraf } from 'telegraf';
import { get_account } from '../controllers/wecome.contoller';

export default function (bot: Telegraf) {
    bot.command('/welcome', async (ctx) => {
    });

    bot.start(async (ctx) => {
        await get_account(ctx, ctx.chat.id);
    })
    bot.on('left_chat_member', async (ctx) => {
        ctx.reply('Goodbye')
    });
    bot.on('new_chat_members', async (ctx) => {
        ctx.reply('Wellcome')
    })
}