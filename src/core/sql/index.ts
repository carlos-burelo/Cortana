import {
  createClient,
  PostgrestError,
  SupabaseClient,
} from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../../config';

export const sql: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Get all accounts in DB
 * @return {Promise<AccountsI[] | PostgrestError>}
 */
export async function getAccounts(): Promise<AccountsI[] | PostgrestError> {
  const { data, error } = await sql.from<AccountsI>('accounts').select('*');
  if (error) return error;
  return data;
}
export async function validate(): Promise<any[]> {
  const { data } = await sql.from<AccountsI>('accounts').select('id');
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

export async function createAccount(account: AccountsI) {
  try {
    return await sql.from<AccountsI>('accounts').insert([account]);
  } catch (error) {
    return undefined;
  }
}

export interface AccountsI {
  _id?: number;
  created_at?: string;
  updated_at?: string;
  id: number;
  first_name?: string | null;
  title?: string | null;
  type: 'private' | 'group' | 'supergroup' | null;
  username?: string | null;
  invite_link?: string;
  lang: string | null;
}
