export interface AccountI {
    user: any;
    account: any;
}

export interface BioI{
    id: (string | number);
    user:string;
    text: string;
}
export interface NoteI{
    id: string ;
    type: string;
    content: string;
}
export interface FileI {
    chat?: any;
    text?: any;
    video?: any;
    document?: any;
    sticker?: any;
    photo?: any;
    audio?: any;
}

