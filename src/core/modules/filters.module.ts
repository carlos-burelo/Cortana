import {
  getFilter,
  getFilters,
  setFilter,
  stopFilter,
} from "../controllers/filters.controller";
import { Telegraf } from "telegraf";
import { detectFormat, sendMethod } from "../libs/type.detect";
import { FilterI } from "../interfaces";
import { connect, db } from "../../database";

export default async function (bot: Telegraf) {
  bot.command("/filter", async (ctx) => {
    let word: string[] | string = ctx.message.text.match(/![^\s]+/gi);
    if (!word) {
      ctx.reply("Establezca una palabra para el filtro");
      return;
    }
    word = word[0].replace(/!/g, "");
    if (!ctx.message.reply_to_message) {
      let text: string = ctx.message.text;
      let regex: RegExp = /(\".*?")/gi;
      let match: string[];
      let filters: string[] = [];
      while ((match = regex.exec(text)) !== null) {
        filters.push(match[1].replace(/"/g, ""));
      }
      if (filters.length == 0) {
        ctx.reply("Establezca respuestas para el filtro");
        return;
      }
      let newFilter: FilterI = {
        id: word,
        type: "text",
        strings: filters,
      };
      await setFilter(ctx, newFilter);
    } else {
      let { source, type } = await detectFormat(ctx.message.reply_to_message);
      let newFilter: FilterI = {
        id: word,
        type,
        source,
      };
      await setFilter(ctx, newFilter);
    }
  });
  bot.command("/filterinfo", async (ctx) => {
    if (ctx.chat.type !== "private") {
      let filter: string = ctx.message.text.replace(/\/filterinfo/, "").trim();
      await getFilter(ctx, filter);
    } else {
      ctx.reply("Este comando no esta disponible en chats privados");
    }
  });
  bot.command("/filters", async (ctx) => {
    await getFilters(ctx);
  });
  bot.hears(/^[\w]+/gi, async (ctx) => {
    let text: string = ctx.message.text;
    await connect(ctx.chat);
    let filters = db(ctx.chat).get("filters").value();
    if (filters !== undefined) {
      filters.forEach(async (a) => {
        if (text.includes(a.id)) {
          if (a.strings) {
            ctx.reply(a.strings[Math.floor(Math.random() * a.strings.length)]);
          } else {
            await sendMethod(ctx, a);
          }
        }
      });
    }
  });
  bot.command("/stop", async (ctx) => {
    let filter: string = ctx.message.text.split(" ")[1];
    stopFilter(ctx, filter);
  });
}
