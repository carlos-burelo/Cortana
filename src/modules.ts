import { Telegraf } from "telegraf";
import adminModule from "./core/modules/admin.module";
import androidModule from "./core/modules/android.module";
import banModule from "./core/modules/ban.module";
import biosModule from "./core/modules/bios.module";
import filtersModule from "./core/modules/filters.module";
import githubModule from "./core/modules/github.module";
import notesModule from "./core/modules/notes.module";
import startModule from "./core/modules/start.module";
import warnModule from "./core/modules/warn.module";

export default async function (bot: Telegraf) {
	androidModule(bot);
	adminModule(bot);
	startModule(bot);
	banModule(bot);
	biosModule(bot);
	filtersModule(bot);
	githubModule(bot);
	notesModule(bot);
	warnModule(bot);
}
