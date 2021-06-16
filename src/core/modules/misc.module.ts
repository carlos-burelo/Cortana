import { Telegraf } from "telegraf";
import { array_lolis } from "../components/misc.component";
import axios from "axios";
import { downloadSticker, getStickers, kangSticker } from "../controllers/stickers.controller";
import { detectFormat } from "../libs/type.detect";
import { ReplyMessage } from "telegraf/typings/core/types/typegram";
export default function (bot: Telegraf) {
  bot.command("/getid", async (ctx) => {
    let reply: ReplyMessage = ctx.update.message.reply_to_message;
    let { source, type } = await detectFormat(reply);
    let formated: string =
      `<b>Tipo:</b> <i>${type}</i>\n\n` + `<b>Id:</b> <code>${source}</code>`;
    ctx.replyWithHTML(formated);
  });
  bot.command("/cc", async (ctx) => {
    let value: string[] = ctx.message.text.split(" ");
    let base: number = parseInt(value[1]);
    let orig: string = value[2].toUpperCase();
    let dest: string = value[3].toUpperCase();
    try {
      const res = await axios.get(
        `https://www.alphavantage.co/query` +
          `?function=CURRENCY_EXCHANGE_RATE` +
          `&from_currency=${orig}` +
          `&to_currency=${dest}` +
          `&apikey=${process.env.CURRENCY}`
      );
      let response: number =
        res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      let current_date: number = Math.round(response * base);
      ctx.replyWithMarkdown(
        `${base} ${orig} = ${current_date.toString()} ${dest}`,
        { reply_to_message_id: ctx.message.message_id }
      );
    } catch (error) {
      ctx.reply("Datos inconrrectos");
    }
  });
  bot.command("/loli", async (ctx) => {
    ctx.replyWithSticker(
      array_lolis[Math.floor(Math.random() * array_lolis.length)]
    );
  });
  bot.command("/ctx", async (ctx) => {
    ctx.reply(JSON.stringify(ctx.update.message.entities[1]));
    console.log(ctx.update.message);
  });
  bot.command("/poll", async (ctx) => {
    if (ctx.chat.type == "private") {
      ctx.reply("No se pueden hacer encuestas en chats privados");
      return;
    }
    let msg: string[] = ctx.message.text.replace("/poll ", "").split(")");
    try {
      let question = msg[0].replace(/[(]/g, "").replace("\n", "e");
      let options: string[] = JSON.parse(msg[1]);
      if (!options[1]) {
        ctx.reply("Necesito al menos 2 respuestas");
        return;
      }
      ctx.replyWithPoll(question, options, {
        is_anonymous: false,
      });
    } catch (error) {
      ctx.reply("Formato de encuesta incorrecto");
      return;
    }
  });
  bot.command("/kang", async (ctx) => {
    if (!ctx.message.reply_to_message) {
      ctx.reply("No detecto ningun sticker o imagen");
      return;
    }
    await kangSticker(ctx);
    
  });
  bot.command('/stickers', async (ctx) => {
    let query:string = ctx.message.text.replace('/stickers', '').trim()
    let page:number = parseInt(ctx.message.text.split(' ')[1])
    if(isNaN(page)){
      ctx.reply('numero de pagina invalido');
    }
    query = query.replace(`${page}`, '').trim()
    if(query.length < 3){
      ctx.reply('Ingrese al menos 3 caracteres');
      return;
    }
    await getStickers(ctx, query, page)
  });
  bot.command('/getsticker', async (ctx) => {
    let {sticker}:any = ctx.message.reply_to_message
    let {href} = await bot.telegram.getFileLink(sticker.file_id)
    await downloadSticker(ctx, href, sticker)
  });
}
