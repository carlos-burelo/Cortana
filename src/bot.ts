import { Cortana } from '@context';
import adminModule from '@modules/admin';
import androidModule from '@modules/android';
import biosModule from '@modules/bios';
import blacklistModule from '@modules/blacklist';
import extrasModule from '@modules/extras';
import githubModule from '@modules/github';
import helperModule from '@modules/help';
import startModule from '@modules/start';
import stickersModule from '@modules/stickers';
import { Bot } from 'grammy';
import nodeModule from './core/modules/node';

export function modules(bot: Bot<Cortana>) {
  adminModule(bot);
  androidModule(bot);
  biosModule(bot);
  blacklistModule(bot);
  extrasModule(bot);
  githubModule(bot);
  helperModule(bot);
  nodeModule(bot);
  startModule(bot);
  stickersModule(bot);
}
