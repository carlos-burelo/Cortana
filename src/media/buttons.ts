import { Markup } from "telegraf";
import { botConfig } from "../config";

export const start_buttons = Markup.inlineKeyboard(
  [
    Markup.button.callback("📌 Commands", "back"),
    Markup.button.url(
      "➕ Add to group",
      `http://t.me/${botConfig.username}?startgroup=true`
    ),
    Markup.button.url(
      "📄 View Documentation",
      `http://github.com/carlos-burelo/CortanaJs`
    ),
  ],
  { columns: 2 }
);
export const help_buttons = Markup.inlineKeyboard(
  [
    Markup.button.callback("Administrador", "admin"),
    Markup.button.callback("Anime", "anime"),
    Markup.button.callback("AntiFlood", "antiflood"),
    Markup.button.callback("AntiSpam", "antispam"),
    Markup.button.callback("Baneos", "ban"),
    Markup.button.callback("Bios/Abouts", "bios"),
    Markup.button.callback("Lista negra", "blacklist"),
    Markup.button.callback("GitHub", "github"),
    Markup.button.callback("Extras", "extras"),
    Markup.button.callback("Silencio", "mute"),
    Markup.button.callback("Notas", "notes"),
    Markup.button.callback("Reglas", "rules"),
    Markup.button.callback("Stickers", "stickers"),
    Markup.button.callback("Traductor", "translate"),
    Markup.button.callback("Usuarios", "users"),
    Markup.button.callback("Advertencias", "warns"),
    Markup.button.callback("Bienvenidas", "wellcome"),
    Markup.button.callback("Wikipedia", "wikipedia"),
    Markup.button.callback("Youtube", "youtube"),
  ],
  { columns: 3 }
);

export const back_button = Markup.inlineKeyboard([
  Markup.button.callback("⬅️ Back", "back"),
]);