import { ButtonI, KeyI, WarnI } from '.';

/**
 * Objeto global de traduccion
 * para todos los modulos disponibles
 * en el bot
 */
export interface LanguageI {
  /** Reusable and general purpose properties. */
  global: GlobalI;
  /** Properties related to the management of user functions and functions. */
  helpers: HelpersI;
  /** Permissions for chat or chat member */
  permissions: PermissionsI;
  /** Translation of the "Start" module */
  startModule: startModuleI;
  /** Translation of the "admin" module */
  adminModule: adminModuleI;
  /** Translation of the "android" module */
  androidModule: androidModuleI;
  /** Translation of the "ban" module */
  banModule: banModuleI;
  /** Translation of the "node" module */
  nodeModule: nodeModuleI;
  /** Translation of the "bios" module */
  bioModule: bioModuleI;
  /** Translation of the "help" module */
  helpModule: helpModuleI;
  /** Translation of the "heroku" module */
  herokuModule: herokuModuleI;
  /** Translation of the "notes" module */
  notesModule: notesModuleI;
  /** Translation of the "warns" module */
  warnModule: warnModuleI;
  /** Translation of the "filter" module */
  filterModule: filterModuleI;
  /** Translation of the "github" module */
  githubModule: githubModuleI;
  /** Translation of the "extras" module */
  extrasModule: extrasModuleI;
  /** Translation of the "owner" module */
  ownerModule: ownerModuleI;
  /** Translation of the "npm" module */
  npmModule: npmModuleI;
  /** Translation of the "welcome" module */
  welcomeModule: welcomeModuleI;
  /** Translation of the "traslation" module */
  trasnlatorModule: translatorModuleI;
  /** Translation of the "users" module */
  usersModule: usersModuleI;
  /** Translation of the "mute" module */
  muteModule: muteModuleI;
}
/**
 * Objeto con propiedades de traduccion
 * reutilizables y de uso general
 */
interface GlobalI {
  /** Mensaje de aprovacion para el uso del bot*/
  requestApproved: string;
  /** Mensaje de denegacion para el uso del bot*/
  requestDenied: string;
  /** Mensaje de espera a la aprovacion o denegacion para el uso del bot*/
  pendingRequest: string;
  /** Mensaje predeterminado cuando el bot no esta disponible*/
  noUsePerms: string;
  /** Mensaje que indica que el bot no detecta un mensaje a responder*/
  noReplyMessage: string;
  /** Mensaje de aviso de uso exclusivo del propietario*/
  onlyOwner: string;
  /** Mensaje alerta para bloquear acciones en contra del bot*/
  preventBot: string;
  /** Mensaje alerta para bloquear acciones en contra del propietario*/
  preventOwner: string;
  /** Mensaje alerta para notificar permisos denegados*/
  permissionsDenied: string;
  /** Texto que pregunta el idioma a utilizar*/
  chooseLang: string;
  /** Mensaje alerta para informar que el codigo de lenguage no esta disponible*/
  codeLangError: string;
  /** Mensaje que indica que el bot no esta disponible en chats privados*/
  noPrivateChat: string;
  /** Mensaje que indica los argumentos son invalidos*/
  argsError: string;
  /** Mensaje que indica que no existen argumentos necesarios*/
  argsNotFound: string;
  /** Mensaje que indica que el formato del menssaje no es procesable*/
  formatError: string;
  /** Mensaje que indica que la variable de entorno no esta disponible*/
  envNotFound: (env: string) => string;
  /**
   *@param {string} name
   * Returns a message warning that the user has superuser protection.
   */
  preventSudo: (name: string) => string;
  setLanguageSucces: (lang: string) => string;
  sameLanguage: (lang: string) => string;
}
export interface HelpersI {
  anyActionSuccess: (i: KeyI, A: string, B: string) => string;
  memberActionAdmin: (i: KeyI) => string;
  adminActionAdmin: (i: KeyI) => string;
  anyActionCreator: (i: KeyI) => string;
  anyActionOwner: (i: KeyI) => string;
  noYourAutoAction: (i: KeyI) => string;
  noAutoAction: (i: KeyI) => string;
  actionError: (i: KeyI) => string;
}
export interface PermissionsI {
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
export interface startModuleI {
  /** Mensaje de bienvenida al chat privado o grupo*/
  message: (name: string) => string;
  /**Atajo rapido a las principales funciones del bot.*/
  buttons: ButtonI[];
}
export interface adminModuleI {
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
export interface androidModuleI {
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
export interface banModuleI {
  unBanSuccess: string;
  setBanSuccess: string;
}
export interface nodeModuleI {
  cmdError: string;
  cmdDenied: string;
  limitResponse: string;
  invalidUrl: string;
  noUrl: string;
}
export interface bioModuleI {
  notFound: (name: string) => string;
  setBioSuccess: string;
  updateBioSuccess: string;
  deleteBioSuccess: string;
  emptyBiography: string;
}
export interface notesModuleI {
  noteNotFound: string;
  notesNotFound: string;
  personalNotes: string;
  publicNotes: (title: string) => string;
  updateNote: (note: string) => string;
  noteAdded: (note: string) => string;
  deleteNote: (note: string) => string;
  noteSuggest: string;
}
export interface warnModuleI {
  reason: string;
  firstWarn: string;
  secondWarn: string;
  lastWarn: string;
  warnInfo: (user: WarnI) => string;
  warnRemoved: string;
  allWarnsRemoved: string;
  noWarns: (name: string) => string;
}
export interface filterModuleI {
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
export interface githubModuleI {
  noUserFound: string;
  noRepoFound: string;
  reposTitle: (a: number) => string;
  profileNotFound: string;
}
export interface helpModuleI {
  modules: any[];
  message: string;
}
export interface extrasModuleI {
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
export interface ownerModuleI {
  invalidID: string;
  noSudos: string;
  sudoAdd: (sudo: string) => string;
  sudoUpdate: (sudo: string) => string;
  delSudo: (sudo: string) => string;
  noSudo: (sudo: string) => string;
}
export interface npmModuleI {
  titleSearch: string;
  title: (query: string) => string;
}
export interface welcomeModuleI {
  ownerProcess: string[];
  prefRepeat: (a: string) => string;
  prefSuccess: (a: string) => string;
}
export interface translatorModuleI {
  limit: string;
}
export interface usersModuleI {
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
export interface herokuModuleI {
  title: string;
  usageText: (name: string) => string;
  remainigText: string;
  time: (h: number, m: number, p: number) => string;
  process: string[];
}
export interface muteModuleI {
  unMuted: (user: string) => string;
  noUnMuted: (u: string) => string;
}
