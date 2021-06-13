import axios, { AxiosResponse } from "axios";
import Cheerio from "cheerio";
import { unlinkSync } from "fs";
import { basename, resolve } from "path";
import { Context } from "telegraf/typings/context";
import { downloadDir } from "../../config";
import { downloadFile, renameFile } from "../libs/download.files";

export async function getRepository(ctx: Context, user: string, repo: any) {
  try {
    const { data }: AxiosResponse = await axios.get(
      `https://github.com/${user}/${repo}`
    );
    const $ = Cheerio.load(data);
    let el = $("li:nth-child(2).Box-row.Box-row--hover-gray.p-0 a");
    let donwLink: string = `https://github.com${el.attr("href")}`;
    let base: string = `${basename(donwLink)}`;
    let file_dir: string = resolve(downloadDir, "repos");
    let file: string = resolve(file_dir, base);
    await downloadFile(donwLink, file);
    let fileDir = await renameFile(file_dir, base, `${repo}.zip`);
    ctx.replyWithDocument({ source: fileDir });
    unlinkSync(fileDir);
  } catch (error) {
    ctx.reply("Ha ocurrido un error al descargar el repositorio");
  }
}
