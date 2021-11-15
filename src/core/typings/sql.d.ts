import { MsgType } from '.';

export interface AccountsTable {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  lang: string | null;
}

export interface BiosTable {
  _id: any;
  id: number;
  userId: number;
  content: string;
  format: MessageInterface;
}
export interface NotesTable {
  _id: any;
}
export interface MessageInterface {
  reply_markup?: any;
  caption?: any;
  caption_entities?: any;
  parse_mode?: any;
  entities?: any;
}

// Acount interfaces

export interface UserProps {
  first_name: string;
  username: string;
}
export interface User extends UserProps, GlobalAccountProps {}

export interface GroupProps {
  title: string;
  invite_link: string;
}
export interface Group extends GroupProps, GlobalAccountProps {}

export interface GlobalAccountProps {
  id: number;
  type: AccountType;
  lang: string;
}
export type AccountType = 'private' | 'group' | 'supergroup';

export type AccountI = User | Group;

// Notes interfaces
export interface NoteI extends MessageProps {
  chatId: number;
  key: string;
  type: MsgType;
  content: string;
}
export interface MessageProps {
  reply_markup?: any;
  caption?: any;
  caption_entities?: any;
  parse_mode?: any;
  entities?: any;
}

// Bios interfaces
export interface BioI {
  chatId: number;
  userId: number;
  text: string;
}
