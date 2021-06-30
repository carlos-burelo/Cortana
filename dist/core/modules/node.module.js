"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
function default_1(bot) {
    bot.command("/os", async (ctx) => {
        ctx.replyWithHTML(`<b>Platform:</b>  <i>${os_1.default.platform()}</i>\n` +
            `<b>Type:</b>  <i>${os_1.default.type()}</i>\n` +
            `<b>Arch:</b>  <i>${os_1.default.arch()}</i>\n` +
            `<b>Release:</b>  <i>${os_1.default.release()}</i>\n` +
            `<b>Total Memory</b>  <i>${Math.round(os_1.default.totalmem() / 1024 / 1024 / 1024).toString()} GB</i>\n` +
            `<b>Username:</b>  <i>${os_1.default.userInfo().username}</i>\n`);
    });
}
exports.default = default_1;
