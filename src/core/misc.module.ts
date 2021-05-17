import { detect_format } from '../controllers/notes.controller';
import { Telegraf } from 'telegraf';
import { array_lolis } from '../components/misc.component';
import axios from 'axios';
export default function (bot: Telegraf) {
    bot.command('/getid', async (ctx) => {
        let reply = ctx.update.message.reply_to_message
        let { source, tipo } = await detect_format(reply)
        let formated =
            `<b>Tipo:</b> <i>${tipo}</i>\n\n` +
            `<b>Id:</b> <code>${source}</code>`
        ctx.replyWithHTML(formated)
    });
    bot.command('/cc', async (ctx) => {
        let value: string[] = ctx.message.text.split(' ')
        let main = parseInt(value[1])
        try {
            const res = await axios.get(
                `https://www.alphavantage.co/query` +
                `?function=CURRENCY_EXCHANGE_RATE` +
                `&from_currency=${value[2]}` +
                `&to_currency=${value[3]}` +
                `&apikey=${process.env.CURRENCY}`
            )
            let response: any = JSON.stringify(res.data).replace(/\s/g, '_')
            for (let i = 0; i < 16; i++) {
                response = response.replace(/[.]/g, '').replace(`${i}_`, '')
                response = response.replace('9_', '')
            }
            response = JSON.parse(response)
            let resp = response.Realtime_Currency_Exchange_Rate.Exchange_Rate
        } catch (error) {
            ctx.reply('Datos inconrrectos')
        }
    });
    bot.command('/loli', async (ctx) => {
        ctx.replyWithSticker(array_lolis[Math.floor(Math.random() * array_lolis.length)])
    });
    bot.command('/ctx', async (ctx) => {
        console.clear()
        let contexto = JSON.stringify(ctx)
        console.log(contexto)
        // ctx.reply(contexto.toString())
    });
    bot.command('/poll', async (ctx) => {
        if (ctx.chat.type == "private") {
            ctx.reply('No se pueden hacer encuestas en chats privados');
            return;
        }
        let msg = ctx.message.text.replace('/poll ', '').split(')')
        try {
            let question = msg[0].replace(/[(]/g, '').replace('\n', 'e')
            let options: string[] = JSON.parse(msg[1])
            if (!options[1]) {
                ctx.reply('Necesito al menos 2 respuestas');
                return
            }
            ctx.replyWithPoll(question, options, 
                {
                    is_anonymous:false,

                }
            )
        } catch (error) {
            ctx.reply('Formato de encuesta incorrecto');
            return
        }

    });
}