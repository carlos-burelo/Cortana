import { ButtonI } from '../types';

/**
 * Describe your function
 * @param {ButtonI[]} buttons
 * @param {number} columns = 2
 * @return {ButtonI[][]}
 */
export function mkBtns(buttons: ButtonI[], columns: number = 2): ButtonI[][] {
  const totalRows = Math.ceil(buttons.length / columns);
  const rows: ButtonI[][] = [];
  for (let i = 0; i < totalRows; i++) {
    const slice = buttons.slice(i * columns, (i + 1) * columns);
    rows.push(slice);
  }
  return rows;
}
/**
 * Describe your function
 * @param {string} text
 * @return {{ text: string; buttons: ButtonI[] } | undefined}
 */

export function extractButtons(
  text: string
): { text: string; buttons: ButtonI[] } | undefined {
  let regex: RegExp = /\[.+?\s?&\s?http[s]?:\/\/.+?\]/gim;
  let buttonsArr: string[] = text.match(regex);
  if (buttonsArr == null || buttonsArr == undefined) {
    return undefined;
  }
  buttonsArr.map((a) => {
    text = text.replace(a, '');
  });
  let buttons = buttonsArr.map((a) => {
    let arr = a.split('&');
    let text: string = arr[0].replace(/\[/g, '');
    let url: string = arr[1].replace(/\]/g, '');
    return { text, url };
  });
  return {
    text,
    buttons
  };
}
