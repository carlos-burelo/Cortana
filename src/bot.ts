import android_module from "./core/android.module";
import { Telegraf } from "telegraf";
import admin_module from "./core/admin.module";
import bios_module from "./core/bios.module";
import notes_module from "./core/notes.module";
import owner_module from "./core/owner.module";
import help_module from "./core/help.module";
import misc_module from "./core/misc.module";
import welcome_module from "./core/welcome.module";
import bans_module from "./core/bans.module";
import github_module from "./core/github.module";
import translator_module from "./core/translator.module";
import anime_module from "./core/anime.module";
export default async function (bot: Telegraf) {
  admin_module(bot);
  android_module(bot);
  anime_module(bot)
  bans_module(bot);
  bios_module(bot);
  github_module(bot)
  help_module(bot)
  misc_module(bot);
  notes_module(bot);
  owner_module(bot);
  translator_module(bot)
  welcome_module(bot)
}