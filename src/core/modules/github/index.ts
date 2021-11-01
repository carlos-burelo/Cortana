import { Bot } from 'grammy';
import { Cortana } from '@context';
import { cloneCmd } from './clone';
import { gitCmd } from './git';
import { reposCmd } from './repos';
import { repoCmd } from './repo';

export default function githubModule(bot: Bot<Cortana>) {
  bot.command('git', async (ctx) => gitCmd(ctx));
  bot.command('repo', async (ctx) => repoCmd(ctx));
  bot.command('repos', async (ctx) => reposCmd(ctx));
  bot.command('clone', async (ctx) => cloneCmd(ctx));
}
