import { FileI } from "../interfaces/index";
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
export async function detectFormat(
  message,
  words?: string[]
): Promise<FormatI> {
  let arrl: string[] = Object.keys(message);
  let type: any = arrl[arrl.length - 1];
  let source;
  let reply: FileI = message;
  if (type == "caption_entities") {
    type = "text";
    source = await replaceWords(reply.caption, words);
  }
  if (type == "entities" || type == "text") {
    type = "text";
    source = await replaceWords(reply.text, words);
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
