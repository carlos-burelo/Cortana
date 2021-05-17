import { Telegraf } from 'telegraf';
import { detect_user, get_account, set_welcome, welcome_settings } from '../controllers/welcome.contoller';

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
        // console.log(JSON.stringify(ctx))
        let { id } = ctx.chat
        const welcome = await welcome_settings(id.toString())

        const message = await detect_user(ctx, welcome.message)
        if(welcome.status == true){
            ctx.reply(message);
            return
        } else {
            return
        }
    })
    bot.command('/w', async (ctx) => {
        let { id } = ctx.chat
        const welcome = await welcome_settings(id.toString())

        const message = await detect_user(ctx, welcome.message)
        if(welcome.status == true){
            ctx.reply(message);
            return
        } else {
            return
        }
        // ctx.reply('Wellcome')
    });
    bot.command('/setwelcome', async (ctx) => {
        let { id } = ctx.chat
        let message = ctx.message.text
        const res:string = await set_welcome(ctx,id.toString(),message) 
        ctx.reply(res)
    });
}