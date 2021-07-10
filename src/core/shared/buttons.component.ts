import { Markup } from "telegraf";
import { _bot } from "../../config";

export const startButtons = Markup.inlineKeyboard(
	[
		Markup.button.callback("📌 Commands", "help_back"),
		Markup.button.callback("🇲🇽 Languages", "set_lang"),
		Markup.button.url(
			"➕ Add to group",
			`http://t.me/${_bot.username}?startgroup=true`,
		),
		Markup.button.url("📄 Documentation", `https://indevelopment.com`),
	],
	{ columns: 2 },
);
