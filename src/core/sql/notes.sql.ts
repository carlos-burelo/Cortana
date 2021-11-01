import { sql } from '.';
import { NoteI } from '@interfaces/sql';
/**
 * SQL: notes table
 * create one note in the notes table
 * and return the status of the query
 *
 * @param  {NoteI} note
 * @return {Promise<number>}
 */
export async function insertNote(note: NoteI): Promise<boolean> {
  const { error } = await sql.from<NoteI>('notes').insert(note);
  if (error) return false;
  else return true;
}
