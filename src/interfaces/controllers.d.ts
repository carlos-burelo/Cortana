export interface AccountI {
  user: any;
  account: any;
}

export interface BioI {
  id: string | number;
  user: string;
  text: string;
}
export interface NoteI {
  id?: string;
  type: string;
  content: string;
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
}

export interface UserI {
  id: number;
  first_name: string;
  username?: string;
  last_name?: string;
}
export interface SudoI {
  id: number;
  first_name: string;
  username: string;
  range: number;
  role: string;
}

export interface PermsI {
  status: boolean;
  message: string;
}
