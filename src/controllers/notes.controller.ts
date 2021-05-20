import { FileI, NoteI } from "../interfaces/controllers";
import { check_account, connect, create_account, db } from "../database";
let not_exist = "La nota no existe";

// Main Functions
export async function get_notes(ctx, account: any): Promise<string> {
  let account_id = account.id.toString();
  try {
    if ((await check_account(account_id)) == true) {
      await connect(account);
      const notes = db(account).get("notes").value();
      if (notes.length == 0) {
        return "No hay notas en este chat";
      } else {
        const chat = await ctx.getChat();
        let account;
        let title: string = "";
        if (chat.type == "private") {
          account = chat.first_name;
          title = "<b>📋 Notas personales</b>";
        } else {
          account = chat.title;
          title = `<b>📋 Notas en ${account}</b>`;
        }
        let notas: string = "";
        notas += `${title}\n\n`;
        notes.map((note, i) => {
          let indice1 = i + 1;
          let indice = indice1 <= 9 ? `0${indice1}` : `${indice1}`;
          notas += `<b>${indice} - </b><code>${note.id}</code>\n`;
        });
        notas += "\nObten las notas con <code>/g <i>notename</i></code>";
        return notas;
      }
    } else {
      return "La cuenta no existe";
    }
  } catch (error) {
    return "Error en notes.controller.ts";
  }
}
export async function get_note(ctx, account: any, notename: string) {
  try {
    await connect(account);
    const note: NoteI = db(account).get("notes").find({ id: notename }).value();
    if (note !== undefined) {
      return await get_note_method(ctx, note);
    } else {
      return not_exist;
    }
  } catch (error) {
    return "Error en notes.controller.ts";
  }
}
export async function add_or_update_note(ctx, account: any, note: NoteI) {
  try {
    if ((await check_account(account.id)) == true) {
      const find = await get_note(ctx, account, note.id);
      if (find == not_exist) {
        const res = await add_note(account, note);
        return res;
      } else {
        const res = await update_note(account, note);
        return res;
      }
    } else {
      let account = ctx.getChat();
      await create_account(account);
      const res = await add_note(account, note);
      return res;
    }
  } catch (error) {}
}
export async function add_note(account, note: NoteI): Promise<string> {
  note.content = note.content.replace(/["]/g, "'");
  await connect(account);
  await db(account).get("notes").push(note).write();
  return "Nota agregada";
}
export async function update_note(account, note: NoteI): Promise<string> {
  await connect(account);
  await db(account).get("notes").find({ id: note.id }).assign(note).write();
  return "Nota actualizada";
}
export async function delete_note(account: any, note_id: string) {
  await connect(account);
  const note: NoteI = db(account).get("notes").find({ id: note_id }).value();
  if (note !== undefined) {
    await connect(account);
    await db(account).get("notes").remove({ id: note_id }).write();
    return "Nota eliminada";
  } else {
    return "La nota no existe";
  }
}
//Extra functions

export interface FormatI {
  tipo: string;
  source: string;
}
export async function detect_format(message): Promise<FormatI> {
  let arrl = Object.keys(message);
  let tipo = arrl[arrl.length - 1];
  let source;
  let reply: FileI = message;
  if (tipo == "caption_entities") {
    tipo = "markdown";
    source = reply.caption;
    source = source.replace("/save ", "");
    source = source.replace("/add ", "");
  }
  if (tipo == "entities" || tipo == "text") {
    tipo = "text";
    source = reply.text.replace(/["]/g, "'");
    source = source.replace("/save ", "");
    source = source.replace("/add ", "");
  }
  tipo == "photo"
    ? (source = reply.photo[0].file_id)
    : tipo == "sticker"
    ? (source = reply.sticker.file_id)
    : tipo == "document"
    ? (source = reply.document.file_id)
    : tipo == "video"
    ? (source = reply.video.file_id)
    : tipo == "audio"
    ? (source = reply.audio.file_id)
    : "indefinido";
  let response: FormatI = { tipo, source };
  return response;
}
export async function get_note_method(ctx, note: NoteI) {
  const { message_id } = ctx.message;
  if (note.type == "text") {
    let note_parced = note.content.replace(/[{}]/g, "`");
    note_parced = note_parced.replace(/[']/g, '"');
    return ctx.replyWithMarkdown(note_parced, {
      reply_to_message_id: message_id,
    });
  }
  if (note.type == "photo") {
    return ctx.replyWithPhoto(note.content, {
      reply_to_message_id: message_id,
    });
  }
  if (note.type == "document") {
    return ctx.replyWithDocument(note.content, {
      reply_to_message_id: message_id,
    });
  }
  if (note.type == "audio") {
    return ctx.replyWithAudio(note.content, {
      reply_to_message_id: message_id,
    });
  }
  if (note.type == "sticker") {
    return ctx.replyWithAudio(note.content, {
      reply_to_message_id: message_id,
    });
  }
  if (note.type == "video") {
    return ctx.replyWithVideo(note.content, {
      reply_to_message_id: message_id,
    });
  } else {
    return ctx.replyWithMarkdown(note.content, {
      reply_to_message_id: message_id,
    });
  }
}
