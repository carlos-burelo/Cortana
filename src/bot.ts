import android_module from "./core/android.module";
import { Telegraf } from "telegraf";
import admin_module from "./core/admin.module";
import bios_module from "./core/bios.module";
import notes_module from "./core/notes.module";
import owner_module from "./core/owner.module";
import help_module from "./core/help.module";
import misc_module from "./core/misc.module";
import welcome_module from "./core/welcome.module";
export default async function (bot: Telegraf) {
  android_module(bot);
  admin_module(bot);
  owner_module(bot);
  help_module(bot)
  bios_module(bot);
  notes_module(bot);
  misc_module(bot);
  welcome_module(bot)
}