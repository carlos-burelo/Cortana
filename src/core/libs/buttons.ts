
export function mkBtns<T>(buttons: T[], columns = 2): T[][] {
    const totalRows = Math.ceil(buttons.length / columns)
    const rows: T[][] = []
    for (let i = 0; i < totalRows; i++) {
        const slice = buttons.slice(i * columns, (i + 1) * columns)
        rows.push(slice)
    }
    return rows
}

// import { Markup } from 'telegraf';
// import { ButtonI } from '../types';

// /**
//  * Button generator based on the property
//  * `url` or` callback`
//  * @param {ButtonI[]} buttons
//  * @returns 
//  */
// function buttonMaker(buttons: ButtonI[]): any[] {
//   let markupButtons: any[] = buttons.map((button) => {
//     if (button.url) {
//       return Markup.button.url(button.text, button.url);
//     } else {
//       return Markup.button.callback(button.text, button.callback);
//     }
//   });
//   return markupButtons;
// }
// /**
//  * Function that receives buttons arrays and the
//  * number of columns to generate a keyboard
//  * dynamic
//  * @param {ButtonI[]} buttons
//  * @param {number} columns
// */
// export function createButtons(buttons: ButtonI[], columns: number = 1) {
//   let _buttons = buttonMaker(buttons);
//   return Markup.inlineKeyboard(_buttons, { columns: columns }).reply_markup;
// }
// /**
//  * Function that evaluates through an expression
//  * regular, the existence of buttons on a chain
//  * of text, and transform them into an array of objects
//  * Handling and built
//  * @param {string} text
//  */
// export function extractButtons(text: string): { text: string; buttons: ButtonI[] } | undefined {
//   let regex: RegExp = /\[.+?\s?&\s?http[s]?:\/\/.+?\]/gim;
//   let buttonsArr: string[] = text.match(regex);
//   if (buttonsArr == null || buttonsArr == undefined) {
//     return undefined;
//   }
//   buttonsArr.map((a) => {
//     text = text.replace(a, '');
//   });
//   let buttons = buttonsArr.map((a) => {
//     let arr = a.split('&');
//     let text: string = arr[0].replace(/\[/g, '');
//     let url: string = arr[1].replace(/\]/g, '');
//     return { text, url };
//   });
//   return {
//     text,
//     buttons
//   };
// }
