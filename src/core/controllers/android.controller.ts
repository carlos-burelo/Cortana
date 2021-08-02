import axios from 'axios';
import cheerio from 'cheerio';
import { Context } from 'telegraf';
import { _apis } from '../../config';
import { lang } from '../../database';
import { ButtonI } from '../interfaces/index';
import { createButtons } from '../libs/buttons';
import { errorHandler } from '../libs/messages';

export async function getMagisk(ctx: Context) {
  try {
    const { androidModule: _ } = await lang(ctx);
    const {
      data: { magisk: stable }
    } = await axios.get(`${_apis.magisk}/stable.json`);
    const {
      data: { magisk: canary }
    } = await axios.get(`${_apis.magisk}/stable.json`);
    let response =
      _.titleMagisk +
      `_Stable_\n` +
      `*• Version:* _${stable.version}_(${stable.versionCode})\n` +
      `*• Apk:* [app-release.apk](${stable.link})\n` +
      `*• Notes:* [magisk-${stable.versionCode}.md](${stable.note})\n\n` +
      `_Canary_\n` +
      `*• Version:* _${canary.version}_(${canary.versionCode})\n` +
      `*• Apk:* [app-release.apk](${canary.link})\n` +
      `*• Notes:* [magisk-${canary.versionCode}.md](${canary.note})\n\n`;
    return ctx.replyWithMarkdown(response);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'getMagisk()', l });
  }
}
export async function getFirmware(ctx: Context, model: string, csc: string) {
  try {
    const { androidModule: _ } = await lang(ctx);
    let { data } = await axios.get(`${_apis.samsung}/${csc}/SM-${model}/version.xml`);
    const $ = cheerio.load(data);
    let fw: string[] = $('version latest').text().split('/');
    let build: number = parseInt($('version latest').attr('o'));
    let btns: ButtonI[] = [
      {
        text: `Samfrew`,
        url: `https://samfrew.com/model/SM-${model}/region/${csc}/`
      },
      {
        text: `Sammobile`,
        url: `https://www.sammobile.com/samsung/firmware/SM-${model}/${csc}/`
      },
      {
        text: `Sfirmware`,
        url: `https://sfirmware.com/samsung-sm-${model.toLowerCase()}/#tab=firmwares`
      },
      {
        text: `SamFw`,
        url: `https://samfw.com/firmware/SM-${model}/${csc}/`
      }
    ];
    let message =
      _.titleFirm(model, csc) +
      `*PDA:*  \`${fw[0]}\`\n` +
      `*CSC:*  \`${fw[1]}\`\n` +
      `*Phone:*  \`${fw[2]}\`\n` +
      `*Android:*  _${build} / ${getMask(build)}_\n\n`;
    return ctx.replyWithMarkdown(message, {
      reply_markup: createButtons(btns, 2)
    });
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'getFirmware()', l });
  }
}
export function getMask(build: number): string {
  switch (build) {
    case 11:
      return 'OneUI 3.x';
    case 10:
      return 'OneUI 2.x';
    case 9:
      return 'OneUI 1.x';
    case 8:
    case 7:
      return 'Samsung Experience';
    default:
      return 'Touchwiz';
  }
}
export async function getTWRP(ctx: Context, device: string) {
  try {
    const { androidModule: _ } = await lang(ctx);
    const { data } = await axios.get(`${_apis.twrp}/${device}/`);
    const $ = cheerio.load(data);
    let res: string = _.titleTwrp(device);
    $('table tr').each((i, e) => {
      let el = $(e);
      let name: string = el.find('a').text();
      let url: string = el.find('a').attr('href');
      let date: string = el.find('td:nth-child(2) .filesize small').text().replace(' ', '');
      let size: string = el.find('td:nth-child(3) .filesize small em').text();
      res += _.name(name);
      res += _.size(size);
      res += _.release(date);
      res += _.link(`${_apis.twrp}${url}`, name);
    });
    return ctx.replyWithHTML(res);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ ctx, error, __filename, f: 'getTWRP()', l });
  }
}
