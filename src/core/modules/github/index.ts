import { Bot } from 'grammy';
import { Cortana } from '@context';
import { cloneCmd } from './clone';
import { gitCmd } from './git';
import { reposCmd } from './repos';

export default function githubModule(bot: Bot<Cortana>) {
  bot.command('git', async (ctx) => gitCmd(ctx));
  bot.command('repo', async (ctx) => reposCmd(ctx));
  bot.command('repos', async (ctx) => reposCmd(ctx));
  bot.command('clone', async (ctx) => cloneCmd(ctx));
}
