import { FileI, NoteI, ReplyI } from "../interfaces";
import { Context } from "telegraf";
import { owner } from "../../config";

export interface messageContext {
  source: string;
  type:
    | "text"
    | "photo"
    | "document"
    | "audio"
    | "sticker"
    | "video"
    | "caption"
    | "entities";
}
export interface FormatI {
  type: string;
  source: string;
}

export async function detectMsgFormat(reply: ReplyI | any, id?:string) {
  let props: string[] = Object.keys(reply);
  let note: NoteI = {};
  props.forEach((a) => {
    if (
      a !== "message_id" &&
      a !== "from" &&
      a !== "chat" &&
      a !== "date" &&
      a !== "animation" &&
      a !== "edit_date" &&
      a !== "caption_entities" &&
      a !== "author_signature" &&
      a !== "forward_from_chat" &&
      a !== "forward_date" &&
      a !== "forward_from_message_id" &&
      a !== "sender_chat"
    ) {
      note[a] = reply[a];
    }
  });
  note.type = Object.keys(note)[0]
  note.document
    ? (note.document = note.document.file_id)
    : note.photo
    ? (note.photo = note.photo[0].file_id)
    : note.sticker
    ? (note.sticker = note.sticker.file_id)
    : note.audio
    ? (note.audio = note.audio.file_id)
    : note.voice
    ? (note.voice = note.voice.file_id)
    : note.video
    ? (note.video = note.video.file_id)
    : note;
    id ? note.id = id : note
  return note;
}



export async function detectFormat(
  message,
  words?: string[]
): Promise<FormatI> {
  let arrl: string[] = Object.keys(message);
  let type: any = arrl[arrl.length - 1];
  let source;
  let reply: FileI = message;
  if (words) {
    if (type == "caption_entities") {
      type = "text";
      source = await replaceWords(reply.caption, words);
    }
    if (type == "entities" || type == "text") {
      type = "text";
      source = await replaceWords(reply.text, words);
    }
  }
  type == "photo"
    ? (source = reply.photo[0].file_id)
    : type == "sticker"
    ? (source = reply.sticker.file_id)
    : type == "document"
    ? (source = reply.document.file_id)
    : type == "video"
    ? (source = reply.video.file_id)
    : type == "audio"
    ? (source = reply.audio.file_id)
    : type == "voice"
    ? (source = reply.voice.file_id)
    : "indefinido";
  let response = { type, source };
  return response;
}
export async function replaceWords(text: string, words: string[]) {
  try {
    words.forEach((a) => {
      text = text.replace(a, "");
    });
    console.log(text);
    return text;
  } catch (error) {
    return text;
  }
}
export async function parseVars(variables: any, text: string) {
  let keys: string[] = Object.keys(variables);
  keys.forEach((a: string) => {
    text = text.replace(`{${a}}`, variables[a]);
  });
  console.log(text);
}

export async function sendMethod(
  ctx: Context,
  msg: { source?: string; type?: string }
) {
  switch (msg.type) {
    case "sticker":
      // ctx.telegram.sendSticker(account, msg.source);
      ctx.replyWithSticker(msg.source);
      break;
    case "photo":
      // ctx.telegram.sendPhoto(account, msg.source);
      ctx.replyWithPhoto(msg.source);
      break;
    case "video":
      ctx.replyWithVideo(msg.source);
      break;
    case "audio":
      // ctx.telegram.sendAudio(account, msg.source);
      ctx.replyWithAudio(msg.source);
      break;
    case "voice":
      // ctx.telegram.sendVoice(account, msg.source);
      ctx.replyWithVideo(msg.source);
      break;
    case "document":
      // ctx.telegram.sendDocument(account, msg.source);
      ctx.replyWithDocument(msg.source);
      break;
    default:
      // ctx.telegram.sendMessage(account, msg.source);
      try {
        ctx.replyWithMarkdown(msg.source);
      } catch (error) {
        ctx.reply(msg.source);
      }
      break;
  }
}

export async function reply_file(ctx: Context, msg: messageContext) {
  const { message_id } = ctx.message;
  try {
    if (msg.type == "text") {
      return await ctx.replyWithMarkdown(msg.source, {
        reply_to_message_id: message_id,
      });
    }
    if (msg.type == "photo") {
      return await ctx.replyWithPhoto(msg.source, {
        reply_to_message_id: message_id,
      });
    }
    if (msg.type == "document") {
      return await ctx.replyWithDocument(msg.source, {
        reply_to_message_id: message_id,
      });
    }
    if (msg.type == "audio") {
      return await ctx.replyWithAudio(msg.source, {
        reply_to_message_id: message_id,
      });
    }
    if (msg.type == "sticker") {
      return await ctx.replyWithAudio(msg.source, {
        reply_to_message_id: message_id,
      });
    }
    if (msg.type == "video") {
      return await ctx.replyWithVideo(msg.source, {
        reply_to_message_id: message_id,
      });
    }
  } catch (error) {
    return ctx.reply(error.toString(), { reply_to_message_id: message_id });
  }
}
export async function reply_detect_file(ctx, note: FormatI, operation: string) {
  try {
    const { message_id } = ctx.message;
    if (note.type == "text") {
      let member = ctx.update.message.new_chat_member;

      if (member.id === owner.id) {
        return ctx.reply(`${operation} my owner`);
      } else {
        if (operation == "welcome" || operation == "goodbye") {
          let resp = await parseVars(member, note.source);
          return await ctx.replyWithMarkdown(resp, {
            reply_to_message_id: message_id,
          });
        }
      }
    }
    if (note.type == "photo") {
      return await ctx.replyWithPhoto(note.source, {
        reply_to_message_id: message_id,
      });
    }
    if (note.type == "document") {
      return await ctx.replyWithDocument(note.source, {
        reply_to_message_id: message_id,
      });
    }
    if (note.type == "audio") {
      return await ctx.replyWithAudio(note.source, {
        reply_to_message_id: message_id,
      });
    }
    if (note.type == "sticker") {
      return await ctx.replyWithAudio(note.source, {
        reply_to_message_id: message_id,
      });
    }
    if (note.type == "video") {
      return await ctx.replyWithVideo(note.source, {
        reply_to_message_id: message_id,
      });
    } else {
      return await ctx.replyWithMarkdown(note.source, {
        reply_to_message_id: message_id,
      });
    }
  } catch (error) {
    return ctx.reply(error.toString());
  }
}
