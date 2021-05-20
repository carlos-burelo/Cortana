import { owner } from "../config";

export async function reply_detect_file(ctx, note, operartion: string) {
  try {
    const { message_id } = ctx.message;
    if (note.type == "text") {
      let member = ctx.update.message.new_chat_member;
      if (member.id === owner.id) {
        return ctx.reply(`${operartion} my owner`);
      } else {
        note.source = note.source.replace("{first_name}", member.first_name);
        note.source = note.source.replace(
          "{last_name}",
          member.last_name || undefined
        );
        note.source = note.source.replace(
          "{username}",
          `@${member.first_name}`
        );
        note.source = note.source.replace("{id}", member.id);
        return await ctx.replyWithMarkdown(note.source, {
          reply_to_message_id: message_id,
        });
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
