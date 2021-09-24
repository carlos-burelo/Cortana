export interface LangI {
  /** Language ID */
  id: string;
  /** Generic multipurpose words*/
  utils: UtilsI;
  global: GlobalI;
  helpers: any;
  perms: PermsI;
  admin: any;
  github: GitHubI;
}

export interface UtilsI {
  id: (a: string | number) => string;
  title: (a: string) => string;
  lang: (a: string) => string;
  notes: (a: string) => string;
  type: (a: string) => string;
  first_name: (a: string) => string;
  last_name: (a: string) => string;
  username: (a: string) => string;
  size: (a: string) => string;
  status: (a: string) => string;
  link: (a: string, b: string) => string;
  release: (a: string) => string;
}

export interface GlobalI {
  preventSudo: (a: string) => string;
  setLangSuccess: (a: string) => string;
  sameLang: (a: string) => string;
  envNotFound: (a: string) => string;
  joinApproved: string;
  joinDenied: string;
  joinPending: string;
  noAllow: string;
  replyMissing: string;
  onlyOwner: string;
  preventBot: string;
  preventOwner: string;
  notHavePerms: string;
  chooseLang: string;
  codeLangError: string;
  noPrivateChat: string;
  argsError: string;
  argsNotFound: string;
  formatError: string;
}

export interface PermsI {
  can_send_messages: (a: boolean) => string;
  can_send_media_messages: (a: boolean) => string;
  can_send_polls: (a: boolean) => string;
  can_send_other_messages: (p: boolean) => string;
  can_add_web_page_previews: (p: boolean) => string;
  can_change_info: (a: boolean) => string;
  can_invite_users: (a: boolean) => string;
  can_pin_messages: (a: boolean) => string;
  can_be_edited: (a: boolean) => string;
  can_manage_chat: (a: boolean) => string;
  can_delete_messages: (a: boolean) => string;
  can_restrict_members: (a: boolean) => string;
  can_promote_members: (a: boolean) => string;
  can_manage_voice_chats: (a: boolean) => string;
  is_anonymous: (a: boolean) => string;
}

export interface GitHubI {
  reposTitle: (a: string) => string;
  /**
   * @param a Repository name
   * @param b Owner name
   * @param c Branch name
   * @param d Description text
   */
  cloneTemplate: (a: string, b: string, c: string, d: string) => string;
  repoTemplate: (a: string, b: string, c: string, d: string, e: string, f: string) => string;
  gitTemplate: (a: string, b: string, c: string, d: string, e: string, f: string) => string;
  userNotFound: string;
  profileNotFound: string;
  repoGetError: string;
  repoNotFound: string;
  repository: string;
  website: string;
  owner: string;
  viewProfile: string;
}
