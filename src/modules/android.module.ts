import axios from "axios";
import { api_urls } from "../config";
import { parseString } from "xml2js";
import {  Telegraf } from "telegraf";
import { ButtonUrls } from "./functions/markup.buttons";
import { ButtonInterface } from "./models/buttons";

export default function(bot:Telegraf) {
  bot.command("/magisk", async(ctx) => {
    const { data: { magisk: stable, } } = await axios.get(`${api_urls.magisk}/stable.json`);
    const { data: { magisk: beta } } = await axios.get(`${api_urls.magisk}/stable.json`);
    const { data: { magisk: canary } } = await axios.get(`${api_urls.magisk}/stable.json`);
    ctx.replyWithMarkdown(
      `*Ultimas versiones de magisk*\n\n` +
      `_Estable_\n` +
      `*• Version:* _${stable.version}_(${stable.versionCode})\n` +
      `*• Apk:* [app-release.apk](${stable.link})\n` +
      `*• Notes:* [magisk-${stable.versionCode}.md](${stable.note})\n\n` +
      `_Canary_\n` +
      `*• Version:* _${canary.version}_(${canary.versionCode})\n` +
      `*• Apk:* [app-release.apk](${canary.link})\n` +
      `*• Notes:* [magisk-${canary.versionCode}.md](${canary.note})\n\n` +
      `_Beta_\n` +
      `*• Version:* _${beta.version}_(${beta.versionCode})\n` +
      `*• Apk:* [app-release.apk](${beta.link})\n` +
      `*• Notes:* [magisk-${beta.versionCode}.md](${beta.note})\n\n`
    );
  });
  bot.command("/fw", async(ctx) => {
    try {
      let message = ctx.update.message.text.split(" ");
      let model = message[1].toUpperCase()
      let csc = message[2].toUpperCase()
      const res = await axios.get(`${api_urls.sams}/${csc}/SM-${model}/version.xml`);
      const xmlFile = res.data
      let firm;
      let poll;
      parseString(xmlFile, function(err, res) {
        firm = res.versioninfo.firmware[0];
        poll = res.versioninfo.polling[0];
      });
      let capa;
      let temp = firm.version[0].latest[0].$.o || 'no indefinido'
      temp == 11 ? capa = 'OneUI 3.x' :
      temp == 10 ? capa = 'OneUI 2.x' :
      temp == 9 ? capa = 'OneUI 1.x' :
      temp == 8 ? capa = 'Samsung Experience' :
      temp == 7 ? capa = 'Samsung Experience' :
      capa = `Touchwiz`
      let latest = firm.version[0].latest[0]._.split("/"),
        version = firm.version[0].latest[0].$.o
        let res_msg =
        `*Ultimo firmware para SM-${model} ${csc}*\n\n` +
        `*PDA:*  {${latest[0]}}\n` +
        `*CSC:*  {${latest[1]}}\n` +
        `*Phone:* {${latest[2]}}\n` +
        `*Android:*  _${version} / ${capa}_\n\n`
        let fw_buttons:Array<ButtonInterface> = [
          {
            text: `Samfrew`,
            url: `https://samfrew.com/model/SM-${model}/region/${csc}/`
          },
          {
            text: `Sammobile`,
            url: `https://www.sammobile.com/samsung/firmware/SM-${model}/${csc}/`
          },
          {
            text: `SamFw`,
            url: `https://samfw.com/firmware/SM-${model}/${csc}/`
          }
        ]
        let extra = ButtonUrls(fw_buttons, 1);
        ctx.replyWithMarkdown(res_msg.replace(/[{}]/g, '`'), extra);
    } catch (error) {
      ctx.reply('Dispositivo no encontradoo o datos inconrectos');
    };
  });
}