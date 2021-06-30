"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDirs = exports.makeDBSchema = exports._apis = exports._bot = exports._owner = exports.databasesDir = exports.downloadDir = exports.mainDir = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
exports.mainDir = __dirname;
exports.downloadDir = `${path_1.resolve(__dirname, "assets", "downloads")}`;
exports.databasesDir = `${path_1.resolve(__dirname, "databases")}`;
exports._owner = {
    id: 823410643,
    username: "CarlosBurelo",
    first_name: "Carlos",
};
exports._bot = {
    id: 1317616064,
    username: "AssistantCortana_bot",
    first_name: "Cortana",
    repository: "https://github.com/carlos-burelo/CortanaTs",
};
exports._apis = {
    monoschinos: process.env.API_MONOSCHINOS,
    magisk: "https://raw.githubusercontent.com/topjohnwu/magisk_files/master",
    github: "https://api.github.com",
    samsung: "http://fota-cloud-dn.ospserver.net/firmware",
    twrp: "https://eu.dl.twrp.me",
    currency: ({ orig, dest }) => `https://www.alphavantage.co/query` +
        `?function=CURRENCY_EXCHANGE_RATE` +
        `&from_currency=${orig}` +
        `&to_currency=${dest}` +
        `&apikey=${process.env.CURRENCY}`
};
function makeDBSchema(a) {
    if (a.id == 'main') {
        const MainSchema = {
            id: 'main',
            lang: 'en',
            sudos: [],
            gbanned: [],
        };
        return MainSchema;
    }
    if (a.type == "supergroup" || a.type == "group") {
        const GroupSchema = {
            id: a.id,
            lang: !a.language_code ? "en" : a.language_code,
            title: a.title,
            username: a.username,
            type: a.type,
            rules: {
                content: "",
                status: true,
            },
            bios: [],
            notes: [],
            warns: [],
            filters: [],
            prefs: {
                welcome: {
                    status: true,
                    message: {
                        text: "Bienvenido {first_name}",
                        type: "text",
                    },
                },
                goodbye: {
                    status: true,
                    message: {
                        text: "Hasta pronto {first_name}",
                        type: "text",
                    },
                },
                ban: {
                    content: "User banned",
                    type: "text",
                },
            },
        };
        return GroupSchema;
    }
    else {
        const UserSchema = {
            id: a.id,
            lang: "es",
            first_name: a.first_name,
            username: a.username,
            type: a.type,
            notes: [],
        };
        return UserSchema;
    }
}
exports.makeDBSchema = makeDBSchema;
function checkDirs() {
    if (fs_1.existsSync(exports.downloadDir) == false) {
        fs_1.mkdirSync(exports.downloadDir, { recursive: true });
    }
    if (fs_1.existsSync(exports.databasesDir) == false) {
        fs_1.mkdirSync(exports.databasesDir, { recursive: true });
    }
}
exports.checkDirs = checkDirs;
