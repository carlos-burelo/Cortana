import { setFilter, stopFilter } from '../controllers/filters.controller';
import { Telegraf } from 'telegraf';
import { detectFormat, sendMethod } from '../libs/type.detect';
import { FilterI } from '../interfaces';
import { connect, db } from '../../database';

export default async function (bot: Telegraf) {
    bot.command('/filter', async (ctx) => {
        let word: string[] | string = ctx.message.text.match(/![^\s]+/gi)
        if (!word) {
            ctx.reply('Establezca una palabra para el filtro');
            return
        }
        word = word[0].replace(/!/g, '');
        if (!ctx.message.reply_to_message) {

            let text: string = ctx.message.text
            let regex: RegExp = /(\".*?")/gi
            let match: string[];
            let filters: string[] = [];
            while ((match = regex.exec(text)) !== null) {
                filters.push(match[1].replace(/"/g, ''));
            }
            if (filters.length == 0) {
                ctx.reply('Establezca respuestas para el filtro');
                return
            }
            let newFilter: FilterI = {
                id: word,
                type: 'text',
                strings: filters
            }
            await setFilter(ctx, newFilter);
        } else {
            let { source, type } = await detectFormat(ctx.message.reply_to_message);
            let newFilter: FilterI = {
                id: word,
                type,
                source

            }
            await setFilter(ctx, newFilter)
        }
    });
    bot.command('/filters', async (ctx) => {
        await connect(ctx.chat);
        let filters = db(ctx.chat).get('filters').value();
        let {title}:any = await ctx.getChat();
        if(filters.length !== 0){
            let text = `Filtros en *${title}*\n\n`;
            filters.forEach((a,i)=>{
                text += `${i}  \`${a.id}\`\n`;
            })
            ctx.replyWithMarkdown(text);
        } else {
            ctx.replyWithMarkdown(`No ahy filtros en este chat`);
        }
    });
    bot.hears(/^[\w]+/gi, async (ctx)=>{
        let text:string = ctx.message.text
        await connect(ctx.chat);
        let filters = db(ctx.chat).get('filters').value();
        if(filters !==undefined){
            filters.forEach(async a=>{
                if(text.includes(a.id)){
                    if(a.strings){
                        ctx.reply(a.strings[Math.floor(Math.random() * a.strings.length)])
                    } else {
                        await sendMethod(ctx, a)
                    }
                }
            })
        }
    })
    bot.command('/stop', async (ctx) => {
        let filter:string = ctx.message.text.split(' ')[1];
        stopFilter(ctx, filter)
    });
}