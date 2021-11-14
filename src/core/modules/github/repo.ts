import axios, { AxiosResponse } from 'axios';
import { Cortana } from '@context';
import { GITHUB_API } from '@config';
import { buttonBuilder } from '@libs/buttons';
import { log } from '@libs/messages';

export async function repoCmd(ctx: Cortana) {
  const { github: _ } = await ctx.lang();
  try {
    const match: string[] = ctx.params;
    if (!match[0]) return ctx.replyWithMarkdown(_.userNotFound);
    if (!match[1]) return ctx.replyWithMarkdown(_.repoNotFound);
    let res: AxiosResponse;
    try {
      res = await axios.get(`${GITHUB_API}/repos/${match[0]}/${match[1]}`);
    } catch (e) {
      return ctx.replyWithMarkdown(_.profileNotFound);
    }
    const i = res.data;
    const template = _.repoTemplate(
      i.name,
      i.owner.login,
      i.language,
      i.forks,
      i.owner.type,
      i.description
    );
    const buttons = [
      { text: _.repository, url: i.html_url },
      ...(i.homepage ? [{ text: _.website, url: i.homepage }] : []),
      { text: _.owner, url: i.owner.html_url },
    ];
    return ctx.replyWithDocument(i.owner.avatar_url, {
      caption: template,
      parse_mode: 'Markdown',
      reply_markup: buttonBuilder(buttons, 2),
    });
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: '' });
  }
}
