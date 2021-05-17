import { start_buttons } from "../shared/buttons";
import { start_msg } from "../shared/strings";
import { check_account, create_account, db } from "../database";
import { GbanI, PrefsI } from "../interfaces/database";
import { Context } from "telegraf";
import { owner } from "../config";
import { SudoI } from "../interfaces/controllers";

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
export async function get_prefs(account) {
    const prefs = await db()
        .get('accounts')
        .find({id: account})
        .get('prefs')
        .value();
    return prefs
};
export async function welcome_settings(account) {
    const { welcome }:PrefsI = await get_prefs(account);
    return welcome
};
export async function set_welcome(ctx, account:string, welcome:string) {
    const found:PrefsI = await get_prefs(account)
    if(found !== undefined){
        
        welcome = welcome.replace('/setwelcome ', '')
        let new_prefs = {
            message: welcome
        }
        const res = await db()
        .get('accounts')
        .find({id: account})
        .get('prefs')
        .get('welcome')
        .assign(new_prefs)
        .write()
        return 'Bienvenida establecida'
    } else {
        return 'Error al establecer la bienvenida'
    }
};

export async function detect_user(ctx, text:string):Promise<string>{
    let member = ctx.update.message.new_chat_member
    const sudos:SudoI[] = db().get('sudos').value()
    const banned:GbanI[] = db().get('gbanned').value()
        if(member.id === owner.id ){
            return 'Bienvenido propietario'
        } else {
            text = text.replace('{first_name}', member.first_name)
            text = text.replace('{username}', `@${member.first_name}`)
            text = text.replace('{id}', member.id)
            return text
        }
        sudos.forEach(sudo => {
            if(sudo.id == member.id){
                return `Bienvenido ${sudo.id}`
            }
        });
        // else{
        //     return text
        // }
        // banned.forEach(gbanned => {
        //     if(gbanned.id == member.id){
        //         return `Usuario globalmente baneado detectado, procediendo a expulsar`
        //     }
        // });
        
    // })
    // return ''
};