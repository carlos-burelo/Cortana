import { Cortana } from '../../../context';
import { repoScrapping } from '../../libs/scraping';

export async function cloneCmd(ctx: Cortana) {
  try {
    const { github: _ } = await ctx.lang();
    const gitUrlMatch: RegExp = /https:\/\/github\.com\/(.+)\/(.+)/;
    const match = ctx.msg.text.match(gitUrlMatch);
    let user: string, repo: string;
    if (match !== null) (user = match[1]), (repo = match[2]);
    else (user = ctx.params[0]), (repo = ctx.params[1]);
    const i = await repoScrapping(user, repo);
    const info = _.cloneTemplate(repo, user, i.branch, i.description);
    ctx.replyWithDocument(i.download, {
      caption: info,
      parse_mode: 'Markdown'
    });
  } catch (error) {
    const { github: _ } = await ctx.lang();
    return ctx.reply(_.repoGetError);
  }
}

export const cloneHelp = `Help for *clone* command`;
