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
}