import { FilterI } from "../interfaces";
import { Context } from "telegraf";
import { connect, checkCollection, db } from "../../database";

export async function setFilter(ctx: Context, newFilter: FilterI) {
  try {
    await connect(ctx.chat);
    checkCollection(ctx.chat, "filters");
    let data = db(ctx.chat).get("filters").find({ id: newFilter.id }).value();
    if (data == undefined) {
      await connect(ctx.chat);
      db(ctx.chat).get("filters").push(newFilter).write();
      ctx.replyWithMarkdown(
        `\`${newFilter.id}\` ha sido añadido a los *filtros*`
      );
    }
  } catch (error) {
    ctx.reply(error.toString());
  }
}
export async function stopFilter(ctx: Context, filter: string) {
  try {
    await connect(ctx.chat);
    await checkCollection(ctx.chat, "filters");
    let data = db(ctx.chat).get("filters").find({ id: filter }).value();
    if (data == undefined) {
      ctx.replyWithMarkdown(
        `El filtro \`${filter}\` no existe en mi base de datos`
      );
    } else {
      db(ctx.chat).get("filters").remove({ id: filter }).write();
      ctx.replyWithMarkdown(`El filtro: \`${filter}\` fue removido`);
    }
  } catch (error) {
    ctx.reply(error.toString());
  }
}
export async function getFilters(ctx: Context) {
  try {
    await connect(ctx.chat);
    await checkCollection(ctx.chat, "filters");
    let filters = db(ctx.chat).get("filters").value();
    let { title }: any = await ctx.getChat();
    if (filters.length !== 0) {
      let text = `Filtros en *${title}*\n\n`;
      filters.forEach((a, i) => {
        text += `${i}  \`${a.id}\`\n`;
      });
      ctx.replyWithMarkdown(text);
    } else {
      ctx.replyWithMarkdown(`No ahy filtros en este chat`);
    }
  } catch (error) {
    ctx.reply(error.toString());
  }
}
export async function getFilter(ctx: Context, filter: string) {
  try {
    await connect(ctx.chat);
    await checkCollection(ctx.chat, "filters");
    let filters: FilterI[] = db(ctx.chat).get("filters").value();
    let search: FilterI | undefined = filters.find((a) => a.id === filter);
    if (search == undefined) {
      ctx.replyWithMarkdown(
        `El *filtro* \`${filter}\` no existe en mi base de datos`
      );
      return;
    } else {
      let text = `Descricion del *filtro*: \`${filter}\` \n\n`;
      text += `*Tipo:*  _${search.type}_\n`;
      if (search.strings) {
        text += `*Respuestas:* \n`;
        search.strings.forEach((a) => {
          text += `${a}`;
        });
      } else {
        text += `*Id:*  \`${search.source}\``;
      }
      ctx.replyWithMarkdown(text);
    }
  } catch (error) {
    ctx.reply(error.toString());
  }
}
