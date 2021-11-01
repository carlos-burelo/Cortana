import { InlineKeyboardButton } from 'grammy/out/platform';

/**
 * Create buttons and columns from simple array
 * @param {InlineKeyboardButton[]} buttons
 * @param {number} columns
 * @return {InlineButtons}
 */
export function buttonBuilder(buttons: InlineKeyboardButton[], columns: number = 2): InlineButtons {
  const totalRows = Math.ceil(buttons.length / columns);
  const rows: InlineKeyboardButton[][] = [];
  for (let i = 0; i < totalRows; i++) {
    const slice = buttons.slice(i * columns, (i + 1) * columns);
    rows.push(slice);
  }
  return { inline_keyboard: rows };
}
/**
 * Extract buttons in text message an clean message
 * @param {string} text
 * @return {InTextButtons | undefined}
 */
export function getButtons(text: string): InTextButtons | undefined {
  const regex = /\[.+?\s?\|\s?http[s]?:\/\/.+?\]/gim;
  const res: string[] | null = text.match(regex);
  if (res == null) return undefined;
  const btns = res.map((i) => {
    const [text, url] = i
      .replace(/[\]\[]/g, '')
      .trim()
      .split('|');
    return { text, url };
  });
  res.forEach((i) => {
    text = text.replace(i, '').replace(/\s\s/g, ' ');
  });
  const buttons = buttonBuilder(btns);
  return { buttons, text };
}

interface InTextButtons {
  buttons: InlineButtons;
  text: string;
}
interface InlineButtons {
  inline_keyboard: InlineKeyboardButton[][];
}
