"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLang = exports.setLang = void 0;
const lang_1 = require("./core/lang");
const database_1 = require("./database");
function setLang(chat, lang) { }
exports.setLang = setLang;
function getLang(chat) {
    let lang = database_1.db(chat).get("lang").value();
    // if (lang == "es") {
    return lang_1.es;
    // } else {
    //   return en;
    // }
}
exports.getLang = getLang;
