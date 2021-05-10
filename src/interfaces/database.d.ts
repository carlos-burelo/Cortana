export interface DatabaseI {
    accounts: AccountsI[];
    gbanned: GbanI[];
    sudo: string[];
}
export interface AccountModelI {
    id: string;
    title: string;
    account?: string;
    type: "group" | "supergroup" | "private"
    bios?: Array<any>;
    notes?: Array<any>;
    prefs?: PrefsI;
}
export interface PrefsI {
    welcome: { status: boolean, message: string }
    goodbye: { status: boolean, message: string }
}
export interface AccountsI {
    id: (string | number);
    account: string
}
export interface GbanI {
    id: (string | number);
    username: string;
    reason: string;
}