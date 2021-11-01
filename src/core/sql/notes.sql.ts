import { sql } from '.';
import { NoteI } from '@interfaces/sql';

/**
 * create one note in the notes table
 * and return the status of the query
 * @author Carlos Burelo
 * @date 2021-11-01
 * @param {NoteI} note
 * @return {Promise<boolean>}
 */
export async function insertNote(note: NoteI): Promise<boolean> {
  const { error } = await sql.from<NoteI>('notes').insert(note);
  if (error) return false;
  else return true;
}

export async function getNote(key: string, chatId: number): Promise<NoteI> {
  const { error, data } = await sql
    .from<NoteI>('notes')
    .select('*')
    .eq('key', key)
    .eq('chatId', chatId)
    .single();
  if (error) return undefined;
  else return data;
}

export async function getNotes(chatId: number): Promise<NoteI[]> {
  const { error, data } = await sql.from<NoteI>('notes').select('key').eq('chatId', chatId);
  console.log(data);
  if (error) return undefined;
  else return data;
}
export async function updateNote(note: NoteI): Promise<boolean> {
  const { error } = await sql
    .from<NoteI>('notes')
    .update(note)
    .eq('key', note.key)
    .eq('chatId', note.chatId);
  if (error) return false;
  else return true;
}
