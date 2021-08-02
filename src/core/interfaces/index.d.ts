import { Context } from 'telegraf';

export interface DBModel {
  /** Unic account id from chat*/
  id?: number | string;
  /** Language code `ctx.chat` */
  language_code?: LangI;
  /** Type Enviroment @type {EnvI}*/
  type?: EnvI;
  first_name?: string;
  username?: string;
  title?: string;
  rules?: RulesI;
  notes?: MsgI[];
  warns?: WarnI[];
  bios?: BioI[];
  blacklist?: BlackListI[];
  filters?: FilterI[];
  prefs?: PrefsI;
  sudos?: SudoI[];
  groups?: number[];
  gbanned?: GbannedI[];
}

// GLOBAL TYPES

export type EnvI = 'group' | 'supergroup' | 'private' | 'channel' | 'main';

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
  word: string;
}

export interface RulesI {
  status: boolean;
  content: string;
}

export interface PrefsI {
  welcome?: WelcomeI;
  goodbye?: WelcomeI;
  ban?: { status: boolean; message: MsgI };
  spam: PrefSettingI;
  flood: PrefSettingI;
  warn: PrefSettingI;
  block: PrefSettingI;
}

export interface WelcomeI {
  status?: boolean;
  message?: any;
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
export interface MsgI {
  is_animated?: boolean;
  id?: string;
  type?: 'text' | 'document' | 'sticker' | 'photo' | 'video' | 'voice' | 'audio' | 'poll';
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
// LANG INTERFACES

export type LangI = 'es' | 'en' | string;

// MAIN DATABASE INTERFACES

export interface MainDBI {
  id: string;
  sudos: SudoI[];
  language_code: LangI;
  type: 'main';
  accounts: number[];
  gbanned: GbannedI[];
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

// CONFIG INTERFACES

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
export interface ApisI {
  magisp: string;
  github: string;
  samsung: string;
  twrp: string;
  currency: ({ orig, dest }) => string;
}
export interface HelpI {
  text: string;
  callbacp: string;
  content: string;
}

// GLOBAL INTERFACES

export interface ChatUserI {
  id: number;
  first_name: string;
  username?: string;
  last_name?: string;
  is_bot?: boolean;
  language_code?: string;
  user?: any;
}

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

// MESSAGE INTERFACES

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

// lang interfaces
export interface LanguageI {
  /** Reusable and general purpose properties. */
  global: GlobalLangI;
  /** Properties related to the management of user functions and functions. */
  helpers: HelpersLangI;
  permissions: PermissionsLangI;
  startModule: startModuleLangI;
  adminModule: adminModuleLangI;
  androidModule: androidModuleLangI;
  banModule: banModuleLangI;
  nodeModule: nodeModuleLangI;
  bioModule: bioModuleLangI;
  helpModule: helpModuleLangI;
  herokuModule: herokuModuleLangI;
  notesModule: notesModuleLangI;
  warnModule: warnModuleLangI;
  filterModule: filterModuleLangI;
  githubModule: githubModuleLangI;
  extrasModule: extrasModuleLangI;
  ownerModule: ownerModuleLangI;
  npmModule: npmModuleLangI;
  welcomeModule: welcomeModuleLangI;
  trasnlatorModule: translatorModuleLangI;
  usersModule: usersModuleLangI;
  muteModule: muteModuleLangI;
}

interface GlobalLangI {
  requestApproved:string;
  requestDenied:string;
  pendingRequest:string;
  noUsePerms: string;
  noReplyMessage: string;
  onlyOwner: string;
  preventBot: string;
  preventOwner: string;
  permissionsDenied: string;
  chooseLang: string;
  codeLangError: string;
  noPrivateChat: string;
  argsError: string;
  argsNotFound: string;
  formatError: string;
  envNotFound: (env: string) => string;
  /**
   *@param {string} name
   * Returns a message warning that the user has superuser protection.
   */
  preventSudo: (name: string) => string;
  setLanguageSucces: (lang: string) => string;
  sameLanguage: (lang: string) => string;
}
export interface HelpersLangI {
  anyActionSuccess: (i: KeyI, A: string, B: string) => string;
  memberActionAdmin: (i: KeyI) => string;
  adminActionAdmin: (i: KeyI) => string;
  anyActionCreator: (i: KeyI) => string;
  anyActionOwner: (i: KeyI) => string;
  noYourAutoAction: (i: KeyI) => string;
  noAutoAction: (i: KeyI) => string;
  actionError: (i: KeyI) => string;
}
export interface PermissionsLangI {
  setPermsSuccess: string;
  setPermsError: string;
  title: (title: string) => string;
  can_send_messages: (p: boolean) => string;
  can_send_media_messages: (p: boolean) => string;
  can_send_polls: (p: boolean) => string;
  can_send_other_messages: (p: boolean) => string;
  can_add_web_page_previews: (p: boolean) => string;
  can_change_info: (p: boolean) => string;
  can_invite_users: (p: boolean) => string;
  can_pin_messages: (p: boolean) => string;
  can_be_edited: (p: boolean) => string;
  can_manage_chat: (p: boolean) => string;
  can_delete_messages: (p: boolean) => string;
  can_restrict_members: (p: boolean) => string;
  can_promote_members: (p: boolean) => string;
  can_manage_voice_chats: (p: boolean) => string;
  is_anonymous: (p: boolean) => string;
}
// modules languages
export interface startModuleLangI {
  message: string;
  buttons: ButtonI[];
}
export interface adminModuleLangI {
  adminList: string;
  pinSuccess: string;
  pinError: string;
  unPinSuccess: string;
  unPinAllSuccess: string;
  unPinError: string;
  unPinAllError: string;
  unPinSuggestion: string;
  prefTitle: (pref: string) => string;
  stat: (s: string) => string;
  type: (s: string) => string;
  sanction: (s: string) => string;
}
export interface androidModuleLangI {
  noModel: 'Porfavor coloque algun modelo';
  noCsc: 'Porfavor coloque alguna region';
  titleMagisk: '*Ultimas versiones de magisk*\n\n';
  titleFirm: (model: string, csc: string) => string;
  titleTwrp: (device: string) => string;
  name: (a: string) => string;
  size: (a: string) => string;
  release: (a: string) => string;
  link: (url: string, name: string) => string;
}
export interface banModuleLangI {
  unBanSuccess: string;
  setBanSuccess: string;
}
export interface nodeModuleLangI {
  cmdError: string;
  cmdDenied: string;
  limitResponse: string;
  invalidUrl: string;
  noUrl: string;
}
export interface bioModuleLangI {
  notFound: (name: string) => string;
  setBioSuccess: string;
  updateBioSuccess: string;
  deleteBioSuccess: string;
  emptyBiography: string;
}
export interface notesModuleLangI {
  noteNotFound: string;
  notesNotFound: string;
  personalNotes: string;
  publicNotes: (title: string) => string;
  updateNote: (note: string) => string;
  noteAdded: (note: string) => string;
  deleteNote: (note: string) => string;
  noteSuggest: string;
}
export interface warnModuleLangI {
  reason: string;
  firstWarn: string;
  secondWarn: string;
  lastWarn: string;
  warnInfo: (user: WarnI) => string;
  warnRemoved: string;
  allWarnsRemoved: string;
  noWarns: (name: string) => string;
}
export interface filterModuleLangI {
  noFilterKey: string;
  setRespFilter: string;
  filterSaved: (id: string) => string;
  noFoundFilter: (filter: string) => string;
  removedFilter: (filter: string) => string;
  title: (title: string) => string;
  noFiltersFound: string;
  filterDesc: (filter: string) => string;
  type: (type: string) => string;
  resp: string;
}
export interface githubModuleLangI {
  noUserFound: string;
  noRepoFound: string;
  reposTitle: (a: number) => string;
  profileNotFound: string;
}
export interface helpModuleLangI {
  modules: any[];
  message: string;
}
export interface extrasModuleLangI {
  noBaseFound: string;
  baseIsNaN: string;
  origNotFound: string;
  destNotFound: string;
  emptyPoll: string;
  emptyTitlePoll: string;
  minResp: string;
  errorFormatPoll: string;
  kangFormatError: string;
  kangProcess: string[];
  errorCreatePack: string;
  errorAddPack: string;
  finish: (name: string) => string;
  deleteSticker: string;
  tgsFormatError: string;
}
export interface ownerModuleLangI {
  invalidID: string;
  noSudos: string;
  sudoAdd: (sudo: string) => string;
  sudoUpdate: (sudo: string) => string;
  delSudo: (sudo: string) => string;
  noSudo: (sudo: string) => string;
}
export interface npmModuleLangI {
  titleSearch: string;
  title: (query: string) => string;
}
export interface welcomeModuleLangI {
  ownerProcess: string[];
  prefRepeat: (a: string) => string;
  prefSuccess: (a: string) => string;
}
export interface translatorModuleLangI {
  limit: string;
}
export interface usersModuleLangI {
  youId: (id: number) => string;
  yourId: (name: string, id: number) => string;
  myId: (id: number) => string;
  groupId: (id: number) => string;
  id: (id: number) => string;
  name: (name: string) => string;
  lastName: (lastName: string) => string;
  acount: (username: string) => string;
  range: (range: string) => string;
  customTitle: (title: string) => string;
  isBot: (v: boolean) => string;
  type: (type: string) => string;
  groupInfo: string;
  userInfo: string;
  title: (title: string) => string;
  inviteLink: (link, name) => string;
}
export interface herokuModuleLangI {
  title: string;
  usageText: (name: string) => string;
  remainigText: string;
  time: (h: number, m: number, p: number) => string;
  process: string[];
}
export interface muteModuleLangI {
  unMuted: (user: string) => string;
  noUnMuted: (u: string) => string;
}

// alt interfaces

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
  ctx: Context;
  error: { message: any };
  __filename?: string;
  l: any;
  f: string;
  a?: KeyI;
}

export type SanctionI = 'ban' | 'warn' | 'mute' | 'gban' | 'delete' | 'off';

export interface PrefSettingI {
  status: boolean;
  sanction: SanctionI;
  message: MsgI;
}
