import Cheerio from 'cheerio';
import axios, { AxiosResponse } from 'axios';

// GITHUB_SCRAPING
export interface RepoInterface {
  link: string;
  description: string;
  branch: string;
  download: string;
  tags: string[];
  forks: number;
  stars: number;
}

export async function repoScrapping(
  user: string,
  repo: string
): Promise<RepoInterface | undefined> {
  try {
    const url = `https://github.com/${user}/${repo}`;
    const { data }: AxiosResponse = await axios.get(url);
    const $ = Cheerio.load(data);
    const description: string = $('p.f4.mt-3').text().trim();
    const branch: string = $('summary span.css-truncate-target').text();
    const link: string = `https://github.com/${user}/${repo}`;
    const download: string = `https://github.com/${user}/${repo}/archive/refs/heads/${branch}.zip`;
    const stars = parseInt(
      $('.pagehead-actions.flex-shrink-0.d-none.d-md-inline li:nth-child(2)')
        .text()
        .replace(/\s|\D/g, '')
    );
    const forks = parseInt(
      $('.pagehead-actions.flex-shrink-0.d-none.d-md-inline li:nth-child(3)')
        .text()
        .replace(/\s|\D/g, '')
    );
    const tags: any[] = $('a.topic-tag.topic-tag-link')
      .map((i, e) => {
        return $(e).text().trim();
      })
      .toArray();
    return { link, description, branch, download, tags, forks, stars };
  } catch (error) {
    return undefined;
  }
}
