import axios from "axios";
import { api_urls } from "../../config";

import { Telegraf } from "telegraf";
import {
  formatMagisk,
  getTWRP,
  getFirmware,
} from "../controllers/android.controller";

export default function (bot: Telegraf) {
  bot.command("/magisk", async (ctx) => {
    const {
      data: { magisk: stable },
    } = await axios.get(`${api_urls.magisk}/stable.json`);
    const {
      data: { magisk: canary },
    } = await axios.get(`${api_urls.magisk}/stable.json`);
    let response: string = await formatMagisk(stable, canary);
    ctx.replyWithMarkdown(response);
  });
  bot.command("/fw", async (ctx) => {
    let message: string[] = ctx.update.message.text.split(" ");
    let model: string = message[1];
    if (!model) {
      ctx.reply("Porfavor coloque algun modelo");
      return;
    }
    model.match(/SM-/i) ? (model = model.replace(/SM-/i, "")) : model;
    model = model.toUpperCase();
    let csc: string = message[2];
    if (!csc) {
      ctx.reply("Porfavor coloque la region");
      return;
    }
    csc = csc.toUpperCase();
    await getFirmware(ctx, model, csc);
  });
  bot.command("/twrp", async (ctx) => {
    let device = ctx.message.text.split(" ")[1];
    if (!device) {
      ctx.reply("Coloque un dispositivo");
      return;
    }
    try {
      const { data } = await axios.get(`${api_urls.twrp}/${device}/`);
      const res: string = await getTWRP(data, device);
      ctx.replyWithHTML(res);
    } catch (error) {
      ctx.reply("Error en la solicitud o dispositivo no encontrado");
    }
  });
}
