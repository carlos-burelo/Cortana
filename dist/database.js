"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabases = exports.db = exports.connect = void 0;
const fs_1 = require("fs");
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const path_1 = require("path");
const config_1 = require("./config");
let data;
const dir = path_1.resolve(__dirname, "databases");
const connect = (database) => {
    !database ? (database = { id: "main" }) : database;
    if (fs_1.existsSync(dir) == false) {
        fs_1.mkdirSync(dir);
    }
    const dbPath = path_1.resolve(dir, `${database.id}.json`);
    let schema;
    if (fs_1.existsSync(dbPath) == false) {
        schema = config_1.makeDBSchema(database);
    }
    const adapter = new FileSync_1.default(dbPath);
    data = lowdb_1.default(adapter);
    data.defaults(schema).write();
};
exports.connect = connect;
const db = (database) => {
    exports.connect(database);
    return data;
};
exports.db = db;
function getDatabases() {
    try {
        let dbPath = fs_1.readdirSync(path_1.resolve(config_1.mainDir, "databases"), { encoding: "utf-8" });
        let groups = dbPath.filter(a => a.includes('-'));
        let databases = groups.map(a => {
            return JSON.parse(fs_1.readFileSync(`${path_1.resolve(config_1.mainDir, "databases")}/${a}`, {
                encoding: "utf-8",
            }));
        });
        return databases;
    }
    catch (error) {
    }
}
exports.getDatabases = getDatabases;
