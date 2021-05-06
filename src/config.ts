import { ApisI, BotI, OwnerI } from "./interfaces/shared";

export const owner: OwnerI = {
    id: 823410643,
    username: "CarlosBurelo",
    first_name: 'Carlos',
};

export const _bot:BotI = {
    id: 1317616064,
    username: "AssitantCortana_bot",
    first_name: "Cortana",
    repository: 'https://github.com/carlos-burelo/CortanaTs'
};

export const api_urls:ApisI = {
    monoschinos: process.env.API_MONOSCHINOS,
    magisk: "https://raw.githubusercontent.com/topjohnwu/magisk_files/master",
    github: "https://api.github.com",
    samsung: "http://fota-cloud-dn.ospserver.net/firmware",
};