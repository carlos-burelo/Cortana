import Cheerio from 'cheerio';
import axios from 'axios';
import { SAMSUNG_API, TWRP_API } from '@config';

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

export async function fwScrapping(csc: string, model: string) {
  try {
    let { data } = await axios.get(`${SAMSUNG_API}/${csc}/SM-${model}/version.xml`);
    const $ = Cheerio.load(data);
    let fw: string[] = $('version latest').text().split('/');
    let build: number = parseInt($('version latest').attr('o'));
    let mask: string = '';
    build == 11
      ? (mask = 'OneUI 3.x')
      : build == 10
      ? (mask = 'OneUI 2.x')
      : build == 9
      ? (mask = 'OneUI 1.x')
      : build == (8 || 7)
      ? (mask = 'Samsung Experience')
      : (mask = 'Touchwiz');
    let btns = [
      {
        text: `Samfrew`,
        url: `https://samfrew.com/model/SM-${model}/region/${csc}/`,
      },
      {
        text: `Sammobile`,
        url: `https://www.sammobile.com/samsung/firmware/SM-${model}/${csc}/`,
      },
      {
        text: `Sfirmware`,
        url: `https://sfirmware.com/samsung-sm-${model.toLowerCase()}/#tab=firmwares`,
      },
      {
        text: `SamFw`,
        url: `https://samfw.com/firmware/SM-${model}/${csc}/`,
      },
    ];
    return {
      pda: fw[0],
      model,
      csc: fw[1],
      phone: fw[2],
      build,
      mask,
      btns,
    };
  } catch (error) {
    return undefined;
  }
}

export async function twrpScrapping(device: string) {
  try {
    const { data } = await axios.get(`${TWRP_API}/${device}/`);
    const $ = Cheerio.load(data);
    return $('table tr')
      .map((i, e) => {
        let el = $(e);
        return {
          name: el.find('a').text(),
          url: el.find('a').attr('href'),
          date: el.find('td:nth-child(2) .filesize small').text(),
          size: el.find('td:nth-child(3) .filesize small em').text(),
        };
      })
      .toArray();
  } catch (error) {}
}
