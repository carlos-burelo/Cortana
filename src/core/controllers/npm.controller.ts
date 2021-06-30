import { Context } from "telegraf";
import axios from "axios";
import cheerio from "cheerio";
import { ButtonI } from "../interfaces";
import { createButtons } from "../libs/buttons";
import { getLang } from "../../lang";

export async function searchModule(ctx:Context, query:string) {
    const _ = getLang(ctx.chat)
    try {
        let header = {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Linux; Android 10; Redmi 5A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36",
            },
        };
        let baseUrl = `https://www.npmjs.com/search?q=${encodeURI(query)}`;
        let html = await axios.get(baseUrl, header);
        
        if (html.status == 200) {
            let $ = cheerio.load(html.data);
            let result = `<b>${_.npmModule.titleSearch}</b>\n\n`;
            $("section").slice(0,6).each((i, el) => {
                let num = i + 1;
                let item = $(el).find(".items-end").find("a");
                let title = item
                    .find("h3")
                    .text()
                    .replace(/\s\s+/g, "")
                    .replace(/\&/gim, "&amp;")
                    .replace(/\</gim, "&lt;")
                    .replace(/\>/gim, "&gt;")
                    .replace(/\"/gim, "&quot;");
                let desc = $(el)
                    .find("p")
                    .text()
                    .replace(/\s\s+/g, "")
                    .replace(/\&/gim, "&amp;")
                    .replace(/\</gim, "&lt;")
                    .replace(/\>/gim, "&gt;")
                    .replace(/\"/gim, "&quot;");
                let href = item.attr("href");
                let version = $(el)
                    .find("span")
                    .text()
                    .replace(/(\s\s+)|(exact match)/gi, "")
                    .replace(/\&/gim, "&amp;")
                    .replace(/\</gim, "&lt;")
                    .replace(/\>/gim, "&gt;")
                    .replace(/\"/gim, "&quot;");
                    result += 
                `<b>${num}</b> - <a href="https://npmjs.com${href}">${title}</a>\n`+
                `<b>${desc}</b>\n`+
                `<i>${version}</i>\n\n`;
            });
            ctx.replyWithHTML(result, {disable_web_page_preview:true});
        }
    } catch (error) {
        return false;
    }
};

export async function getModule(ctx:Context, query:string) {
    const _ = getLang(ctx.chat)
    try {
        let header = {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Linux; Android 10; Redmi 5A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36",
            },
        };
        let baseUrl = `https://www.npmjs.com/package/${query}`;
        let html = await axios.get(baseUrl, header);
        if (html.status == 200) {
            let $ = cheerio.load(html.data);
            let name = $("._50685029.truncate").text();
            let downs = $(
                "._9ba9a726.f4.tl.flex-auto.fw6.black-80.ma0.pr2.pb1"
            ).text();
            let d: string[] = [];
            $(
                ".fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 ._702d723c.dib.w-50.bb.b--black-10.pr2"
            ).each((_, e) => {
                let el = $(e);
                d.push(el.find("p").text());
            });
            let message = `<b>${_.npmModule.title(query)}</b>\n\n`+
                `<b>Nombre:</b> ${name}\n` +
                `<b>Descargas semanales:</b> ${downs}\n` +
                `<b>Version:</b> ${d[0]}\n` +
                `<b>Licencia:</b> ${d[1]}\n` +
                `<b>Tamaño:</b> ${d[2]}\n` +
                `<b>Archivos:</b> ${d[3]}\n` +
                `<b>Ultima actualizacion:</b> ${d[6]}\n`;
            let buttons: ButtonI[] = [
                { text: "Homepage", url: `${d[4]}` },
                { text: "Repositorio", url: `${d[5].replace("Git", "")}` },
            ];
            ctx.replyWithHTML(message, {reply_markup:createButtons(buttons, 1)});
        }
    } catch (error) {
        ctx.replyWithMarkdownV2(`*Error, modulo no encontrado*`);
    }
};