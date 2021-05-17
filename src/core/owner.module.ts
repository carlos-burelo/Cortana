import { db } from '../database';
import { Telegraf } from 'telegraf';
import { add_or_update_sudo, get_perms, get_sudos } from '../controllers/owner.controller';
import { owner } from '../config';

export default function (bot: Telegraf) {
    bot.command('/eco', async (ctx) => {
        if (await get_perms(ctx.chat.id) == true) {
            const accounts = await db().get('accounts').value();
            let msg = ctx.message.text.replace('/eco ', '')
            const result = accounts.filter(id => id.type == 'supergroup');
            result.forEach(a => {
                bot.telegram.sendMessage(a.id, msg)
            });
        } else {
            ctx.reply('Esta cuenta no cuenta con acceso a este comando')
        }
    });
    bot.command(['/sudolist', '/sudos'], async (ctx) => {
        ctx.reply(await get_sudos())
    });
    bot.command('/sudo', async (ctx) => {
        let emisor = ctx.update.message.from
        let user:any = ctx.update.message.reply_to_message
        if(!user || user == undefined){
            ctx.reply('No detecto usuario a promover');
            return;
        }
        user = user.from
        let arg:number = parseInt(ctx.message.text.split(' ')[1])
        let role:string = ctx.message.text.split(' ')[2]
        if(!arg || arg == NaN){
            ctx.reply('No detecto argumentos');
            return;
        }
        if (emisor.id == owner.id) {
            ctx.reply(await add_or_update_sudo(ctx, user, arg, role))
        } else {
            ctx.reply('Solo el propietario puede agregar sudo users')
        }
    });
}