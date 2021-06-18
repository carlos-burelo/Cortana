import { NoteI } from "../interfaces";
import { checkAccount, checkCollection, connect, createAccount, db } from "../../database";
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
      // return await getNote_method(ctx, note);
    } else {
      return not_exist;
    }
  } catch (error) {
    return "Error en notes.controller.ts";
  }
}
export async function addOrUpdateNote(ctx:Context, note: NoteI) {
  try {
    await connect(ctx.chat);
    await checkCollection(ctx.chat, 'notes');
    if(db(ctx.chat).get('notes').find({id: note.id}).value() !== undefined){
      await db(ctx.chat).get("notes").remove({ id: note.id }).write();
      db(ctx.chat).get("notes").push(note).write();
      ctx.replyWithMarkdown(`La nota \`${note.id}\` ha sido actualizada`)
    } else {
      
      db(ctx.chat).get("notes").push(note).write();
      ctx.replyWithMarkdown(`\`${note.id}\` se ha añadido a las *notas*`)
    }
  } catch (error) {
    ctx.reply(error.toString())
  }
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
// export async function getNote_method(ctx: Context<any>, note: NoteI) {
//   const { message_id } = ctx.message;
//   if (note.type == "text") {
//     let note_parced = note.content.replace(/[{}]/g, "`");
//     note_parced = note_parced.replace(/[']/g, '"');
//     return ctx.replyWithMarkdown(note_parced, {
//       reply_to_message_id: message_id,
//     });
//   }
//   if (note.type == "photo") {
//     console.log(note.id);
//     return ctx.replyWithPhoto(note.content, {
//       reply_to_message_id: message_id,
//       parse_mode: "Markdown",
//       caption: `\`#${note.id}\``,
//     });
//   }
//   if (note.type == "document") {
//     return ctx.replyWithDocument(note.content, {
//       reply_to_message_id: message_id,
//       parse_mode: "Markdown",
//       caption: `\`#${note.id}\``,
//     });
//   }
//   if (note.type == "audio") {
//     return ctx.replyWithAudio(note.content, {
//       reply_to_message_id: message_id,
//       parse_mode: "Markdown",
//       caption: `\`#${note.id}\``,
//     });
//   }
//   if (note.type == "sticker") {
//     return ctx.replyWithAudio(note.content, {
//       reply_to_message_id: message_id,
//       parse_mode: "Markdown",
//       caption: `\`#${note.id}\``,
//     });
//   }
//   if (note.type == "video") {
//     return ctx.replyWithVideo(note.content, {
//       reply_to_message_id: message_id,
//     });
//   } else {
//     return ctx.replyWithMarkdown(note.content, {
//       reply_to_message_id: message_id,
//     });
//   }
// }

export async function sendNote(ctx:Context, noteid:string) {
  await connect(ctx.chat)
  let note = db(ctx.chat).get('notes').find({id: noteid}).value()
  if(note == undefined){
    return ctx.replyWithMarkdown(`La nota ${note} no existe en mi base de datos`)
  }
  try {
    switch (note.type) {
      case 'text':
        ctx.reply(note.text, {
          ...(note.entities) && {entities:note.entities},
          ...(note.reply_markup) &&{reply_markup: note.reply_markup}
        })
      break;
      case 'photo':
        ctx.replyWithPhoto(note.photo, {
          ...(note.entities) && {entities:note.entities},
          ...(note.reply_markup) &&{reply_markup: note.reply_markup}
        })
      break;
      case 'document':
        ctx.replyWithDocument(note.document, {
          ...(note.entities) && {entities:note.entities},
          ...(note.reply_markup) &&{reply_markup: note.reply_markup}
        })
      break;
      case 'sticker':
        ctx.replyWithSticker(note.sticker, {
          ...(note.entities) && {entities:note.entities},
          ...(note.reply_markup) &&{reply_markup: note.reply_markup}
        })
      break;
      case 'audio':
        ctx.replyWithAudio(note.audio, {
          ...(note.entities) && {entities:note.entities},
          ...(note.reply_markup) &&{reply_markup: note.reply_markup}
        })
      break;
      case 'voice':
        ctx.replyWithVoice(note.voice, {
          ...(note.entities) && {entities:note.entities},
          ...(note.reply_markup) &&{reply_markup: note.reply_markup}
        })
      break;
      case 'video':
        ctx.replyWithVideo(note.video, {
          ...(note.entities) && {entities:note.entities},
          ...(note.reply_markup) &&{reply_markup: note.reply_markup}
        })
      break;
      default:

        break;
    }
  } catch (error) {
    ctx.reply(error.toString())
  }
};