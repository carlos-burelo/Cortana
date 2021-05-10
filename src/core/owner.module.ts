import { db } from '../database';
import { Telegraf } from 'telegraf';
import { add_sudos, get_perms, get_sudos } from '../controllers/owner.controller';
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
        let emisor = ctx.message.from
        let user = ctx.message.reply_to_message.from
        let range = parseInt(ctx.message.text.split(' ')[1])
        if (!range) {
            ctx.reply('Porfavor establezca un rango');
            return
        }

        if (emisor.id == owner.id) {
            ctx.reply(await add_sudos(ctx, user, range))
        } else {
            ctx.reply('Solo el propietario puede agregar sudo users')
        }
    });
}