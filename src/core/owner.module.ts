import { getDB } from '../database';
import { Telegraf } from 'telegraf';
import { get_perms } from '../controllers/owner.controller';

export default function (bot: Telegraf) {
    bot.command('/send', async (ctx) => {
        if (await get_perms(ctx.chat.id) == true) {
            const db = await getDB().get('accounts').value();
            let msg = ctx.message.text.replace('/send ', '')
            db.forEach(a => {
                bot.telegram.sendMessage(a.id, msg)
            });
        } else {

        }
    });
}