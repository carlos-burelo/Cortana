import { Telegraf } from "telegraf";
import adminModule from "./core/modules/admin.module";
import androidModule from "./core/modules/android.module";
import banModule from "./core/modules/ban.module";
import biosModule from "./core/modules/bios.module";
import extrasModule from "./core/modules/extras.module";
import filtersModule from "./core/modules/filters.module";
import githubModule from "./core/modules/github.module";
import helpModule from "./core/modules/help.module";
import notesModule from "./core/modules/notes.module";
import npmModule from "./core/modules/npm.module";
import ownerModule from "./core/modules/owner.module";
import startModule from "./core/modules/start.module";
import texttospeachModule from "./core/modules/texttospeach.module";
import transladorModule from "./core/modules/translador.module";
import warnModule from "./core/modules/warn.module";
import welcomeModule from "./core/modules/welcome.module";

export default async function (bot: Telegraf) {
	androidModule(bot);
	adminModule(bot);
	startModule(bot);
	banModule(bot);
	biosModule(bot);
	extrasModule(bot);
	filtersModule(bot);
	githubModule(bot);
	helpModule(bot);
	notesModule(bot);
	npmModule(bot);
	ownerModule(bot);
	transladorModule(bot);
	warnModule(bot);
	welcomeModule(bot);
	texttospeachModule(bot);

}
