import axios from "axios";
import { Telegraf } from "telegraf";
import { api_urls } from "../config";

export default function(bot:Telegraf) {
  bot.command("/lastest", async(ctx) => {
    try {
      const res = await axios.get(`${api_urls.monoschinos}/lastest`);
      if (res.data.animes.length == 0) {
        ctx.reply('API no disponible')
      } else {
        let animes = '';
        animes += `*Ultimos capitulos* \n\n`
        res.data.animes.forEach((a) => {
          a.nEpisode <= 9 ? a.nEpisode = `0${a.nEpisode}` : a.nEpisode
          animes += `*${a.nEpisode}* - ${a.title}\n`;
        });
        ctx.replyWithMarkdown(animes)
      }
    } catch (e) {
      ctx.reply('API no disponible')
    }
  });
  bot.command("/emision", async(ctx) => {
    const res = await axios.get(`${api_urls.monoschinos}/emision`);
    if (res.data.animes.length == 0) {
      ctx.reply('API no disponible')
    } else {
      let animes = '';
      animes += `<b>Ultimos Animes</b>\n\n`
      res.data.animes.forEach((a, i) => {
        let indice1 = i + 1;
        let index = indice1 < 10 ? `0${indice1}` : `${indice1}`;
        animes += `<b>${index}</b> - ${a.title}\n`;
      });
      ctx.replyWithHTML(animes)
    }
  });
  bot.command("/anime", async (ctx) => {
    let anime:any = ctx.update.message.text.replace("/anime ", "");
    anime = anime.replaceAll(" ", "+");
    const res  = await axios.get(`${api_urls.monoschinos}/search/${anime}`);
    if(res.data.length == 0){
      ctx.reply("La API parece no estar disponible");
    } else {
      if (res.data.animes.length == 0) {
        ctx.reply("No se encontraron resultados");
      } else {
        let _animes = '';
        let anime_array = res.data.animes;
        _animes += `Animes encontrados\n\n`;
        anime_array.forEach((a) => {
          a.id = a.id.replace("-sub-espanol", "");
          _animes += `<code>${a.id}</code>\n`;
        });
        ctx.replyWithHTML(_animes);
        ctx.replyWithHTML(
          `Para obtener uno en especifico, escriba\n` +
          `<code>/getanime</code> animeid`
        );
      }
    }
  });
  bot.command("/getanime", async(ctx) => {
    let animestring = ctx.update.message.text.split(" ");
    let anime = `${animestring[1]}-sub-espanol`;
    if (anime == "undefined-sub-espanol") {
      ctx.reply("Porfavor ingrese un nombre valido");
    } else {
      const { data} = await axios.get(`${api_urls.monoschinos}/anime/${anime}`);
        const a = data;
        let genders = '';
        a.genders.forEach((g) => {
          genders += `${g.title} `;
        });
        ctx.replyWithMarkdown(
        `*Titulo:* ${a.title}\n` +
        `*Descripcion:* ${a.description}\n` +
        `*Status:* ${a.status}\n` +
        `*Estreno:* ${a.date}\n` +
        `*Generos:* ${genders}\n` +
        `*No. Episodios:* ${a.episodes.length}`
      );
    };
  });
};