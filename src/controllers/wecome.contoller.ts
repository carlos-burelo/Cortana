import { start_buttons } from "../shared/buttons";
import { start_msg } from "../shared/strings";
import { check_account, create_account, db } from "../database";

export async function get_account(ctx: any, chat: number): Promise<any> {
    try {
        if (await check_account(chat.toString()) == true) {
            return ctx.reply(start_msg, start_buttons)
        } else {
            let res = await ctx.getChat()
            let new_account = {
                id: res.id.toString(),
                title: res.title,
                account: res.username || undefined,
                type: res.type
            }
            await create_account(new_account);
            return ctx.reply('Cuenta creada satisfactoriamente')
        }
    } catch (error) {

    }
};