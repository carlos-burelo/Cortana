import { detectFormat, FormatI } from "../libs/type.detect";
import { Telegraf } from "telegraf";
import {
  get_account,
  get_prefs,
  set_goodbye,
  set_status,
  set_welcome,
} from "../controllers/welcome.contoller";
import { reply_detect_file } from "../libs/type.detect";
import { Chat, ReplyMessage } from "telegraf/typings/core/types/typegram";

export default function (bot: Telegraf) {
  bot.start(async (ctx) => {
    await get_account(ctx, ctx.chat.id);
  });
  bot.on("left_chat_member", async (ctx) => {
    const { goodbye } = await get_prefs(ctx.chat);
    if (goodbye.status == true) {
      // await reply_detect_file(ctx, goodbye, "Goodbye");
      return;
    } else {
      return;
    }
  });
  bot.command("/goodbye", async (ctx) => {
    let status: string = ctx.message.text.split(" ")[1];
    if (status == "on") {
      ctx.reply(await set_status(true, ctx.chat, "goodbye"));
      return;
    }
    if (status == "off") {
      ctx.reply(await set_status(false, ctx.chat, "goodbye"));
      return;
    } else {
      ctx.reply("Formato incorrecto");
      return;
    }
  });
  bot.command("/setgoodbye", async (ctx) => {
    let account: Chat = ctx.chat;
    if (!ctx.message.reply_to_message) {
      let text: string = ctx.message.text.replace("/setgoodbye ", "");
      let message = {
        source: text,
        type: "text",
      };
      await set_goodbye(account, message);
    } else {
      let reply_mesage: ReplyMessage = ctx.update.message.reply_to_message;
      let resp: FormatI = await detectFormat(reply_mesage);
      let message = {
        type: resp.type,
        source: resp.source,
      };
      await set_goodbye(account, message);
    }
    ctx.reply("Despedida establecida");
  });
  bot.on("new_chat_members", async (ctx) => {
    const { welcome } = await get_prefs(ctx.chat);
    if (welcome.status == true) {
      // await reply_detect_file(ctx, welcome, "Bienvenido");
      return;
    } else {
      return;
    }
  });
  bot.command("/setwelcome", async (ctx) => {
    let account = ctx.chat;
    if (!ctx.message.reply_to_message) {
      let text: string = ctx.message.text.replace("/setwelcome ", "");
      let message = {
        source: text,
        type: "text",
      };
      await set_welcome(account, message);
    } else {
      let reply_mesage: ReplyMessage = ctx.update.message.reply_to_message;
      let resp: FormatI = await detectFormat(reply_mesage);
      let message = {
        type: resp.type,
        source: resp.source,
      };
      await set_welcome(account, message);
    }
    ctx.reply("Bienvenida establecida");
  });
  bot.command("/welcome", async (ctx) => {
    let status: string = ctx.message.text.split(" ")[1];
    if (status == "on") {
      ctx.reply(await set_status(true, ctx.chat, "welcome"));
      return;
    }
    if (status == "off") {
      ctx.reply(await set_status(false, ctx.chat, "welcome"));
      return;
    } else {
      ctx.reply("Formato incorrecto");
      return;
    }
  });
  bot.command("/loliporn", async (ctx) => {
    ctx.reply("No");
  });
}
