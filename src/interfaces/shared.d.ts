export interface BotI {
    id: (number | string),
    username: string;
    first_name: string;
    repository: string;
}
export interface OwnerI {
    id: (number | string),
    username: string,
    first_name: string,
}
export interface ApisI {
    monoschinos: string,
    magisk: string;
    github: string;
    samsung: string;
}