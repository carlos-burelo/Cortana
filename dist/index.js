"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const telegraf_1 = require("telegraf");
const config_1 = require("./config");
const modules_1 = __importDefault(require("./modules"));
const bot = new telegraf_1.Telegraf(process.env.TOKEN);
async function init() {
    modules_1.default(bot);
    config_1.checkDirs();
    bot.launch().then(() => {
        console.clear();
        console.log("Bot started");
    });
}
init();
