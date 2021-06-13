import { addOrUpdateBio, delBio, getBio } from "../controllers/bios.controller";
import { Telegraf } from "telegraf";
import { Chat, ReplyMessage, User } from "telegraf/typings/core/types/typegram";

export default function (bot: Telegraf) {
  bot.command("/bio", async (ctx) => {
    let user: ReplyMessage | User = ctx.message.reply_to_message;
    if (user == undefined) {
      ctx.reply("Responda al mensaje de usuario");
      return;
    }
    user = user.from;
    let { chat } = ctx;
    await getBio(ctx, user, chat);
  });
  bot.command("/setbio", async (ctx) => {
    let text: string = ctx.message.text.replace(/\/setbio/g, "").trim();
    let chat: Chat.SupergroupChat | any = ctx.chat;
    let userA: number = ctx.message.from.id;
    let userB: ReplyMessage | User = ctx.message.reply_to_message;
    if (userB == undefined) {
      ctx.reply("Responda al mensaje de usuario");
      return;
    }
    if (text.length == 0) {
      ctx.reply("Coloque algo en la biografia");
      return;
    }
    userB = userB.from;
    let data: any = {
      text,
      chat,
      userA,
      userB,
    };

    await addOrUpdateBio(ctx, data);
  });
  bot.command("/delbio", async (ctx) => {
    let text: string = ctx.message.text.replace(/\/setbio/g, "").trim();
    let chat: Chat.SupergroupChat | any = ctx.chat;
    let userA: number = ctx.message.from.id;
    let userB: ReplyMessage | User = ctx.message.reply_to_message;
    if (userB == undefined) {
      ctx.reply("Responda al mensaje de usuario");
      return;
    }
    if (text.length == 0) {
      ctx.reply("Coloque algo en la biografia");
      return;
    }
    userB = userB.from;
    let data: any = {
      text,
      chat,
      userA,
      userB,
    };
    await delBio(ctx, data);
  });
}
