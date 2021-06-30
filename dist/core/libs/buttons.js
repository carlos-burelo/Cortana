"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractButtons = exports.createButtons = void 0;
const telegraf_1 = require("telegraf");
function buttonMaker(buttons) {
    let markupButtons = buttons.map((button) => {
        if (button.url) {
            return telegraf_1.Markup.button.url(button.text, button.url);
        }
        else {
            return telegraf_1.Markup.button.callback(button.text, button.callback);
        }
    });
    return markupButtons;
}
function createButtons(buttons, columns) {
    let _buttons = buttonMaker(buttons);
    return telegraf_1.Markup.inlineKeyboard(_buttons, { columns: columns }).reply_markup;
}
exports.createButtons = createButtons;
function extractButtons(text) {
    let regex = /\[.+?\s?&\s?http[s]?:\/\/.+?\]/gim;
    let buttonsArr = text.match(regex);
    if (buttonsArr == null) {
        return undefined;
    }
    buttonsArr.map((a) => {
        text = text.replace(a, "");
    });
    let buttons = buttonsArr.map((a) => {
        let arr = a.split("&");
        let text = arr[0].replace(/\[/g, "");
        let url = arr[1].replace(/\]/g, "");
        return { text, url };
    });
    return {
        text,
        buttons,
    };
}
exports.extractButtons = extractButtons;
