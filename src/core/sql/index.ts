import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../../config';

export const sql: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Get all accounts in DB
 * @return {Promise<AccountsI[] | PostgrestError>}
 */
export async function getAccounts(): Promise<AccountsI[] | PostgrestError> {
  const { data, error } = await sql.from('accounts').select('*');
  if (error) return error;
  return data;
}

/**
 * Get lang based in your user ID
 * @param {number} id
 * @return {Promise<string>}
 */
export async function getLang(id: number): Promise<string> {
  const { data, error } = await sql
    .from<AccountsI>('accounts')
    .select('lang')
    .eq('id', id)
    .single();
  if (error) return 'es';
  return data.lang;
}
export interface AccountsI {
  _id: number;
  created_at: string;
  updated_at: string;
  id: number;
  first_name: string | null;
  title: string | null;
  type: 'private' | 'group' | 'supergroup' | null;
  username: string | null;
  lang: string | null;
}
