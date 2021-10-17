import axios, { AxiosResponse } from 'axios';
import { Cortana } from '../../../context';
import { GITHUB_API } from '../../../config';
import { log } from '../../libs/messages';

export async function reposCmd(ctx: Cortana) {
  const { github: _ } = await ctx.lang();
  try {
    const match: string[] = ctx.params;
    if (!match[0]) return ctx.replyWithMarkdown(_.userNotFound);
    let res: AxiosResponse;
    try {
      res = await axios.get(`${GITHUB_API}/users/${match[0]}/repos`);
    } catch (error) {}
    const data = res.data;
    if (data.length !== 0) {
      let repositories: string = _.reposTitle(data.length);
      data.forEach((repo: any, i: number) => {
        let indice1: number = i + 1;
        let indice: string = indice1 < 10 ? `0${indice1}` : `${indice1}`;
        repositories += `*${indice}:* [${repo.name}](${repo.html_url})\n`;
      });
      return ctx.replyWithMarkdown(repositories, {
        disable_web_page_preview: true,
      });
    } else {
      return ctx.reply(_.profileNotFound);
    }
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: '' });
  }
}

export const reposHelp = `Help for *repos* command`;
