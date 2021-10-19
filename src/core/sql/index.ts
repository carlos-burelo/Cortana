import {
  createClient,
  PostgrestError,
  SupabaseClient,
} from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../../config';
import { AccountsTable } from '../types/sql';

export const sql: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Get all accounts in DB
 * @return {Promise<AccountsTable[] | PostgrestError>}
 */
export async function getAccounts(): Promise<AccountsTable[] | PostgrestError> {
  const { data, error } = await sql.from<AccountsTable>('accounts').select('*');
  if (error) return error;
  return data;
}
export async function validate(): Promise<any[]> {
  const { data } = await sql.from<AccountsTable>('accounts').select('id');
  return data;
}
/**
 * Get lang based in your user ID
 * @param {number} id
 * @return {Promise<string>}
 */
export async function getLang(id: number): Promise<string> {
  const { data, error } = await sql
    .from<AccountsTable>('accounts')
    .select('lang')
    .eq('id', id)
    .single();
  if (error) return 'es';
  return data.lang;
}

export async function createAccount(account: AccountsTable) {
  try {
    return await sql.from<AccountsTable>('accounts').insert([account]);
  } catch (error) {
    return undefined;
  }
}

