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
