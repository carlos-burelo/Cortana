import axios from "axios";
import { Telegraf } from "telegraf";
import { owner } from "../config";
import { saveOrUpdateNote } from "./components/notes.controller";
import { fileInterface } from "./models/files";

export default function(bot:Telegraf) {
  bot.command('/add', async(ctx) => {
    const user_id = ctx.chat.id.toString();
    if (!ctx.update.message.reply_to_message) {
      let { text }:any = ctx.update.message;
      let clean = text.split(' ');
      if (!clean[1]) {
        ctx.reply('❗ No existe un nombre de nota');
        return;
      }
      if (!clean[2]) {
        ctx.reply('❗ No existe contenido');
        return;
      }
      let name = clean[1]
      let txt = text.replaceAll(`/add ${name} `, '').replace(/["]/g, "'");
      try {
        const check = await axios.get(`${owner.db}/notes`);
        const search = check.data.find(i => i.id == user_id);
        let user = ctx.update.message.from
        let note = {
          user: user.first_name,
          name: name,
          type: 'text',
          content: txt
        }
        await saveOrUpdateNote(search, ctx, note)

      } catch (error) {
        ctx.reply('❗ No se pudo guardar la nota')
      }

    } else {
      let name = ctx.update.message.text.split(' ')[1];
      if (name == undefined) {
        ctx.reply('❗ No se detecto un nombre');
        return;
      }
      let arrl = Object.keys(ctx.update.message.reply_to_message);
      let tipo = arrl[arrl.length - 1];
      let source;
      let reply:fileInterface = ctx.update.message.reply_to_message
      tipo == "text" ? (source = reply.text.replace(/["]/g, "'")) :
        tipo == "photo" ? (source = reply.photo[0].file_id) :
        tipo == "sticker" ? (source = reply.sticker.file_id) :
        tipo == "document" ? (source = reply.document.file_id) :
        tipo == "video" ? (source = reply.video.file_id) :
        tipo == "audio" ? (source = reply.audio.file_id) :
        "indefinido";
      try {
        const check = await axios.get(`${owner.db}/notes`);
        const search = check.data.find(i => i.id == user_id);
        let user = ctx.update.message.from
        let note = {
          user: user.first_name,
          name: name,
          type: tipo,
          content: source
        }
        await saveOrUpdateNote(search, ctx, note)
      } catch (error) {
        ctx.reply('❗ No se pudo guardar la nota')
      }
    }
  });
  bot.command("/notes", async(ctx) => {
    const db = ctx.chat.id.toString();
    try {
      const res = await axios.get(`${owner.db}/notes`);
      const find = res.data.find(b => b.id == db);
      if (find == undefined) {
        ctx.reply('Añada una nota para crear una base de datos');
        return;
      } else {
        const { notes } = find;
        if(notes.length == 0){
          ctx.reply('No hay notas en el chat');
          return;
        }
        const chat = await ctx.getChat();
        let account;
        let title:string = '';
        if (chat.type == 'private') {
          account = chat.first_name
          title = '<b>📋 Notas personales</b>'
        } else {
          account = chat.title
          title = `<b>📋 Notas en ${account}</b>`
        }
        let notas = '';
        notas += `${title}\n\n`
        notes.map((note, i) => {
          let indice1 = i + 1;
          let indice = indice1 <= 9 ? `0${indice1}` : `${indice1}`;
          notas += `<b>${indice} - </b><code>${note.name}</code>\n`;
        });
        notas += '\nObten las notas con <code>/get</code>'
        const { message_id } = ctx.message;
        await ctx.replyWithHTML(notas, { reply_to_message_id: message_id });
      }
    } catch (error) {
      ctx.reply('No se pudo obtener las notas')
    }
  });
  bot.command("/get", async(ctx) => {
    try {
      const db = ctx.chat.id.toString();
      let notename1 = ctx.message.text.split(" ");
      let notename = notename1[1];
      const res = await axios.get(`${owner.db}/notes/${db}/notes/${notename}`);
      const note = res.data;
      !note ? ctx.replyWithHTML(`<b>${notename}</b> no existe en mi base de datos`) :
        note.type == "text" ? ctx.replyWithMarkdown(note.content.replace(/[\\]/g, '').replace(/[{}]/g, "`")) :
        note.type == "photo" ? ctx.replyWithPhoto(note.content) :
        note.type == "sticker" ? ctx.replyWithSticker(note.content) :
        note.type == "document" ? ctx.replyWithDocument(note.content) :
        note.type == "video" ? ctx.replyWithVideo(note.content) :
        note.type == "audio" ? ctx.replyWithAudio(note.content) : ctx.reply("tipo de archivo desconocido");
    } catch (error) {
      ctx.reply('No se pudo obtener la nota')
    }
  });
  bot.command("/del", async(ctx) => {
    const db = ctx.chat.id.toString();
    let note:any = ctx.update.message.text.split(" ");
    note = note[1];
    await axios.delete(`${owner.db}/notes/${db}/notes/${note}`);
    ctx.replyWithMarkdown(`🗑️ ${note} se elimino`);
  });
};