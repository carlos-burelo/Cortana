"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSudo = void 0;
const database_1 = require("../../database");
function isSudo(id) {
    let sudos = database_1.db().get("sudos").value();
    if (sudos == undefined || sudos.length == 0) {
        return false;
    }
    let found = sudos.find((sudo) => sudo.id == id);
    if (found == undefined) {
        return false;
    }
    return true;
}
exports.isSudo = isSudo;
