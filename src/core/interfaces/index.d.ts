// ACOUNT DATABASE INTERFACES

export interface DatabaseI {
  id: number;
  sudos?: Sudo[];
  gbanned?: Gbanned[];
  title?: string;
  first_name?: string;
  username: string;
  rules?: RulesI;
  type: "group" | "supergroup" | "private";
  notes?: NoteI[];
  warns?: WarnI[];
  bios?: BioI[];
  filters?: FilterI[];
  prefs?: PrefsI;
}

export interface RulesI {
  status: boolean;
  content: string;
}
export interface PrefsI {
  welcome: WelcomeI;
  goodbye: WelcomeI;
}
export interface WelcomeI {
  status: boolean;
  message: string;
  type: string;
}
export interface FilterI {
  word: string;
  response: string;
  status: boolean;
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
}
export interface NoteI {
  id: string;
  type: string;
  content: string;
}

// MAIN DATABASE INTERFACES

export interface MainDBI {
  id: string;
  sudos: Sudo[];
  gbanned: Gbanned[];
}
interface GbannedI {
  id: number;
  username: string;
  first_name: string;
  reason: string;
}
interface SudoI {
  id: number;
  range: number;
  role: string;
  first_name: string;
  username: string;
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
  monoschinos: string;
  magisk: string;
  github: string;
  samsung: string;
  twrp: string;
}
export interface HelpI {
  text: string;
  callback: string;
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
