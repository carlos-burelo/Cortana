import axios from "axios";
import { owner } from "../../config";


export async function saveOrUpdateNote(search, ctx, note) {
  if (search == undefined) {
    let newDB = {
      id: ctx.chat.id.toString(),
      account: ctx.chat.username,
      type: ctx.chat.type,
      notes: []
    };
    await axios.post(`${owner.db}/notes`, newDB);
    await axios.post(`${owner.db}/notes/${newDB.id}/notes`, note);
    return ctx.reply('Nota agregada');
  } else {
    const userid = ctx.chat.id
    const res = await axios.get(`${owner.db}/notes/${userid}/notes`);
    let arr = res.data;
    const search = arr.find(i => i.name == note.name);
    if (search == undefined) {
      await axios.post(`${owner.db}/notes/${userid}/notes`, note);
      return ctx.reply('📍 Nota agregada')
    } else {
      await axios.put(`${owner.db}/notes/${userid}/notes/${note.name}`, note);
      return ctx.reply('🔄 Nota actualizada')
    }

  }
}