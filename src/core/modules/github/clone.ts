import { Cortana } from '@context';
import { request } from '@libs/request';
import { GitHubRepoApiResponse } from '@models/apis';

export async function cloneCmd(ctx: Cortana) {
  try {
    const { github: _ } = await ctx.lang();
    const gitUrlMatch: RegExp = /https:\/\/github\.com\/(.+)\/(.+)/;
    const match = ctx.msg.text.match(gitUrlMatch);
    let user: string, repo: string;
    if (match !== null) (user = match[1]), (repo = match[2]);
    else (user = ctx.params[0]), (repo = ctx.params[1]);
    const i = await request<GitHubRepoApiResponse>(`https://api.github.com/repos/${user}/${repo}`);
    const info = _.cloneTemplate(repo, user, i.default_branch, i.description);
    ctx.replyWithDocument(
      `https://github.com/${user}/${repo}/archive/refs/heads/${i.default_branch}.zip`,
      {
        caption: info,
        parse_mode: 'Markdown',
      }
    );
  } catch (error) {
    const { github: _ } = await ctx.lang();
    return ctx.reply(_.repoGetError);
  }
}
