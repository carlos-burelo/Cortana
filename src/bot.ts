import { Cortana } from '@context';
import adminModule from '@modules/admin';
import androidModule from '@modules/android';
import banModule from '@modules/ban';
import biosModule from '@modules/bios';
import blacklistModule from '@modules/blacklist';
import extrasModule from '@modules/extras';
import githubModule from '@modules/github';
import helperModule from '@modules/help';
import nodeModule from '@modules/node';
import notesModule from '@modules/notes';
import ownerModule from '@modules/owner';
import startModule from '@modules/start';
import stickersModule from '@modules/stickers';
import { Bot } from 'grammy';

export function modules(bot: Bot<Cortana>) {
  adminModule(bot);
  androidModule(bot);
  banModule(bot);
  biosModule(bot);
  blacklistModule(bot);
  extrasModule(bot);
  githubModule(bot);
  helperModule(bot);
  nodeModule(bot);
  notesModule(bot);
  ownerModule(bot);
  startModule(bot);
  stickersModule(bot);
}
