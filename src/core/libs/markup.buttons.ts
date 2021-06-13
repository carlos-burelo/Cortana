import { Markup } from "telegraf";
import { ButtonI } from "../interfaces/index";

function urlButtonsMaker(buttons: ButtonI[]) {
  let markupButtons = buttons.map((button) => {
    return Markup.button.url(button.text, button.url);
  });
  let columnButtons = [];
  columnButtons = markupButtons;
  return columnButtons;
}
function callbackButtonsMaker(buttons: ButtonI[]) {
  let markupButtons = buttons.map((button) => {
    return Markup.button.callback(button.text, button.callback);
  });
  let columnButtons = [];
  columnButtons = markupButtons;
  return columnButtons;
}
export function callbackButtons(buttons: ButtonI[], columns: number) {
  let _buttons = callbackButtonsMaker(buttons);
  let keyboard: any = Markup.inlineKeyboard(_buttons, { columns: columns });
  return keyboard;
}
export function urlButtons(buttons: ButtonI[], columns: number) {
  let _buttons = urlButtonsMaker(buttons);
  let keyboard = Markup.inlineKeyboard(_buttons, { columns: columns });
  return keyboard;
}
