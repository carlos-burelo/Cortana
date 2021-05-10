import { Markup } from "telegraf";
import { ButtonI } from "interfaces/modules";

function url_buttons_maker(buttons: ButtonI[]) {
    let markupButtons = buttons.map(button => {
        return Markup.button.url(button.text, button.url);
    });
    let columnButtons = [];
    columnButtons = markupButtons;
    return columnButtons;
}

function callback_buttons_maker(buttons: ButtonI[]) {
    let markupButtons = buttons.map(button => {
        return Markup.button.callback(button.text, button.callback);
    });
    let columnButtons = [];
    columnButtons = markupButtons;
    return columnButtons;
}
export function callback_buttons(buttons: ButtonI[], columns: number) {
    let _buttons = callback_buttons_maker(buttons);
    let keyboard: any = Markup.inlineKeyboard(_buttons, { columns: columns });
    return keyboard;
}
export function url_buttons(buttons: ButtonI[], columns: number) {
    let _buttons = url_buttons_maker(buttons);
    let keyboard: any = Markup.inlineKeyboard(_buttons, { columns: columns });
    return keyboard;
}