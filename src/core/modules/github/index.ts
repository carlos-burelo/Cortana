import { Bot } from 'grammy';
import { Cortana } from '../../../context';

export default function githubModule(bot: Bot<Cortana>) {
  bot.command('git', async (ctx) => {
    const { gitCmd } = await import('./git');
    return await gitCmd(ctx);
  });
  bot.command('repo', async (ctx) => {
    const { repoCmd } = await import('./repo');
    return await repoCmd(ctx);
  });
  bot.command('repos', async (ctx) => {
    const { reposCmd } = await import('./repos');
    return await reposCmd(ctx);
  });
  bot.command('clone', async (ctx) => {
    const { cloneCmd } = await import('./clone');
    return await cloneCmd(ctx);
  });
}
