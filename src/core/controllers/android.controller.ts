import cheerio from "cheerio";
import { api_urls } from "../../config";
import { parseString } from "xml2js";
import axios from "axios";
import { ButtonI } from "../interfaces/index";
import { urlButtons } from "../libs/markup.buttons";

export async function getFirmware(ctx, model: string, csc: string) {
  try {
    const res = await axios.get(
      `${api_urls.samsung}/${csc}/SM-${model}/version.xml`
    );
    const xmlFile = res.data;
    let firm;
    let poll;
    parseString(xmlFile, function (err, res) {
      firm = res.versioninfo.firmware[0];
      poll = res.versioninfo.polling[0];
    });

    let temp: number = firm.version[0].latest[0].$.o || "no indefinido";
    let capa = await getVersion(temp);
    let latest = firm.version[0].latest[0]._.split("/"),
      version = firm.version[0].latest[0].$.o;
    let res_msg =
      `*Ultimo firmware para SM-${model} ${csc}*\n\n` +
      `*PDA:*  {${latest[0]}}\n` +
      `*CSC:*  {${latest[1]}}\n` +
      `*Phone:* {${latest[2]}}\n` +
      `*Android:*  _${version} / ${capa}_\n\n`;
    let fw_buttons: ButtonI[] = [
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
    let extra = urlButtons(fw_buttons, 2);
    ctx.replyWithMarkdown(res_msg.replace(/[{}]/g, "`"), extra);
  } catch (error) {
    ctx.reply("Dispositivo no encontradoo o datos inconrectos");
  }
}
export async function formatMagisk(stable, canary): Promise<string> {
  let parced =
    `*Ultimas versiones de magisk*\n\n` +
    `_Estable_\n` +
    `*• Version:* _${stable.version}_(${stable.versionCode})\n` +
    `*• Apk:* [app-release.apk](${stable.link})\n` +
    `*• Notes:* [magisk-${stable.versionCode}.md](${stable.note})\n\n` +
    `_Canary_\n` +
    `*• Version:* _${canary.version}_(${canary.versionCode})\n` +
    `*• Apk:* [app-release.apk](${canary.link})\n` +
    `*• Notes:* [magisk-${canary.versionCode}.md](${canary.note})\n\n`;
  return parced;
}
export async function getVersion(build: number): Promise<string> {
  let capa;
  build == 11
    ? (capa = "OneUI 3.x")
    : build == 10
    ? (capa = "OneUI 2.x")
    : build == 9
    ? (capa = "OneUI 1.x")
    : build == 8
    ? (capa = "Samsung Experience")
    : build == 7
    ? (capa = "Samsung Experience")
    : (capa = `Touchwiz`);
  return capa;
}
export async function getTWRP(html: string, device: string): Promise<string> {
  const $ = cheerio.load(html);
  let resources: string = `<b>TWRP for ${device.toUpperCase()}\n\n</b>`;
  $("table tr").each((i, e) => {
    let el = $(e);
    let name: string = el.find("a").text();
    let url: string = el.find("a").attr("href");
    let date: string = el
      .find("td:nth-child(2) .filesize small")
      .text()
      .replace(" ", "");
    let size: string = el.find("td:nth-child(3) .filesize small em").text();
    resources += `<b>Nombre:</b> ${name}\n`;
    resources += `<b>Tamaño:</b> ${size}\n`;
    resources += `<b>Lanzamiento:</b> ${date}\n`;
    resources += `<a href="${api_urls.twrp}${url}">${name}</a>\n\n`;
  });
  return resources;
}
