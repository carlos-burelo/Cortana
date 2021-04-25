import axios from "axios";
import { admin_sticker } from "../media/stickers";
import { deshonra_photo } from "../media/images";
import { Telegraf } from "telegraf";
import { owner } from "../config";
import { ISudo } from "./models/sudo";

export default function(bot:Telegraf) {
   bot.command('/addsudo', async (ctx) => {
        let role = ctx.message.text.replace('/addsudo', '').replace(' ', '');
        let { id:emisorid } =  ctx.update.message.from;
        if(!ctx.update.message.reply_to_message){
            ctx.reply('No detecto al usuario a promover')
        } else {
            let { id , first_name:name} = ctx.update.message.reply_to_message.from
            
            if(emisorid !== owner.id){
                ctx.reply('No tienes los permisos necesarios');
                return
            } else {
                try {
                    let new_sudo = {
                        id:`${id}`,
                        name,
                        role: role.replace(/["]/g, "'")
                    }
                    const res = await axios.get(`${owner.db}/sudos/${new_sudo.id}`)
                    if (res.data.length == 0) {
                        await axios.post(`${owner.db}/sudos`, new_sudo);
                        
                        await ctx.replyWithSticker(admin_sticker)
                        ctx.reply('Usuario promovido')
    
                    } else {
                        ctx.reply('El usuario ya tiene permisos administrativos');
                        return;
                    }
                } catch (error) {
                    ctx.reply('No se ha podido promover al usuario')
                }
            }
        };
   });
   bot.command('/sudolist', async (ctx) =>{
    try {
        const {data} = await axios.get(`${owner.db}/sudos`);
        if(data.length == 0){
            ctx.reply('*Aun no hay administradores*')
        } else {
            let sudo_list = '*Lista de superusuarios*\n\n'
            data.forEach((a:ISudo) => {
                sudo_list += `◾ _${a.name}_`
            });
            ctx.replyWithMarkdown(sudo_list)
        }
    } catch (error) {
        ctx.reply('No se pudo obtener la lista de superusuarios')
    }
   });
   bot.command('/delsudo', async (ctx) => {
    let role = ctx.message.text.replace('/addsudo', '').replace(' ', '');
    let { id:emisorid } =  ctx.update.message.from;
    if(!ctx.update.message.reply_to_message){
        ctx.reply('No detecto al usuario a promover')
    } else {
        let { id } = ctx.update.message.reply_to_message.from
        if(emisorid !== owner.id){
            ctx.reply('No tienes los permisos necesarios');
            return
        } else {
            try {
                await axios.delete(`${owner.db}/sudos/${id}`)
                await ctx.replyWithPhoto(deshonra_photo);
                ctx.reply('Superusuario degradado')
            } catch (error) {
                ctx.reply('No se ha podido promover al usuario')
            }
        }
    };
   });
};