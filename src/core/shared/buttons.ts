import { _bot } from "../../config";
import { Markup } from "telegraf";

export const start_buttons = Markup.inlineKeyboard(
  [
    Markup.button.callback("📌 Commands", "back"),
    Markup.button.url(
      "➕ Add to group",
      `http://t.me/${_bot.username}?startgroup=true`
    ),
    Markup.button.url(
      "📄 View Documentation",
      `https:botincompletoporahora.com`
    ),
  ],
  { columns: 2 }
);
