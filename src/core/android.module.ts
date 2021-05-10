import axios from "axios";
import { api_urls } from "../config";
import { parseString } from "xml2js";
import { Telegraf } from "telegraf";
import { get_version, magisk_format } from "../controllers/android.controller";
import { ButtonI } from "../interfaces/modules";
import { url_buttons } from "../libs/markup.buttons";


export default function (bot: Telegraf) {
    bot.command("/magisk", async (ctx) => {
        const { data: { magisk: stable, } } = await axios.get(`${api_urls.magisk}/stable.json`);
        const { data: { magisk: canary } } = await axios.get(`${api_urls.magisk}/stable.json`);
        let response = await magisk_format(stable, canary)
        ctx.replyWithMarkdown(response);
    });
    bot.command("/fw", async (ctx) => {
        let message = ctx.update.message.text.split(" ");
        let model = message[1]
        if (!model) {
            ctx.reply('Porfavor coloque algun modelo');
            return
        }
        model = model.toUpperCase()
        let csc = message[2]
        if (!csc) {
            ctx.reply('Porfavor coloque la region');
            return
        }
        csc = csc.toUpperCase()
        try {
            const res = await axios.get(`${api_urls.samsung}/${csc}/SM-${model}/version.xml`);
            const xmlFile = res.data
            let firm;
            let poll;
            parseString(xmlFile, function (err, res) {
                firm = res.versioninfo.firmware[0];
                poll = res.versioninfo.polling[0];
            });

            let temp: number = firm.version[0].latest[0].$.o || 'no indefinido'
            let capa = await get_version(temp)
            let latest = firm.version[0].latest[0]._.split("/"),
                version = firm.version[0].latest[0].$.o
            let res_msg =
                `*Ultimo firmware para SM-${model} ${csc}*\n\n` +
                `*PDA:*  {${latest[0]}}\n` +
                `*CSC:*  {${latest[1]}}\n` +
                `*Phone:* {${latest[2]}}\n` +
                `*Android:*  _${version} / ${capa}_\n\n`
            let fw_buttons: ButtonI[] = [
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
            ]
            let extra = url_buttons(fw_buttons, 2);
            ctx.replyWithMarkdown(res_msg.replace(/[{}]/g, '`'), extra);
        } catch (error) {
            ctx.reply('Dispositivo no encontradoo o datos inconrectos');
        };
    });
}