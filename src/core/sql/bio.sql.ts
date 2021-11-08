import { sql } from '.';
import { BioI } from '@models/sql';

export async function getBio(chatId: number, userId: number): Promise<BioI> {
  const { data, error } = await sql
    .from<BioI>('bios')
    .select('text')
    .eq('chatId', chatId)
    .eq('userId', userId)
    .single();
  if (error) return undefined;
  else return data;
}

export async function removeBio(chatId: number, userId: number): Promise<boolean> {
  const { error } = await sql
    .from<BioI>('bios')
    .delete()
    .eq('chatId', chatId)
    .eq('userId', userId)
    .single();
  if (error) return false;
  else return true;
}

export async function updateBio(bio: BioI): Promise<boolean> {
  const { error } = await sql
    .from<BioI>('bios')
    .update(bio)
    .eq('chatId', bio.chatId)
    .eq('userId', bio.userId)
    .single();
  if (error) return false;
  else return true;
}

export async function addBio(bio: BioI): Promise<boolean> {
  const { error } = await sql
    .from<BioI>('bios')
    .insert(bio)
    .eq('chatId', bio.chatId)
    .eq('userId', bio.userId)
    .single();
  if (error) return false;
  else return true;
}
