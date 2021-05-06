import { ButtonInterface } from "../interfaces/functions";
import { Markup } from "telegraf";
import { KeyboardButton, ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram";

function getMarkupButtons(buttons) {
    let markupButtons = buttons.map(button => {
        return Markup.button.url(
            `${button.text}`,
            `${button.url}`
        )
    });
    let columnButtons = [];
    columnButtons = markupButtons;
    return columnButtons;
}
export function ButtonUrls(buttons:Array<ButtonInterface>, columns:number ) {
    let columnButtons = getMarkupButtons(buttons);
    let keyboard:any = Markup.inlineKeyboard(columnButtons, {columns: columns});
    return keyboard;
}
