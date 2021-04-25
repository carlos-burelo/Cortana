import { IBotConfig, IOwner } from "interfaces/config.interface";

export const owner:IOwner = {
    id: 823410643,
    username: "CarlosBurelo",
    first_name: 'Carlos',
    db: "http://localhost:3000",
};

export const botConfig:IBotConfig = {
    id: 1317616064,
    username: "AssitantCortana_bot",
    first_name: "Cortana",
    repository: 'https://github.com/carlos-burelo/CortanaTs'
};

export const api_urls:any = {
    monoschinos: process.env.API_MONOSCHINOS,
    magisk: "https://raw.githubusercontent.com/topjohnwu/magisk_files/master",
    github: "https://api.github.com",
    sams: "http://fota-cloud-dn.ospserver.net/firmware",
};