
import { Telegraf } from "telegraf";
import bios_module from "./core/bios.module";
import notes_module from "./core/notes.module";
import owner_module from "./core/owner.module";
export default async function (bot:Telegraf) {
  owner_module(bot)
  bios_module(bot);
  notes_module(bot)
}