export interface UserI {
  id?: string | number;
  first_name?: string;
  username?: string;
  last_name?: string;
}

export interface ButtonI {
  text: string;
  url?: string;
  callback?: string;
  content?: string;
}
