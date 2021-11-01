import { sql } from '.';
import { NoteI } from '@interfaces/sql';

export async function insertNote(note: NoteI): Promise<boolean> {
  const { error } = await sql.from<NoteI>('notes').insert(note);
  if (error) return false;
  else return true;
}
