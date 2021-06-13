import { Context } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import { connect, db } from "../../database";
import { BioI, ChatUserI } from "../interfaces";

export async function getBio(
  ctx: Context,
  user: ChatUserI,
  chat: any
): Promise<Message.TextMessage> {
  try {
    await connect(chat);
    let find = db(chat).get("bios").find({ id: user.id }).value();
    if (find !== undefined) {
      return ctx.reply(`${user.first_name}:\n${find.bio}`);
    } else {
      return ctx.reply(`${user.first_name} No tiene una biografia`);
    }
  } catch (error) {
    return ctx.reply(error.toString());
  }
}

export async function addOrUpdateBio(
  ctx: Context,
  data: any
): Promise<Message.TextMessage> {
  try {
    await connect(data.chat);
    let find = db(data.chat).get("bios").find({ id: data.userB.id }).value();
    let bio: BioI = {
      bio: data.text,
      first_name: data.userB.first_name,
      id: data.userB.id,
    };
    if (find !== undefined) {
      await updateBio(data.chat, data.userB, bio);
      return ctx.reply("Biografia actualizada", {
        reply_to_message_id: ctx.message.message_id,
      });
    } else {
      await addBio(data.chat, bio);
      return ctx.reply("Biografia creada", {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } catch (error) {
    return ctx.reply(error.toString());
  }
}

async function addBio(chat: any, bio: BioI) {
  await connect(chat);
  await db(chat).get("bios").push(bio).write();
}

async function updateBio(chat, user: ChatUserI, bio) {
  await connect(chat);
  await db(chat).get("bios").find({ id: user.id }).assign(bio).write();
}

export async function delBio(ctx: Context, data): Promise<Message.TextMessage> {
  try {
    await connect(data.chat);
    let find = db(data.chat).get("bios").find({ id: data.userB.id }).value();
    if (!find)
      return ctx.reply(
        `${data.userB.first_name} no tiene una biografia para eliminar`
      );
    await db(data.chat).get("bios").remove({ id: data.userB.id }).write();
    return ctx.reply(
      `La biogradia de ${data.userB.first_name} ha sido borrada`
    );
  } catch (error) {
    return ctx.reply(error.toString());
  }
}
