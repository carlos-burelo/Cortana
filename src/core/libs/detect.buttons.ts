import { ButtonI } from "../interfaces/index";

export async function getButtonsFromString(
  text: string
): Promise<{ buttons: string[]; found: boolean }> {
  let regex: RegExp = /\[([^\]]+)]/g;
  let match;
  let res: string[] = [];
  let f: boolean;
  while ((match = regex.exec(text)) !== null) {
    if (match[1].includes("&")) {
      res.push(match[1]);
    }
  }
  res.length !== 0 ? (f = true) : (f = false);
  return {
    buttons: res,
    found: f,
  };
}

export async function textToButtons(text: string[]): Promise<ButtonI[]> {
  let buttons: ButtonI[] = [];
  text.forEach((b) => {
    let item = b.split(" & ");
    if (item[1].includes("http") == false) {
      return [];
    }
    let button = {
      text: item[0],
      url: item[1],
    };
    buttons.push(button);
  });
  console.log(buttons);
  return buttons;
}
