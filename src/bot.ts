import AdminModule from "./modules/admin.module";
import AnimeModule from "./modules/anime.module";
import AndroidModule from "./modules/android.module";
import BiosAndAbuotsModule from "./modules/bios.module";
import GitHubModule from "./modules/github.module";
import HelpModule from "./modules/help.module";
import MicelaneusModule from "./modules/misc.module";
import NotesModule from "./modules/notes.module";
import WelcomeModule from "./modules/welcome.module";
import stickersModule from "./modules/stickers.module";
import translatorModule from "./modules/translator.module";
import bansModule from "./modules/bans.module";
import ownerModule from "./modules/owner.module";
import { Telegraf } from "telegraf";

export default function (bot:Telegraf) {
  AdminModule(bot);
  AnimeModule(bot);
  BiosAndAbuotsModule(bot);
  AndroidModule(bot);
  bansModule(bot)
  GitHubModule(bot);
  HelpModule(bot);
  MicelaneusModule(bot);
  NotesModule(bot);
  ownerModule(bot)
  WelcomeModule(bot);
  stickersModule(bot);
  translatorModule(bot)
}
