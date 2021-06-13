import { NoteI } from "../interfaces/index";
import { checkAccount, connect, createAccount, db } from "../../database";
import { Context } from "telegraf";
let not_exist = "La nota no existe";

// Main Functions
export async function getNotes(ctx, account: any): Promise<string> {
  let account_id = account.id.toString();
  try {
    if ((await checkAccount(account_id)) == true) {
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
        notas += "\nObten una nota con <code>#<i>notename</i></code>";
        return notas;
      }
    } else {
      return "La cuenta no existe";
    }
  } catch (error) {
    return "Error en notes.controller.ts";
  }
}
export async function getNote(ctx, account: any, notename: string) {
  try {
    await connect(account);
    const note: NoteI = db(account).get("notes").find({ id: notename }).value();
    if (note !== undefined) {
      return await getNote_method(ctx, note);
    } else {
      return not_exist;
    }
  } catch (error) {
    return "Error en notes.controller.ts";
  }
}
export async function getOrUpdateNote(ctx, account: any, note: NoteI) {
  try {
    if ((await checkAccount(account.id)) == true) {
      const find = await getNote(ctx, account, note.id);
      if (find == not_exist) {
        const res = await addNote(account, note);
        return res;
      } else {
        const res = await updateNote(account, note);
        return res;
      }
    } else {
      let account = ctx.getChat();
      await createAccount(account);
      const res = await addNote(account, note);
      return res;
    }
  } catch (error) {}
}
export async function addNote(account, note: NoteI): Promise<string> {
  note.content = note.content.replace(/["]/g, "'");
  await connect(account);
  await db(account).get("notes").push(note).write();
  return "Nota agregada";
}
export async function updateNote(account, note: NoteI): Promise<string> {
  await connect(account);
  await db(account).get("notes").find({ id: note.id }).assign(note).write();
  return "Nota actualizada";
}
export async function deleteNote(account: any, note_id: string) {
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
export async function getNote_method(ctx: Context<any>, note: NoteI) {
  const { message_id } = ctx.message;
  if (note.type == "text") {
    let note_parced = note.content.replace(/[{}]/g, "`");
    note_parced = note_parced.replace(/[']/g, '"');
    return ctx.replyWithMarkdown(note_parced, {
      reply_to_message_id: message_id,
    });
  }
  if (note.type == "photo") {
    console.log(note.id);
    return ctx.replyWithPhoto(note.content, {
      reply_to_message_id: message_id,
      parse_mode: "Markdown",
      caption: `\`#${note.id}\``,
    });
  }
  if (note.type == "document") {
    return ctx.replyWithDocument(note.content, {
      reply_to_message_id: message_id,
      parse_mode: "Markdown",
      caption: `\`#${note.id}\``,
    });
  }
  if (note.type == "audio") {
    return ctx.replyWithAudio(note.content, {
      reply_to_message_id: message_id,
      parse_mode: "Markdown",
      caption: `\`#${note.id}\``,
    });
  }
  if (note.type == "sticker") {
    return ctx.replyWithAudio(note.content, {
      reply_to_message_id: message_id,
      parse_mode: "Markdown",
      caption: `\`#${note.id}\``,
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
