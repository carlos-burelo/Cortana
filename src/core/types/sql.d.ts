export interface AccountsTable {
    _id?: number;
    created_at?: string;
    updated_at?: string;
    id: number;
    first_name?: string | null;
    title?: string | null;
    type: 'private' | 'group' | 'supergroup' | null;
    username?: string | null;
    invite_link?: string;
    lang: string | null;
}

export interface BiosTable {
    _id: any;
    id: number;
    userId: number;
    content: string;
    format: MessageInterface;
}
export interface MessageInterface {
    reply_markup?: any
    caption?: any
    caption_entities?: any
    parse_mode?: any
    entities?: any
}