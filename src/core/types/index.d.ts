/**
 * @module Typings
 */

import { Context } from 'grammy';

export interface GlobalDB {
  /** Id de la cuenta de telegram*/
  id?: number;
  /**
   * Codigo de lenguaje establecido en
   * el chat.
   * @example 'en'|'en'
   */
  language_code?: LangI;
  /**
   * Tipo de cuenta sobre la que se esta
   * ejecutando el bot.
   * @example 'supergroup' | 'group' | 'private' | 'channel'
   */
  type?: EnvI;
  /**
   * Nombre de usuario de la cuenta de telegram
   * @example `@CarlosBurelo`
   */
  username?: string;
}
export interface UserDB extends GlobalDB {
  /** Nombre del usuario proveniente del contexto*/
  first_name?: string;
}
export interface GroupDB extends GlobalDB {
  title?: string;
  rules?: RulesI;
  notes?: MsgI[];
  warns?: WarnI[];
  bios?: BioI[];
  blacklist?: BlackListI[];
  filters?: FilterI[];
  prefs?: PrefsI;
}
export interface MainDB {
  sudos: SudoI[];
  gbanned: SudoI[];
  whitelist: number[];
}
export interface DBModel extends GroupDB, UserDB {}

// EXTRA DATABASE TYPINGS

export type LangI = 'es' | 'en';

export type EnvI = 'group' | 'supergroup' | 'private' | 'channel';

export type MsgType =
  | 'text'
  | 'document'
  | 'sticker'
  | 'photo'
  | 'video'
  | 'voice'
  | 'audio'
  | 'poll';

export type ParseI = 'HTML' | 'Markdown' | 'MarkdownV2';

export type CollectionsI =
  | 'id'
  | 'sudos'
  | 'gbanned'
  | 'title'
  | 'first_name'
  | 'username'
  | 'rules'
  | 'type'
  | 'notes'
  | 'warns'
  | 'bios'
  | 'filters'
  | 'prefs';

export type KeyI =
  | 'ban'
  | 'demote'
  | 'promote'
  | 'mute'
  | 'banned'
  | 'unbanned'
  | 'demoted'
  | 'promoted'
  | 'warn';

export interface BlackListI {
  word: string[];
}
export interface RulesI {
  status: boolean;
  content: string;
}
export interface PrefsI {
  welcome?: GreetingI;
  goodbye?: GreetingI;
  ban?: { status: boolean; message: MsgI };
  spam: PrefSettingI;
  flood: PrefSettingI;
  warn: PrefSettingI;
  block: PrefSettingI;
}
export interface PrefSettingI {
  status: boolean;
  sanction: SanctionI;
  message: MsgI;
}
export interface GreetingI {
  status?: boolean;
  message?: any;
}
export interface MsgI {
  is_animated?: boolean;
  id?: string;
  type?: MsgType;
  photo?: any;
  args?: any;
  poll?: any;
  options?: string[];
  sticker?: any;
  voice?: any;
  video?: any;
  audio?: any;
  document?: any;
  text?: any;
  reply_markup?: any;
  caption_entities?: any;
  content?: any;
  caption?: any;
  thumb?: any;
  entities?: any;
}
export interface WarnI {
  id: number;
  first_name: string;
  username: string;
  count: number;
  reasons: string[];
}
export interface FilterI {
  id: string;
  strings?: string[];
  type: string;
  content?: string;
}
export interface BioI {
  id: number;
  first_name: string;
  bio: string;
}
export interface WarnI {
  id: number;
  first_name: string;
  username: string;
  count: number;
  reasons: string[];
}
interface GbannedI {
  id?: number;
  username?: string;
  first_name?: string;
  reason?: string;
}
interface SudoI {
  id?: number;
  role?: string;
  first_name?: string;
  username?: string;
}
export type SanctionI = 'ban' | 'warn' | 'mute' | 'gban' | 'delete' | 'off';

export interface PrefSettingI {
  status: boolean;
  sanction: SanctionI;
  message: MsgI;
}

// extrass

export interface BotI {
  id: number;
  username: string;
  first_name: string;
  repository: string;
}
export interface OwnerI {
  id: number;
  username: string;
  first_name: string;
}
export interface currencyI {
  orig: string;
  dest: string;
}
// }
export interface HelpI {
  text: string;
  callbacp: string;
  content: string;
}

// GLOBAL models

export interface ChatUserI {
  id: number;
  first_name: string;
  username?: string;
  last_name?: string;
  is_bot?: boolean;
  language_code?: string;
  user?: any;
}

export type ButtonType = 'inline' | 'keyboard';

export interface ButtonI {
  text: string;
  url?: string;
  callback?: string;
}
export interface FileI {
  caption?: any;
  chat?: any;
  text?: any;
  video?: any;
  document?: any;
  sticker?: any;
  photo?: any;
  audio?: any;
  voice?: any;
}

export interface ModulesI {
  text: string;
  callback: string;
  content: string;
}

// MESSAGE models

export interface ReplyI {
  message_id: number;
  from?: FromI;
  chat?: {
    id: number;
    title: string;
    type: string;
  };
  date: number;
  caption?: any;
  photo?: any;
  sticker?: any;
  voice?: any;
  video?: any;
  audio?: any;
  document?: any;
  text?: any;
  reply_markup?: any;
}

export interface FromI {
  id: number;
  is_bot: boolean;
  firts_name: string;
  username: string;
}

// alt models

export interface editMessageI {
  ctx: Context;
  id: number;
  text: string;
  keyboard?: any;
  mode?: ParseI;
}
export interface sendMessageI {
  ctx: Context;
  msg: MsgI;
  id?: number;
  vars?: ChatUserI;
}
export interface logErrorI {
  /** Contexto global de la API*/
  ctx: Context;
  /** Descripcion del error registrado en el catch*/
  error: { message: any };
  /** Nombre del archivo */
  __filename?: string;
  /** Linea donde sucede el error*/
  l: any;
  /** Funcion o comando que dispara el error*/
  f: string;
  //
  a?: KeyI;
}

export type cleanOut = 'string' | 'array';

export interface argumentsI {
  [n: string]: string;
}

export interface cleanText {
  text: string;
  pattern: string[] | RegExp;
  out: cleanOut;
}
