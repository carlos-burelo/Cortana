import { Bot } from 'grammy';
import { Cortana } from '../../../context';
// Commands import
import { gitCmd, gitHelp } from './git';
import { repoCmd, repoHelp } from './repo';
import { reposCmd, reposHelp } from './repos';
import { cloneCmd, cloneHelp } from './clone';

export default function githubModule(bot: Bot<Cortana>) {
  bot.command('git', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdownV2(gitHelp);
    return await gitCmd(ctx);
  });
  bot.command('repo', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdown(repoHelp);
    return await repoCmd(ctx);
  });
  bot.command('repos', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdown(reposHelp);
    return await reposCmd(ctx);
  });
  bot.command('clone', async (ctx) => {
    if (ctx.help) return ctx.replyWithMarkdown(cloneHelp);
    return await cloneCmd(ctx);
  });
}
