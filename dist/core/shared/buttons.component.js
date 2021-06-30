"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startButtons = void 0;
const telegraf_1 = require("telegraf");
const config_1 = require("../../config");
exports.startButtons = telegraf_1.Markup.inlineKeyboard([
    telegraf_1.Markup.button.callback("📌 Commands", "back"),
    telegraf_1.Markup.button.callback("🇲🇽 Languages", "lang"),
    telegraf_1.Markup.button.url("➕ Add to group", `http://t.me/${config_1._bot.username}?startgroup=true`),
    telegraf_1.Markup.button.url("📄 Documentation", `https://indevelopment.com`),
], { columns: 2 });
