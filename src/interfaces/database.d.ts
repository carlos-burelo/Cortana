export interface DatabaseI{
    accounts: AccountsI[];
    gbanned: GbanI[];
    sudo: string[];
}
export interface AccountModelI{
    id: string;
    account: string;
    bios?: Array<any>;
    notes: Array<any>;
    prefs: any;
}
export interface AccountsI{
    id: (string | number);
    account: string
}
export interface GbanI{
    id: (string | number);
    username: string;
    reason: string;
}