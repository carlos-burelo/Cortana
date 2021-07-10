import { Markup } from "telegraf";
import { ButtonI } from "../interfaces";

function buttonMaker(buttons: ButtonI[]) {
	let markupButtons: any[] = buttons.map((button) => {
		if (button.url) {
			return Markup.button.url(button.text, button.url);
		} else {
			return Markup.button.callback(button.text, button.callback);
		}
	});
	return markupButtons;
}

export function createButtons(buttons: ButtonI[], columns: number) {
	let _buttons = buttonMaker(buttons);
	return Markup.inlineKeyboard(_buttons, { columns: columns }).reply_markup;
}

interface StringBtn {
	text: string;
	buttons: ButtonI[];
}
export function extractButtons(text: string): StringBtn | undefined {
	let regex: RegExp = /\[.+?\s?&\s?http[s]?:\/\/.+?\]/gim;
	let buttonsArr: string[] = text.match(regex);

	if (buttonsArr == null || buttonsArr == undefined) {
		return undefined;
	}
	buttonsArr.map((a) => {
		text = text.replace(a, "");
	});
	let buttons = buttonsArr.map((a) => {
		let arr = a.split("&");
		let text: string = arr[0].replace(/\[/g, "");
		let url: string = arr[1].replace(/\]/g, "");
		return { text, url };
	});
	return {
		text,
		buttons,
	};
}
