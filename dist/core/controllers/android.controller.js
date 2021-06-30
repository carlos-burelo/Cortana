"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTWRP = exports.getMask = exports.getFirmware = exports.getMagisk = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const config_1 = require("../../config");
const lang_1 = require("../../lang");
const buttons_1 = require("../libs/buttons");
async function getMagisk(ctx) {
    try {
        const { androidModule: _ } = lang_1.getLang(ctx.chat);
        const { data: { magisk: stable }, } = await axios_1.default.get(`${config_1._apis.magisk}/stable.json`);
        const { data: { magisk: canary }, } = await axios_1.default.get(`${config_1._apis.magisk}/stable.json`);
        let response = _.titleMagisk +
            `_Stable_\n` +
            `*• Version:* _${stable.version}_(${stable.versionCode})\n` +
            `*• Apk:* [app-release.apk](${stable.link})\n` +
            `*• Notes:* [magisk-${stable.versionCode}.md](${stable.note})\n\n` +
            `_Canary_\n` +
            `*• Version:* _${canary.version}_(${canary.versionCode})\n` +
            `*• Apk:* [app-release.apk](${canary.link})\n` +
            `*• Notes:* [magisk-${canary.versionCode}.md](${canary.note})\n\n`;
        return ctx.replyWithMarkdown(response);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getMagisk = getMagisk;
async function getFirmware(ctx, model, csc) {
    try {
        const { androidModule: _ } = lang_1.getLang(ctx.chat);
        let { data } = await axios_1.default.get(`${config_1._apis.samsung}/${csc}/SM-${model}/version.xml`);
        const $ = cheerio_1.default.load(data);
        let fw = $("version latest").text().split("/");
        let build = parseInt($("version latest").attr("o"));
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
        let message = _.titleFirm(model, csc) +
            `*PDA:*  \`${fw[0]}\`\n` +
            `*CSC:*  \`${fw[1]}\`\n` +
            `*Phone:*  \`${fw[2]}\`\n` +
            `*Android:*  _${build} / ${getMask(build)}_\n\n`;
        return ctx.replyWithMarkdown(message, {
            reply_markup: buttons_1.createButtons(btns, 2),
        });
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getFirmware = getFirmware;
function getMask(build) {
    switch (build) {
        case 11:
            return "OneUI 3.x";
        case 10:
            return "OneUI 2.x";
        case 9:
            return "OneUI 1.x";
        case 8:
        case 7:
            return "Samsung Experience";
        default:
            return "Touchwiz";
    }
}
exports.getMask = getMask;
async function getTWRP(ctx, device) {
    try {
        const { androidModule: { words: _ }, } = lang_1.getLang(ctx.chat);
        const { data } = await axios_1.default.get(`${config_1._apis.twrp}/${device}/`);
        const $ = cheerio_1.default.load(data);
        let res = _.title1(device);
        $("table tr").each((i, e) => {
            let el = $(e);
            let name = el.find("a").text();
            let url = el.find("a").attr("href");
            let date = el
                .find("td:nth-child(2) .filesize small")
                .text()
                .replace(" ", "");
            let size = el
                .find("td:nth-child(3) .filesize small em")
                .text();
            res += _.name(name);
            res += _.size(size);
            res += _.release(date);
            res += _.link(`${config_1._apis.twrp}${url}`, name);
        });
        return ctx.replyWithHTML(res);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getTWRP = getTWRP;
